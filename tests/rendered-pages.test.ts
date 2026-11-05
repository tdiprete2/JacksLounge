import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { renderRouteHtml } from "../shared/render-page";
import { HOURS, PATHS, PUBLIC_ROUTES, getPublicRoute } from "../shared/site";
import { updateMetaTags } from "../client/src/utils/seo";

const template = `
  <html>
    <head>
      <title>Default</title>
      <meta name="description" content="Default" />
      <link rel="canonical" href="https://example.com/" />
      <meta property="og:title" content="Default" />
      <meta property="og:description" content="Default" />
      <meta property="og:url" content="https://example.com/" />
      <meta name="twitter:title" content="Default" />
      <meta name="twitter:description" content="Default" />
      <script id="route-structured-data" type="application/ld+json">[]</script>
    </head>
    <body><noscript id="route-fallback">Default</noscript></body>
  </html>
`;

test("every rendered public route gets its own canonical metadata and useful fallback", () => {
  for (const route of PUBLIC_ROUTES) {
    const output = renderRouteHtml(template, route);
    assert.match(output, new RegExp(`<title>${route.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</title>`));
    assert.match(output, new RegExp(`rel="canonical" href="https://www\\.jackspizzahyannis\\.com${route.path}"`));
    assert.match(output, new RegExp(route.heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.doesNotMatch(output, /<noscript id="route-fallback">Default<\/noscript>/);
    assert.doesNotMatch(output, /<script id="route-structured-data" type="application\/ld\+json">\[\]<\/script>/);
  }
});

test("Honey Pizza output contains complete fallback details and page-specific offer schema", () => {
  const route = getPublicRoute(PATHS.honeyPizza);
  assert.ok(route);
  const output = renderRouteHtml(template, route);

  assert.match(output, /introduced this signature pizza after taking over in 1985/i);
  assert.match(output, /original Famous Honey Pizza/i);
  assert.match(output, /separate hot-honey variation/i);
  assert.match(output, /10-inch Personal for \$13\.25/i);
  assert.match(output, /14-inch Large for \$16\.75/i);
  assert.match(output, /"@type":"MenuItem"/);
  assert.match(output, /"@type":"AggregateOffer"/);
  assert.match(output, /"lowPrice":"13\.25"/);
  assert.match(output, /"highPrice":"16\.75"/);
});

test("crawlable source content does not claim honey pizza began in 1963 or advertise catering", () => {
  const sources = [
    fs.readFileSync("client/index.html", "utf8"),
    fs.readFileSync("client/public/sitemap.xml", "utf8"),
    fs.readFileSync("client/src/components/FAQ.tsx", "utf8"),
    fs.readFileSync("client/src/pages/Contact.tsx", "utf8"),
    fs.readFileSync("client/src/pages/Home.tsx", "utf8"),
  ].join("\n");

  assert.doesNotMatch(sources, /(Honey Pizza|hot honey pizza|honey recipe)\s*(since|from|in) 1963/i);
  assert.doesNotMatch(sources, /(since|from|in) 1963\s*(Honey Pizza|hot honey pizza|honey recipe)/i);
  assert.doesNotMatch(sources, /catering (available|needs|orders?)/i);
  assert.match(sources, /does not offer (full )?catering/i);
});

test("Specials includes a timed first-party failure fallback", () => {
  const source = fs.readFileSync("client/src/pages/Specials.tsx", "utf8");
  assert.match(source, /setTimeout/);
  assert.match(source, /facebook-feed-fallback/);
  assert.match(source, /The Facebook feed could not load/i);
  assert.match(source, /Call \{SITE\.phoneDisplay\}/);
});

test("homepage and menu each have one matching restaurant H1 in React and fallback output", () => {
  const baseTemplate = fs.readFileSync("client/index.html", "utf8");
  const cases = [
    { path: PATHS.home, source: "client/src/components/WelcomeHeroCarousel.tsx", heading: "Jack's Lounge - Best Pizza & Wings in Hyannis" },
    { path: PATHS.menu, source: "client/src/pages/Menu.tsx", heading: "Jack's Lounge Menu" },
  ];
  const headings = (html: string) => Array.from(
    html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g),
    (match) => match[1].replace(/&amp;/g, "&").trim(),
  );

  for (const { path, source, heading } of cases) {
    const route = getPublicRoute(path);
    assert.ok(route);
    assert.deepEqual(headings(fs.readFileSync(source, "utf8")), [heading]);
    assert.deepEqual(headings(renderRouteHtml(baseTemplate, route)), [heading]);
    assert.ok(route.title.includes("Jack's Lounge"));
    if (path === PATHS.menu) assert.ok(route.title.includes("Menu"));
  }
  assert.deepEqual(headings(baseTemplate), [cases[0].heading]);
});

test("non-home routes do not preload or display the homepage hero", () => {
  const base = fs.readFileSync("client/index.html", "utf8");
  for (const route of PUBLIC_ROUTES) {
    const output = renderRouteHtml(base, route);
    assert.equal(output.includes('id="hero-placeholder"'), route.path === "/");
    assert.equal(output.includes('href="/images/hero/hero-0-mobile.webp"'), route.path === "/");
  }
});

test("sitemap covers exactly the public routes and schema hours match restaurant schedules", () => {
  const sitemap = fs.readFileSync("client/public/sitemap.xml", "utf8");
  const paths = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), (m) => new URL(m[1]).pathname);
  assert.deepEqual(paths.sort(), PUBLIC_ROUTES.map((r) => r.path).sort());
  const base = fs.readFileSync("client/index.html", "utf8");
  const schemas = Array.from(base.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g), (m) => JSON.parse(m[1]));
  const restaurant = schemas.find((s) => s["@type"] === "Restaurant");
  assert.deepEqual(restaurant.openingHoursSpecification, HOURS.dineIn.map((h) => ({
    "@type": "OpeningHoursSpecification", dayOfWeek: h.day, opens: h.schemaOpen, closes: h.schemaClose,
  })));
  const contact = renderRouteHtml(base, getPublicRoute(PATHS.contact)!);
  for (const label of ["Dine-in hours:", "Takeout hours:", "Delivery hours:"]) assert.ok(contact.includes(label));
});

