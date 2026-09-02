import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalUrl, PUBLIC_ROUTES, routeFallbackHtml } from "../shared/site";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, "../dist/public");
const indexPath = path.join(distDir, "index.html");
const template = fs.readFileSync(indexPath, "utf8");

function renderRoute(route: (typeof PUBLIC_ROUTES)[number]) {
  const canonical = canonicalUrl(route.path);
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/<noscript id="route-fallback">[\s\S]*?<\/noscript>/, `<noscript id="route-fallback">${routeFallbackHtml(route)}</noscript>`);
}

for (const route of PUBLIC_ROUTES) {
  const output = route.path === "/" ? indexPath : path.join(distDir, route.path, "index.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, renderRoute(route), "utf8");
  console.log(`Generated ${route.path}`);
}