// Read-only Chromium lab measurements. Start Chromium with remote debugging
// on port 9223, then: node scripts/measure-pages.cjs https://example.com
// Not Lighthouse, CrUX, or an INP measurement. No user actions or checkout.
// Optional: AUDIT_RUNS=3 AUDIT_MOBILE_ONLY=1 AUDIT_PATHS=/menu/
// AUDIT_WIDTH=320, AUDIT_NO_JS=1, AUDIT_BLOCK_JS=1, AUDIT_OUTPUT=/tmp/results.json.
const WebSocket = require("ws");
const fs = require("node:fs");
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function measure(base, path, mobile) {
  const target = await fetch("http://127.0.0.1:9223/json/new?about:blank", { method: "PUT" }).then((r) => r.json());
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.once("open", resolve); ws.once("error", reject); });
  let id = 0;
  const pending = new Map();
  const errors = [];
  const responses = [];
  const failedRequests = [];
  ws.on("message", (raw) => {
    const msg = JSON.parse(raw);
    if (msg.id) {
      const call = pending.get(msg.id);
      if (call) { clearTimeout(call.timer); pending.delete(msg.id); msg.error ? call.reject(new Error(JSON.stringify(msg.error))) : call.resolve(msg.result); }
    }
    if (msg.method === "Runtime.exceptionThrown") errors.push(msg.params.exceptionDetails.text);
    if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
      errors.push(msg.params.args.map(a => a.value || a.description || "").join(" "));
    }
    if (msg.method === "Network.responseReceived" && ["Document", "Script", "Stylesheet"].includes(msg.params.type)) {
      const r = msg.params.response;
      responses.push({ url: r.url, type: msg.params.type, encoding: Object.entries(r.headers).find(([k]) => k.toLowerCase() === "content-encoding")?.[1] || "identity" });
    }
    if (msg.method === "Network.responseReceived" && msg.params.response.status >= 400) {
      failedRequests.push({ url: msg.params.response.url, status: msg.params.response.status });
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const key = ++id;
    const timer = setTimeout(() => { pending.delete(key); reject(new Error(`Timed out: ${method}`)); }, 30000);
    pending.set(key, { resolve, reject, timer });
    ws.send(JSON.stringify({ id: key, method, params }));
  });
  try {
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Network.enable");
    await send("Network.setCacheDisabled", { cacheDisabled: true });
    await send("Network.setBypassServiceWorker", { bypass: true });
    if (process.env.AUDIT_BLOCK_JS) await send("Network.setBlockedURLs", { urls: ["*.js", "*.js?*"] });
    await send("Network.clearBrowserCache");
    await send("Emulation.setDeviceMetricsOverride", { width: Number(process.env.AUDIT_WIDTH || (mobile ? 390 : 1440)), height: mobile ? 844 : 1000, deviceScaleFactor: 1, mobile });
    if (process.env.AUDIT_NO_JS) await send("Emulation.setScriptExecutionDisabled", { value: true });
    if (mobile) await send("Network.setUserAgentOverride", { userAgent: "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Mobile Safari/537.36" });
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    await send("Emulation.setCPUThrottlingRate", { rate: mobile ? 4 : 1 });
    await send("Network.emulateNetworkConditions", { offline: false, latency: mobile ? 150 : 0, downloadThroughput: mobile ? 200000 : -1, uploadThroughput: mobile ? 93750 : -1 });
    await send("Page.addScriptToEvaluateOnNewDocument", { source: `
      window.__lab={lcp:0,cls:0,clsWindow:0,clsStart:0,clsLast:0,longTasks:0};
      new PerformanceObserver(list=>{for(const e of list.getEntries()){window.__lab.lcp=e.startTime;window.__lab.lcpElement=e.element?.tagName+':'+(e.element?.getAttribute('src')||e.element?.textContent?.slice(0,70)||'')}}).observe({type:'largest-contentful-paint',buffered:true});
      new PerformanceObserver(list=>{for(const e of list.getEntries()){if(!e.hadRecentInput){const p=window.__lab;if(e.startTime-p.clsLast>1000||e.startTime-p.clsStart>5000){p.clsWindow=0;p.clsStart=e.startTime}p.clsWindow+=e.value;p.clsLast=e.startTime;p.cls=Math.max(p.cls,p.clsWindow)}}}).observe({type:'layout-shift',buffered:true});
      new PerformanceObserver(list=>{for(const e of list.getEntries())window.__lab.longTasks+=Math.max(0,e.duration-50)}).observe({type:'longtask',buffered:true});
      // Sample actual visible content on animation frames, not the load event.
      const visible=e=>{if(!e)return false;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&s.visibility!=='hidden'&&s.display!=='none'&&Number(s.opacity)>0};
      function ready(){
        const p=window.__lab;
        if(!p.actionsVisibleMs&&visible(document.querySelector('[data-testid="link-mobile-phone"]'))&&visible(document.querySelector('[data-testid="button-mobile-header-order"]')))p.actionsVisibleMs=performance.now();
        if(!p.menuVisibleMs&&visible(document.querySelector('[data-testid="text-menu-hero-title"]'))&&visible(document.querySelector('[data-testid="text-item-name-1-0"]'))&&visible(document.querySelector('[data-testid="text-item-price-1-0"]')))p.menuVisibleMs=performance.now();
        requestAnimationFrame(ready);
      }requestAnimationFrame(ready);
    ` });
    await send("Page.navigate", { url: base.replace(/\/$/, "") + path });
    await pause(mobile ? 16000 : 8000);
    const evaluated = await send("Runtime.evaluate", { returnByValue: true, expression: `JSON.stringify((()=>{
      const n=performance.getEntriesByType('navigation')[0],r=performance.getEntriesByType('resource');
      const rect=e=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height}};
      return {url:location.href,title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent.trim()),canonical:document.querySelector('link[rel=canonical]')?.href,
      ttfbMs:n?.responseStart,domContentLoadedMs:n?.domContentLoadedEventEnd,loadMs:n?.loadEventEnd,fcpMs:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,...window.__lab,
      resourceCount:r.length,transferBytes:r.reduce((a,b)=>a+b.transferSize,0),overflow:document.documentElement.scrollWidth>innerWidth,
      mobileActions:[...document.querySelectorAll('[data-testid="link-mobile-phone"],[data-testid="button-mobile-header-order"]')].map(e=>({text:e.textContent.trim(),href:e.href,rect:rect(e)})),
      accessibility:{mainCount:document.querySelectorAll('main').length,skipTarget:!!document.querySelector('a[href="#main-content"]')&&!!document.getElementById('main-content'),unnamedLinks:[...document.querySelectorAll('a')].filter(e=>!e.textContent.trim()&&!e.getAttribute('aria-label')&&!e.querySelector('img[alt]')).length,unnamedButtons:[...document.querySelectorAll('button')].filter(e=>!e.textContent.trim()&&!e.getAttribute('aria-label')).length},
      menuItemCount:document.querySelectorAll('[data-testid^="menu-item-"]').length,
      images:[...document.images].filter(e=>!e.complete||e.naturalWidth===0).map(e=>e.currentSrc),
      heavyResources:r.sort((a,b)=>b.transferSize-a.transferSize).slice(0,6).map(e=>({url:e.name,bytes:e.transferSize,duration:e.duration}))};
    })())` });
    const result = JSON.parse(evaluated.result.value);
    // Animation-frame sampling proves layout visibility, but the frame can be
    // scheduled before paint. Never report readiness earlier than FCP.
    for (const key of ["actionsVisibleMs", "menuVisibleMs"]) if (result[key]) result[key] = Math.max(result[key], result.fcpMs || 0);
    return { base, path, device: mobile ? "mobile" : "desktop", javascript: process.env.AUDIT_NO_JS ? "disabled" : process.env.AUDIT_BLOCK_JS ? "blocked external scripts" : "enabled", ...result, responses, errors, failedRequests };
  } finally {
    ws.close();
    await fetch(`http://127.0.0.1:9223/json/close/${target.id}`);
  }
}

(async () => {
  const bases = process.argv.slice(2);
  if (!bases.length) throw new Error("Provide at least one base URL");
  const results = [];
  const devices = process.env.AUDIT_MOBILE_ONLY ? [true] : [false, true];
  const paths = process.env.AUDIT_PATHS ? process.env.AUDIT_PATHS.split(",") : ["/", "/menu/"];
  const runs = Number(process.env.AUDIT_RUNS || 1);
  if (!Number.isInteger(runs) || runs < 1) throw new Error("AUDIT_RUNS must be a positive integer");
  for (const base of bases) for (const mobile of devices) for (const path of paths) for (let run = 1; run <= runs; run++) {
    const result = await measure(base, path, mobile);
    result.run = run;
    results.push(result);
    console.log(JSON.stringify(result));
  }
  if (process.env.AUDIT_OUTPUT) fs.writeFileSync(process.env.AUDIT_OUTPUT, JSON.stringify(results, null, 2));
})().catch((error) => { console.error(error); process.exitCode = 1; });
