export const SITE = {
  name: "Jack's Lounge",
  origin: "https://www.jackspizzahyannis.com",
  orderUrl: "https://olo.spoton.com/60c3b6829adef31f4442003e",
  phoneDisplay: "(508) 775-0612",
  phoneHref: "tel:+15087750612",
  email: "jackspizza@comcast.net",
  addressLine1: "373 West Main Street",
  addressLine2: "Hyannis, MA 02601",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Jack%27s+Lounge+373+West+Main+Street+Hyannis+MA+02601",
} as const;

export type ServiceType = "dineIn" | "delivery" | "takeout";

export const HOURS = {
  dineIn: [
    { day: "Monday", open: "11:00 AM", close: "10:00 PM", schemaOpen: "11:00", schemaClose: "22:00" },
    { day: "Tuesday", open: "11:00 AM", close: "9:30 PM", schemaOpen: "11:00", schemaClose: "21:30" },
    { day: "Wednesday", open: "11:00 AM", close: "10:30 PM", schemaOpen: "11:00", schemaClose: "22:30" },
    { day: "Thursday", open: "11:00 AM", close: "10:30 PM", schemaOpen: "11:00", schemaClose: "22:30" },
    { day: "Friday", open: "11:00 AM", close: "11:00 PM", schemaOpen: "11:00", schemaClose: "23:00" },
    { day: "Saturday", open: "11:00 AM", close: "10:30 PM", schemaOpen: "11:00", schemaClose: "22:30" },
    { day: "Sunday", open: "12:00 PM", close: "9:30 PM", schemaOpen: "12:00", schemaClose: "21:30" },
  ],
  delivery: [
    { day: "Monday", open: "11:00 AM", close: "9:30 PM" },
    { day: "Tuesday", open: "11:00 AM", close: "8:30 PM" },
    { day: "Wednesday", open: "11:00 AM", close: "9:30 PM" },
    { day: "Thursday", open: "11:00 AM", close: "9:00 PM" },
    { day: "Friday", open: "11:00 AM", close: "10:00 PM" },
    { day: "Saturday", open: "11:00 AM", close: "9:00 PM" },
    { day: "Sunday", open: "12:00 PM", close: "8:30 PM" },
  ],
  takeout: [
    { day: "Monday", open: "11:00 AM", close: "9:30 PM" },
    { day: "Tuesday", open: "11:00 AM", close: "8:30 PM" },
    { day: "Wednesday", open: "11:00 AM", close: "9:30 PM" },
    { day: "Thursday", open: "11:00 AM", close: "9:30 PM" },
    { day: "Friday", open: "11:00 AM", close: "10:30 PM" },
    { day: "Saturday", open: "11:00 AM", close: "9:30 PM" },
    { day: "Sunday", open: "12:00 PM", close: "8:30 PM" },
  ],
} as const;

export const PATHS = {
  home: "/",
  menu: "/menu/",
  pizza: "/pizza/",
  wings: "/wings/",
  honeyPizza: "/famous-honey-pizza/",
  story: "/story/",
  specials: "/specials/",
  contact: "/contact/",
  admin: "/admin/",
} as const;

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  heading: string;
  summary: string;
}

