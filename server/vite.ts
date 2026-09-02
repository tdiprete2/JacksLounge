import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import {
  canonicalUrl,
  getPublicRoute,
  normalizePublicPath,
  routeFallbackHtml,
  type RouteSeo,
} from "@shared/site";

const viteLogger = createLogger();

function renderRouteHtml(template: string, route: RouteSeo): string {
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

function resolveRoute(pathname: string) {
  const route = getPublicRoute(pathname);
  if (route) return { route, status: 200 };
  return {
    route: {
      path: normalizePublicPath(pathname),
      title: "Page Not Found | Jack's Lounge",
      description: "The requested page could not be found.",
      heading: "Page Not Found",
      summary: "The page you requested does not exist. Use the links below to return to Jack's Lounge.",
    },
    status: 404,
  };
}

function shouldRedirectToSlash(pathname: string) {
  return pathname !== "/" && !pathname.endsWith("/") && Boolean(getPublicRoute(pathname));
}

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use(async (req, res, next) => {
    const url = req.originalUrl;
    if (shouldRedirectToSlash(req.path)) {
      return res.redirect(308, `${normalizePublicPath(req.path)}${req.url.includes("?") ? `?${req.url.split("?")[1]}` : ""}`);
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const resolved = resolveRoute(req.path);
      const page = await vite.transformIndexHtml(url, renderRouteHtml(template, resolved.route));
      res.status(resolved.status).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, { redirect: false }));

  app.use(async (req, res, next) => {
    try {
      if (shouldRedirectToSlash(req.path)) {
        return res.redirect(308, normalizePublicPath(req.path));
      }
      const resolved = resolveRoute(req.path);
      const template = await fs.promises.readFile(path.resolve(distPath, "index.html"), "utf-8");
      res.status(resolved.status).type("html").send(renderRouteHtml(template, resolved.route));
    } catch (error) {
      next(error);
    }
  });
}
