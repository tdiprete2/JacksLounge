import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { renderRouteHtml } from "../shared/render-page";
import { PATHS, PUBLIC_ROUTES, getPublicRoute } from "../shared/site";

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