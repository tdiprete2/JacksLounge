import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PUBLIC_ROUTES } from "../shared/site";
import { renderRouteHtml } from "../shared/render-page";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, "../dist/public");
const indexPath = path.join(distDir, "index.html");
const template = fs.readFileSync(indexPath, "utf8");

for (const route of PUBLIC_ROUTES) {
  const output = route.path === "/" ? indexPath : path.join(distDir, route.path, "index.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, renderRouteHtml(template, route), "utf8");
  console.log(`Generated ${route.path}`);
}