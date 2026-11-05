// Run after npm run build. Checks real generated HTML, not a mocked fallback.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = process.argv[2] || "dist/public";
const html = fs.readFileSync(path.join(root, "menu/index.html"), "utf8");
const source = fs.readFileSync("client/src/pages/Menu.tsx", "utf8");
const escape = (s) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" }[c]));

assert.match(html, /<div id="root" data-prerendered="\/menu\/">/);
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.match(html, /data-testid="text-menu-hero-title">Jack&#x27;s Lounge Menu<\/h1>/);
assert.equal((html.match(/<main\b/g) || []).length, 1);
assert.match(html, /<main id="main-content">/);
assert.match(html, /href="#main-content"/);
assert.doesNotMatch(html, /id="route-fallback"|id="hero-placeholder"|\/images\/hero\/hero-0/);
assert.match(html, /href="tel:\+15087750612"/);
assert.match(html, /href="https:\/\/olo\.spoton\.com\/60c3b6829adef31f4442003e" target="_blank" rel="noopener noreferrer"/);
assert.equal((html.match(/data-testid="category-\d+"/g) || []).length, 9);

// Every item name and price must be emitted from the existing menu data.
const items = [...source.matchAll(/\{ name: ("(?:\\.|[^"\\])*"), (price|prices): ("(?:\\.|[^"\\])*")/g)];
assert.ok(items.length > 50);
const renderedNames = [...html.matchAll(/data-testid="text-item-name-\d+-\d+">([^<]*)<\/h3>/g)].map(m => m[1]);
const renderedPrices = [...html.matchAll(/data-testid="text-item-prices?-\d+-\d+">([^<]*)<\/span>/g)].map(m => m[1]);
assert.deepEqual(renderedNames, items.map(([, name]) => escape(JSON.parse(name))));
assert.deepEqual(renderedPrices, items.map(([, , , price]) => escape(JSON.parse(price))));
for (const script of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(script[1]);
assert.ok(!fs.existsSync(path.join(root, "entry-server.js")), "SSR bundle must not be published as a browser asset");
console.log(`Menu build verified: one H1/main, ${items.length} unchanged item/price pairs, native call/order links, nine categories, no hero/fallback duplication.`);