export const PUBLIC_ROUTES: readonly RouteSeo[] = [
  {
    path: PATHS.home,
    title: "Best Pizza & Wings in Hyannis, MA | Jack's Lounge",
    description: "Jack's Lounge serves famous honey pizza, crispy wings and Italian-American favorites in Hyannis. Dine in, take out or order delivery.",
    heading: "Jack's Lounge: Pizza, Wings & Local Tradition in Hyannis",
    summary: "Open since 1963 at 373 West Main Street. The DiPrete family introduced Jack's Famous Honey Pizza after taking over in 1985.",
  },
  {
    path: PATHS.menu,
    title: "Menu | Pizza, Wings & Italian Favorites | Jack's Lounge",
    description: "Explore the Jack's Lounge menu featuring specialty pizza, baked wings, grinders, calzones, salads and Italian-American favorites in Hyannis.",
    heading: "Jack's Lounge Menu",
    summary: "Browse our pizza, wings, appetizers, grinders, calzones, salads and entrees. Call for current availability or order online.",
  },
  {
    path: PATHS.pizza,
    title: "Pizza in Hyannis, MA | Jack's Lounge",
    description: "Specialty pizza in Hyannis including Jack's Famous Honey Pizza, fresh vegetables and gluten-free 10-inch crust options.",
    heading: "Pizza at Jack's Lounge",
    summary: "Choose a specialty pizza or build your own. Prices shown on this site should be confirmed against the live online ordering menu.",
  },
  {
    path: PATHS.wings,
    title: "Baked Wings in Hyannis, MA | Jack's Lounge",
    description: "Oven-baked wings in Hyannis with Original, Buffalo, BBQ, Garlic Parmesan and Sweet Chili flavors.",
    heading: "Wings at Jack's Lounge",
    summary: "Our oven-baked wings are available in several flavors. Order online for the current sizes, pricing and availability.",
  },
  {
    path: PATHS.honeyPizza,
    title: "Jack's Famous Honey Pizza | Jack's Lounge Hyannis",
    description: "Discover the sweet-savory honey pizza the DiPrete family introduced at Jack's Lounge after taking over in 1985.",
    heading: "Jack's Famous Honey Pizza",
    summary: "Freshly shredded mozzarella and white cheddar finished with honey. The restaurant opened in 1963; the DiPrete family created this signature pizza after 1985.",
  },
  {
    path: PATHS.story,
    title: "Our Story | Jack's Lounge Hyannis Since 1963",
    description: "Learn about Jack's Lounge, opened in Hyannis in 1963 and carried forward by the DiPrete family since 1985.",
    heading: "The Story of Jack's Lounge",
    summary: "A neighborhood restaurant since 1963, with the DiPrete family continuing the tradition from 1985 to today.",
  },
  {
    path: PATHS.specials,
    title: "Updates & Specials | Jack's Lounge Hyannis",
    description: "Find current Jack's Lounge specials, promotions and restaurant updates, with a direct link to the official Facebook page.",
    heading: "Jack's Lounge Updates & Specials",
    summary: "Check the official Facebook page for the latest daily specials and restaurant updates, or call the restaurant directly.",
  },
  {
    path: PATHS.contact,
    title: "Contact, Hours & Directions | Jack's Lounge Hyannis",
    description: "Contact Jack's Lounge at 373 West Main Street in Hyannis. View separate dine-in, takeout and delivery hours.",
    heading: "Contact Jack's Lounge",
    summary: "Call (508) 775-0612 or visit 373 West Main Street, Hyannis, MA 02601. Dine-in, takeout and delivery hours differ.",
  },
] as const;

export function normalizePublicPath(input: string): string {
  const pathname = input.split("?")[0].split("#")[0] || "/";
  if (pathname === "/") return "/";
  return `${pathname.replace(/\/+$/, "")}/`;
}

export function getPublicRoute(input: string): RouteSeo | undefined {
  const normalized = normalizePublicPath(input);
  return PUBLIC_ROUTES.find((route) => route.path === normalized);
}

export function canonicalUrl(path: string): string {
  return `${SITE.origin}${path === "/" ? "/" : normalizePublicPath(path)}`;
}

export function routeFallbackHtml(route: RouteSeo): string {
  return `<main style="max-width:760px;margin:40px auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.6">
    <h1>${route.heading}</h1>
    <p>${route.summary}</p>
    <p><strong>Jack's Lounge</strong><br>${SITE.addressLine1}<br>${SITE.addressLine2}<br>${SITE.phoneDisplay}</p>
    <nav><a href="/">Home</a> · <a href="${PATHS.menu}">Menu</a> · <a href="${PATHS.contact}">Contact & Hours</a> · <a href="${SITE.orderUrl}">Order online</a></nav>
  </main>`;
}