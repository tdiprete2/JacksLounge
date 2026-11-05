import { canonicalUrl, getPublicRoute, routeStructuredData } from "@shared/site";

export const updateMetaTags = (pageConfig: {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}) => {
  // Use the same route data as the server/static build, including after client
  // navigation. Page-specific legacy copy must not overwrite crawlable metadata.
  const route = getPublicRoute(window.location.pathname);
  const config = route ? {
    ...pageConfig,
    title: route.title,
    description: route.description,
    canonical: canonicalUrl(route.path),
    ogTitle: route.title,
    ogDescription: route.description,
    ogUrl: canonicalUrl(route.path),
  } : pageConfig;
  if (route) {
    const structuredData = document.getElementById("route-structured-data");
    if (structuredData) structuredData.textContent = JSON.stringify(routeStructuredData(route));
  }
  // Update title
  document.title = config.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', config.description);
  } else {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', config.description);
    document.head.appendChild(metaDescription);
  }

  // Update canonical URL
  if (config.canonical) {
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', config.canonical);
    } else {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      linkCanonical.setAttribute('href', config.canonical);
      document.head.appendChild(linkCanonical);
    }
  }

  // Update Open Graph title
  const ogTitle = config.ogTitle || config.title;
  let metaOgTitle = document.querySelector('meta[property="og:title"]');
  if (metaOgTitle) {
    metaOgTitle.setAttribute('content', ogTitle);
  }

  // Update Open Graph description
  const ogDescription = config.ogDescription || config.description;
  let metaOgDescription = document.querySelector('meta[property="og:description"]');
  if (metaOgDescription) {
    metaOgDescription.setAttribute('content', ogDescription);
  }

  // Update Open Graph URL
  if (config.ogUrl) {
    let metaOgUrl = document.querySelector('meta[property="og:url"]');
    if (metaOgUrl) {
      metaOgUrl.setAttribute('content', config.ogUrl);
    }
  }

  // Update Twitter description
  let metaTwitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (metaTwitterDescription) {
    metaTwitterDescription.setAttribute('content', ogDescription);
  }

  // Update Twitter title
  let metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (metaTwitterTitle) {
    metaTwitterTitle.setAttribute('content', ogTitle);
  }
};
