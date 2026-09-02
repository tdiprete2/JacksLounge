import {
  canonicalUrl,
  routeFallbackHtml,
  routeStructuredData,
  type RouteSeo,
} from "./site";

export function renderRouteHtml(template: string, route: RouteSeo): string {
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
    .replace(/<noscript id="route-fallback">[\s\S]*?<\/noscript>/, `<noscript id="route-fallback">${routeFallbackHtml(route)}</noscript>`)
    .replace(
      /<script id="route-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(routeStructuredData(route))}</script>`,
    );
}