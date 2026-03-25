import { useEffect, useState } from "react";
import { updateMetaTags } from "@/utils/seo";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";

const ORDER_URL = "https://olo.spoton.com/60c3b6829adef31f4442003e";

const faqs = [
  {
    id: 1,
    question: "What is honey pizza?",
    answer:
      "It's Jack's Lounge's signature creation — a hand-tossed pizza topped with freshly shredded mozzarella and white cheddar, then finished with a generous drizzle of golden honey. The DiPrete family introduced it after taking over the restaurant in 1985, and it's been a Cape Cod staple ever since.",
  },
  {
    id: 2,
    question: "Is the honey pizza sweet or savory?",
    answer:
      "Both! The sweet-savory balance is exactly what makes it special. The honey is drizzled just right — enough to add warmth and sweetness without overpowering the cheese. Most people describe their first bite as a pleasant surprise. We also offer a hot-honey variation for guests who enjoy a little kick alongside the sweetness.",
  },
  {
    id: 3,
    question: "Can I get the honey pizza gluten-free?",
    answer:
      "Yes! Any 10\" pizza can be prepared on our gluten-free crust for an additional $4.00. Just request it when ordering online or at the counter. The honey drizzle and all toppings remain the same.",
  },
  {
    id: 4,
    question: "Where is Jack's Lounge located?",
    answer:
      "We're at 373 West Main Street, Hyannis, MA 02601 — right in the heart of Cape Cod. Call us at (508) 775-0612 for pickup times or order online for delivery.",
  },
];

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-border rounded-md overflow-hidden"
      data-testid={`faq-item-${faq.id}`}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-card hover-elevate transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        data-testid={`faq-toggle-${faq.id}`}
      >
        <span className="font-semibold text-foreground pr-4">{faq.question}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-primary shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 py-4 bg-background border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

function generateSchema() {
  const menuItem = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: "Jack's Famous Honey Pizza",
    description:
      "Freshly shredded mozzarella and white cheddar topped with a golden honey drizzle. A sweet and savory Cape Cod tradition since 1963.",
    image: "https://www.jackspizzahyannis.com/images/featured/honey-pizza-jacks-lounge-hyannis.webp",
    url: "https://www.jackspizzahyannis.com/famous-honey-pizza/",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "13.25",
      highPrice: "16.75",
      offerCount: 2,
      availability: "https://schema.org/InStock",
    },
    nutrition: {
      "@type": "NutritionInformation",
      description: "Freshly shredded mozzarella and white cheddar, golden honey drizzle",
    },
  };

  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "https://www.jackspizzahyannis.com/#restaurant",
    name: "Jack's Lounge",
    url: "https://www.jackspizzahyannis.com",
    telephone: "+1-508-775-0612",
    priceRange: "$$",
    servesCuisine: ["Pizza", "Italian", "American"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "373 West Main Street",
      addressLocality: "Hyannis",
      addressRegion: "MA",
      postalCode: "02601",
      addressCountry: "US",
    },
    hasMenu: {
      "@type": "Menu",
      name: "Signature Honey Pizza",
      url: "https://www.jackspizzahyannis.com/famous-honey-pizza/",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.jackspizzahyannis.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Famous Honey Pizza",
        item: "https://www.jackspizzahyannis.com/famous-honey-pizza/",
      },
    ],
  };

  return [menuItem, restaurant, breadcrumb];
}

