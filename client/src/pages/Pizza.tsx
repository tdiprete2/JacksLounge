import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink, Pizza as PizzaIcon } from "lucide-react";
import { useEffect } from "react";
import { updateMetaTags } from "@/utils/seo";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

const pizzaItems = [
  { 
    name: "Jack's Famous Honey Pizza", 
    prices: "10\" $13.25 / 14\" $16.75", 
    description: "Our signature kitchen craft - freshly shredded mozzarella cheese topped with a golden honey drizzle. A sweet and savory Hyannis tradition that keeps locals coming back for over 60 years.",
    image: "/images/featured/honey-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Special Pizza (The Works)", 
    prices: "10\" $17.00 / 14\" $23.00", 
    description: "Loaded with pepperoni, Italian sausage, linguica, meatballs, fresh mushrooms, green peppers & caramelized onions. The ultimate meat and veggie combination.",
    image: "/images/featured/special-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Meatlovers Pizza", 
    prices: "10\" $17.00 / 14\" $23.00", 
    description: "For serious carnivores - piled high with pepperoni, Italian sausage, linguica, homemade meatballs & crispy bacon on our hand-tossed crust.",
    image: "/images/featured/meatlovers-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Buffalo Chicken Pizza", 
    prices: "10\" $15.50 / 14\" $21.00", 
    description: "Tender grilled chicken tossed in tangy buffalo sauce, topped with melted mozzarella. Served with creamy blue cheese on the side.",
    image: "/images/featured/buffalo-chicken-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Chicken Bacon Ranch Pizza", 
    prices: "10\" $16.00 / 14\" $22.00", 
    description: "Juicy grilled chicken and crispy bacon with a generous drizzle of ranch dressing over melted cheese. A crowd favorite.",
    image: "/images/featured/chicken-bacon-ranch-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Mexican Pizza", 
    prices: "10\" $16.00 / 14\" $22.00", 
    description: "Seasoned beef, black olives & jalapeños with melted cheese. Served with fresh salsa & sour cream on the side for the perfect kick.",
    image: "/images/featured/mexican-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Vegetarian Pizza", 
    prices: "10\" $15.00 / 14\" $19.00", 
    description: "A garden-fresh combination of mushrooms, onions, green peppers, red onions, vine-ripened tomatoes & fresh spinach on our signature crust.",
    image: "/images/featured/vegetarian-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Build Your Own Pizza", 
    prices: "10\" $11.00 / 14\" $15.00", 
    description: "Start with our hand-tossed crust and fresh mozzarella, then add your favorite toppings from our selection of premium meats, fresh vegetables & specialty ingredients.",
    image: "/images/featured/build-your-own-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Silver (Thin Crust) Pizza", 
    prices: "10\" $10.00 / 14\" $14.00", 
    description: "Our crispy, golden thin crust pizza - light, crunchy & perfect for those who love that satisfying crackle with every bite.",
    image: "/images/featured/thin-crust-pizza-jacks-lounge-hyannis.webp"
  },
];

function generatePizzaSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Jack's Lounge Pizza Menu - Best Pizza in Hyannis MA",
    "description": "Award-winning pizza in Hyannis, Cape Cod. Try our famous Honey Pizza and specialty pies made fresh daily since 1963.",
    "numberOfItems": pizzaItems.length,
    "itemListElement": pizzaItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "MenuItem",
        "name": item.name,
        "description": item.description,
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "offerCount": 2
        },
        "menuAddOn": {
          "@type": "MenuSection",
          "name": "Customizations",
          "description": "Gluten-free crust available (+$4.00). Fresh vegetables only."
        }
      }
    }))
  };
}

function generateRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "https://www.jackspizzahyannis.com/#restaurant",
    "name": "Jack's Lounge",
    "image": "https://www.jackspizzahyannis.com/images/social/og-image.jpg",
    "url": "https://www.jackspizzahyannis.com",
    "telephone": "+1-508-775-0612",
    "priceRange": "$$",
    "servesCuisine": ["Pizza", "Italian", "American"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "373 West Main Street",
      "addressLocality": "Hyannis",
      "addressRegion": "MA",
      "postalCode": "02601",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6525,
      "longitude": -70.2956
    },
    "hasMenu": {
      "@type": "Menu",
      "name": "Pizza Menu",
      "url": "https://www.jackspizzahyannis.com/pizza/",
      "hasMenuSection": {
        "@type": "MenuSection",
        "name": "Signature Pizzas",
        "description": "Best pizza in Hyannis MA - fresh ingredients, hand-tossed crust",
        "hasMenuItem": pizzaItems.map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description
        }))
      }
    }
  };
}

