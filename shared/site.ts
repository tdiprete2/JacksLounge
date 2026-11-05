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
  fallbackDetails: readonly string[];
}

export const PUBLIC_ROUTES: readonly RouteSeo[] = [
  {
    path: PATHS.home,
    title: "Best Pizza & Wings in Hyannis, MA | Jack's Lounge",
    description: "Jack's Lounge serves famous honey pizza, crispy wings and Italian-American favorites in Hyannis. Dine in, take out or order delivery.",
    heading: "Jack's Lounge - Best Pizza & Wings in Hyannis",
    summary: "Open since 1963 at 373 West Main Street. The DiPrete family introduced Jack's Famous Honey Pizza after taking over in 1985.",
    fallbackDetails: [
      "Jack's Lounge serves pizza, oven-baked wings, grinders, calzones, salads and Italian-American favorites for dine-in, takeout and delivery.",
      "Use the Menu link to explore our food, or use Order Online for current availability and pricing.",
    ],
  },
  {
    path: PATHS.menu,
    title: "Menu | Pizza, Wings & Italian Favorites | Jack's Lounge",
    description: "Explore the Jack's Lounge menu featuring specialty pizza, baked wings, grinders, calzones, salads and Italian-American favorites in Hyannis.",
    heading: "Jack's Lounge Menu",
    summary: "Browse our pizza, wings, appetizers, grinders, calzones, salads and entrees. Call for current availability or order online.",
    fallbackDetails: [
      "Popular categories include specialty and build-your-own pizza, oven-baked wings, appetizers, grinders, calzones, salads and entrees.",
      "Online ordering is the source for current item availability and pricing.",
    ],
  },
  {
    path: PATHS.pizza,
    title: "Pizza in Hyannis, MA | Jack's Lounge",
    description: "Specialty pizza in Hyannis including Jack's Famous Honey Pizza, fresh vegetables and gluten-free 10-inch crust options.",
    heading: "Pizza at Jack's Lounge",
    summary: "Choose a specialty pizza or build your own. Prices shown on this site should be confirmed against the live online ordering menu.",
    fallbackDetails: [
      "Specialty options include Jack's Famous Honey Pizza alongside classic and build-your-own choices.",
      "A gluten-free 10-inch crust option is available. Check online ordering for current toppings, pricing and availability.",
    ],
  },
  {
    path: PATHS.wings,
    title: "Baked Wings in Hyannis, MA | Jack's Lounge",
    description: "Oven-baked wings in Hyannis with Original, Buffalo, BBQ, Garlic Parmesan and Sweet Chili flavors.",
    heading: "Wings at Jack's Lounge",
    summary: "Our oven-baked wings are available in several flavors. Order online for the current sizes, pricing and availability.",
    fallbackDetails: [
      "Choose Original, Buffalo, BBQ, Garlic Parmesan or Sweet Chili flavors.",
      "Large orders are available for parties and events. Call the restaurant to discuss party trays and advance orders.",
    ],
  },
  {
    path: PATHS.honeyPizza,
    title: "Jack's Famous Honey Pizza | Jack's Lounge Hyannis",
    description: "Discover the sweet-savory honey pizza the DiPrete family introduced at Jack's Lounge after taking over in 1985.",
    heading: "Jack's Famous Honey Pizza",
    summary: "Freshly shredded mozzarella and white cheddar finished with honey. The restaurant opened in 1963; the DiPrete family introduced this signature pizza after taking over in 1985.",
    fallbackDetails: [
      "The original Famous Honey Pizza is a sweet-savory cheese pizza finished with golden honey. A separate hot-honey variation is available for guests who prefer a spicy finish.",
      "Displayed sizes and prices are 10-inch Personal for $13.25 and 14-inch Large for $16.75. Check online ordering for current pricing and availability.",
      "Any 10-inch pizza can be prepared on the available gluten-free crust for an additional charge.",
    ],
  },
  {
    path: PATHS.story,
    title: "Our Story | Jack's Lounge Hyannis Since 1963",
    description: "Learn about Jack's Lounge, opened in Hyannis in 1963 and carried forward by the DiPrete family since 1985.",
    heading: "The Story of Jack's Lounge",
    summary: "A neighborhood restaurant since 1963, with the DiPrete family continuing the tradition from 1985 to today.",
    fallbackDetails: [
      "Jack's Lounge opened in Hyannis in 1963. The DiPrete family took over in 1985 and later introduced the Famous Honey Pizza.",
      "The restaurant remains a neighborhood destination for pizza, wings and Italian-American favorites.",
    ],
  },
  {
    path: PATHS.specials,
    title: "Updates & Specials | Jack's Lounge Hyannis",
    description: "Find current Jack's Lounge specials, promotions and restaurant updates, with a direct link to the official Facebook page.",
    heading: "Jack's Lounge Updates & Specials",
    summary: "Check the official Facebook page for the latest daily specials and restaurant updates, or call the restaurant directly.",
    fallbackDetails: [
      "Facebook content may be blocked by browser privacy settings. If the embedded feed is unavailable, use the direct Facebook link or call the restaurant for today's updates.",
      "Specials can change, so confirm availability before ordering.",
    ],
  },
  {
    path: PATHS.contact,
    title: "Contact, Hours & Directions | Jack's Lounge Hyannis",
    description: "Contact Jack's Lounge at 373 West Main Street in Hyannis. View separate dine-in, takeout and delivery hours.",
    heading: "Contact Jack's Lounge",
    summary: "Call (508) 775-0612 or visit 373 West Main Street, Hyannis, MA 02601. Dine-in, takeout and delivery hours differ.",
    fallbackDetails: [
      `Dine-in hours: ${HOURS.dineIn.map(({ day, open, close }) => `${day} ${open}–${close}`).join("; ")}.`,
      `Takeout hours: ${HOURS.takeout.map(({ day, open, close }) => `${day} ${open}–${close}`).join("; ")}.`,
      `Delivery hours: ${HOURS.delivery.map(({ day, open, close }) => `${day} ${open}–${close}`).join("; ")}.`,
      "For party trays and large orders, call the restaurant directly. Jack's Lounge does not offer full catering services.",
    ],
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
    ${route.fallbackDetails.map((detail) => `<p>${detail}</p>`).join("\n    ")}
    <p><strong>Jack's Lounge</strong><br>${SITE.addressLine1}<br>${SITE.addressLine2}<br>${SITE.phoneDisplay}</p>
    <nav><a href="/">Home</a> · <a href="${PATHS.menu}">Menu</a> · <a href="${PATHS.contact}">Contact & Hours</a> · <a href="${SITE.orderUrl}">Order online</a></nav>
  </main>`;
}

export function routeStructuredData(route: RouteSeo): object[] {
  const canonical = canonicalUrl(route.path);
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: route.title,
      description: route.description,
      isPartOf: { "@id": `${SITE.origin}/#website` },
      about: { "@id": `${SITE.origin}/#restaurant` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE.origin}/`,
        },
        ...(route.path === PATHS.home
          ? []
          : [{
              "@type": "ListItem",
              position: 2,
              name: route.heading,
              item: canonical,
            }]),
      ],
    },
  ];

  if (route.path === PATHS.honeyPizza) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "MenuItem",
      name: "Jack's Famous Honey Pizza",
      description:
        "Freshly shredded mozzarella and white cheddar finished with golden honey. A DiPrete family creation introduced after 1985, with a separate hot-honey variation available.",
      image: `${SITE.origin}/images/featured/honey-pizza-jacks-lounge-hyannis.webp`,
      url: canonical,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "13.25",
        highPrice: "16.75",
        offerCount: 2,
        availability: "https://schema.org/InStock",
      },
    });
  }

  return schemas;
}