export default function FamousHoneyPizza() {
  useEffect(() => {
    updateMetaTags({
      title: "Jack's Famous Honey Pizza | Cape Cod Tradition Since 1963 | Hyannis MA",
      description:
        "Discover Jack's Famous Honey Pizza — freshly shredded mozzarella and white cheddar with a golden honey drizzle. A sweet & savory Cape Cod tradition since 1963. Order online from Hyannis, MA.",
      canonical: "https://www.jackspizzahyannis.com/famous-honey-pizza/",
      ogTitle: "Jack's Famous Honey Pizza — A Cape Cod Tradition Since 1963",
      ogDescription:
        "Try the honey pizza that's kept locals coming back for over 40 years. Sweet, savory, and unlike anything else on Cape Cod. Order online or visit us in Hyannis, MA.",
      ogUrl: "https://www.jackspizzahyannis.com/famous-honey-pizza/",
    });
  }, []);

  const schemas = generateSchema();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {schemas.map((schema, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <Header />

      <main className="flex-1" id="main-content">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-card border-b border-border">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

              {/* Text */}
              <div>
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
                  <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                  <span>/</span>
                  <span className="text-foreground">Famous Honey Pizza</span>
                </nav>

                <h1
                  className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                  data-testid="text-honey-pizza-title"
                >
                  Jack's Famous Honey Pizza
                  <span className="block text-primary mt-2 text-2xl md:text-3xl font-semibold">
                    — A Cape Cod Tradition Since 1963
                  </span>
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Freshly shredded mozzarella and white cheddar crowned with a golden honey drizzle. 
                  A DiPrete family creation that has made Jack's Lounge legendary in Hyannis 
                  for over 40 years — and the one slice every Cape Cod visitor has to try.
                </p>

                {/* Pricing */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Card className="flex-1 min-w-[120px]">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">$13.25</div>
                      <div className="text-sm text-muted-foreground">10" Personal</div>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 min-w-[120px]">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">$16.75</div>
                      <div className="text-sm text-muted-foreground">14" Large</div>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 min-w-[120px] border-primary/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-base font-semibold text-primary mb-1">Hot Honey</div>
                      <div className="text-sm text-muted-foreground">Spicy variation available</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild data-testid="button-order-honey-pizza">
                    <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      Order Online
                      <ExternalLink size={18} />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild data-testid="button-view-full-menu">
                    <Link href="/menu" className="inline-flex items-center gap-2">
                      View Full Menu
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="relative" data-testid="img-honey-pizza-hero">
                <div className="relative overflow-hidden rounded-md shadow-lg">
                  <img
                    src="/images/featured/honey-pizza-jacks-lounge-hyannis.webp"
                    alt="Jack's Famous Honey Pizza — freshly shredded mozzarella and white cheddar with golden honey drizzle, Hyannis MA"
                    className="w-full object-cover"
                    style={{ aspectRatio: "4/3" }}
                    fetchPriority="high"
                    loading="eager"
                    width="600"
                    height="450"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Origin Story ── */}
        <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-background">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-10"
              data-testid="text-origin-story-title"
            >
              The Story Behind the Honey
            </h2>

            <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              <p>
                Jack's Lounge was founded in <strong className="text-foreground">1963</strong> by{" "}
                <strong className="text-foreground">John "Jack" Sances</strong> — former professional
                boxer fighting under the name "Tommy Nee" — who built it into a neighborhood staple
                on 373 West Main Street in Hyannis.
              </p>
              <p>
                In <strong className="text-foreground">1985</strong>,{" "}
                <strong className="text-foreground">Henry and Anne DiPrete</strong> purchased the
                restaurant and brought their own touch to the kitchen. It was the DiPretes who
                created the Famous Honey Pizza — reaching for a honey jar when most pizza makers
                were thinking tomato sauce. The result was unlike anything Cape Cod had tasted:
                freshly shredded mozzarella and white cheddar, the oven caramelizing the cheese
                just so, the honey cutting through with warmth and sweetness.
              </p>
              <p>
                Today, their daughter <strong className="text-foreground">Grace</strong>{" "}
                and grandson <strong className="text-foreground">Tim</strong> carry on the tradition —
                the same recipe, the same Hyannis address, the same loyal customers who've been
                coming back since the day the DiPretes first drizzled honey on a pie.
              </p>
              <p>
                Whether you're a Hyannis local who's been ordering it for years, or a summer visitor
                trying it for the first time, the Famous Honey Pizza is the one thing every guest
                remembers long after leaving Cape Cod.
              </p>
            </div>
          </div>
        </section>

        {/* ── What Makes It Special ── */}
        <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-card border-y border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="text-features-title">
              What Makes It Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card data-testid="feature-card-1">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🍯</div>
                  <h3 className="text-xl font-bold mb-3">Real Honey, Every Time</h3>
                  <p className="text-muted-foreground">
                    No syrup substitutes. Pure golden honey is hand-drizzled over every pie, fresh from the kitchen.
                  </p>
                </CardContent>
              </Card>
              <Card data-testid="feature-card-2">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🧀</div>
                  <h3 className="text-xl font-bold mb-3">Freshly Shredded Mozzarella & White Cheddar</h3>
                  <p className="text-muted-foreground">
                    We shred mozzarella and white cheddar in-house daily. The blend melts together perfectly — pre-shredded cheese won't do it the same way.
                  </p>
                </CardContent>
              </Card>
              <Card data-testid="feature-card-3">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-bold mb-3">Only in Hyannis</h3>
                  <p className="text-muted-foreground">
                    This recipe has never been franchised or copied. If you want the original, you come to Jack's on West Main Street.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-primary/5 border-b border-border">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-semibold mb-2">
              Ready to try the honey pizza that started it all?
            </p>
            <p className="text-muted-foreground mb-6">
              Order pickup or delivery online — or visit us at 373 West Main Street, Hyannis.
            </p>
            <Button size="lg" asChild data-testid="button-order-honey-cta">
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                Order Jack's Honey Pizza Online
                <ExternalLink size={18} />
              </a>
            </Button>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-background">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Links ── */}
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6 text-muted-foreground">
              Explore More at Jack's Lounge
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/menu"
                className="block p-5 rounded-md border border-border bg-background hover-elevate transition-colors text-center"
                data-testid="link-to-menu"
              >
                <div className="font-semibold mb-1">Full Menu</div>
                <div className="text-sm text-muted-foreground">Pizzas, wings, grinders, and more</div>
              </Link>
              <Link
                href="/story"
                className="block p-5 rounded-md border border-border bg-background hover-elevate transition-colors text-center"
                data-testid="link-to-story"
              >
                <div className="font-semibold mb-1">Our Story</div>
                <div className="text-sm text-muted-foreground">60 years of family tradition in Hyannis</div>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