test("browser metadata and route schema stay synchronized on client navigation", () => {
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const nodes = new Map<string, { textContent: string; attributes: Record<string, string>; setAttribute: (key: string, value: string) => void }>();
  function node(selector: string) {
    if (!nodes.has(selector)) nodes.set(selector, {
      textContent: "", attributes: {}, setAttribute(key, value) { this.attributes[key] = value; },
    });
    return nodes.get(selector)!;
  }
  const documentStub = { title: "", querySelector: node, getElementById: node };
  const windowStub = { location: { pathname: "/" } };
  Object.defineProperty(globalThis, "document", { configurable: true, value: documentStub });
  Object.defineProperty(globalThis, "window", { configurable: true, value: windowStub });
  try {
    for (const route of PUBLIC_ROUTES) {
      windowStub.location.pathname = route.path;
      updateMetaTags({ title: "Legacy", description: "Legacy", canonical: "https://example.com", ogUrl: "https://example.com" });
      assert.equal(documentStub.title, route.title);
      assert.equal(node('meta[name="description"]').attributes.content, route.description);
      assert.equal(node('link[rel="canonical"]').attributes.href, `https://www.jackspizzahyannis.com${route.path}`);
      assert.equal(node('meta[property="og:url"]').attributes.content, `https://www.jackspizzahyannis.com${route.path}`);
      const schema = JSON.parse(node("route-structured-data").textContent);
      assert.equal(schema[0].name, route.title);
    }
  } finally {
    if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
    else Reflect.deleteProperty(globalThis, "document");
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else Reflect.deleteProperty(globalThis, "window");
  }
});

test("mobile header keeps direct ordering and the shared phone number visible", () => {
  const header = fs.readFileSync("client/src/components/Header.tsx", "utf8");
  assert.match(header, /sticky top-0/);
  const actions = header.slice(header.indexOf('data-testid="link-mobile-phone"') - 700);
  assert.match(actions, /href=\{SITE\.phoneHref\}/);
  assert.match(actions, /\{SITE\.phoneDisplay\}/);
  assert.match(actions, /href=\{SITE\.orderUrl\}/);
  assert.match(actions, /data-testid="button-mobile-header-order"/);
  assert.doesNotMatch(actions, /5155/);
  assert.doesNotMatch(fs.readFileSync("client/src/components/FloatingButtons.tsx", "utf8"), /button-mobile-order-bar/);
});