import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PATHS, PUBLIC_ROUTES } from "../shared/site";
import { renderRouteHtml } from "../shared/render-page";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, "../dist/public");
const indexPath = path.join(distDir, "index.html");
const template = fs.readFileSync(indexPath, "utf8");
const rendererPath = path.resolve(scriptDir, "../dist/prerender/entry-server.js");
const { renderMenu } = await import(rendererPath);

for (const route of PUBLIC_ROUTES) {
  const output = route.path === "/" ? indexPath : path.join(distDir, route.path, "index.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  let html = renderRouteHtml(template, route);
  if (route.path === PATHS.menu) {
    html = html
      // No second H1 or duplicate menu for users with scripting disabled.
      .replace(/<noscript id="route-fallback">[\s\S]*?<\/noscript>/, "")
      .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="${PATHS.menu}">${renderMenu()}</div>`);
  }
  fs.writeFileSync(output, html, "utf8");
  console.log(`Generated ${route.path}`);
}