export default function Pizza() {
  useEffect(() => {
    updateMetaTags({
      title: "Best Pizza in Hyannis MA | Jack's Lounge - Famous Honey Pizza Since 1963",
      description: "Try the best pizza in Hyannis, Cape Cod! Jack's Lounge serves award-winning specialty pizzas including our famous Honey Pizza. Fresh ingredients, hand-tossed crust. Order online or dine in.",
      canonical: "https://www.jackspizzahyannis.com/pizza/",
      ogTitle: "Best Pizza in Hyannis MA | Jack's Lounge",
      ogDescription: "Award-winning pizza since 1963. Try our famous Honey Pizza, Meatlovers, Buffalo Chicken & more. Fresh ingredients, hand-tossed crust. Order online!",
      ogUrl: "https://www.jackspizzahyannis.com/pizza/"
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generatePizzaSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateRestaurantSchema())}
        </script>
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <PizzaIcon className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-pizza-hero-title">
              Best Pizza in Hyannis MA
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-4">
              <strong>Jack's Lounge</strong> has been serving Cape Cod's favorite pizza since 1963.
            </p>
            <p className="text-base md:text-lg text-foreground/70 mb-8">
              From our signature honey-drizzled pizza to loaded specialty pies, every pizza is hand-tossed and made fresh with quality ingredients. Gluten-free crust available on all 10" pizzas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                data-testid="button-order-pizza"
              >
                <a
                  href="https://olo.spoton.com/60c3b6829adef31f4442003e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Order Pizza Online
                  <ExternalLink size={18} />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                data-testid="button-view-full-menu"
              >
                <Link href="/menu/">
                  View Full Menu
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pizza Menu */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Signature Pizzas
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                All pizzas available in 10" or 14" sizes. <strong>Gluten-free crust</strong> available on 10" pizzas (+$4.00). We use only fresh vegetables.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pizzaItems.map((item, index) => (
                <Card key={index} className="hover-elevate" data-testid={`pizza-item-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-foreground" data-testid={`text-pizza-name-${index}`}>
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-primary font-bold text-sm mb-3" data-testid={`text-pizza-price-${index}`}>
                      {item.prices}
                    </p>
                    <p className="text-foreground/70 text-sm" data-testid={`text-pizza-desc-${index}`}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16 p-8 bg-card rounded-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Order the Best Pizza in Hyannis?
              </h3>
              <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
                Skip the wait! Order online for pickup or delivery. All pizzas made fresh to order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  data-testid="button-order-pizza-bottom"
                >
                  <a
                    href="https://olo.spoton.com/60c3b6829adef31f4442003e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Order Online Now
                    <ExternalLink size={18} />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  data-testid="button-call-to-order"
                >
                  <a href="tel:+15087750612">
                    Call (508) 775-0612
                  </a>
                </Button>
              </div>
            </div>

            {/* Why Choose Jack's */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Why Jack's Lounge Has the Best Pizza in Hyannis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                  <div className="text-4xl mb-4">🍕</div>
                  <h4 className="font-semibold text-lg mb-2">Fresh Daily</h4>
                  <p className="text-foreground/70">Hand-tossed dough made fresh every day using our original 1963 recipe</p>
                </div>
                <div className="p-6">
                  <div className="text-4xl mb-4">🧀</div>
                  <h4 className="font-semibold text-lg mb-2">Quality Ingredients</h4>
                  <p className="text-foreground/70">Premium mozzarella, fresh vegetables, and house-made sauces</p>
                </div>
                <div className="p-6">
                  <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                  <h4 className="font-semibold text-lg mb-2">Family Tradition</h4>
                  <p className="text-foreground/70">60+ years serving Cape Cod families with recipes passed down through generations</p>
                </div>
              </div>
            </div>

            {/* Back to Menu */}
            <div className="text-center mt-12">
              <Link href="/menu/" className="text-primary hover:underline font-semibold">
                ← Back to Full Menu
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
