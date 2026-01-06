import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink, Drumstick, Flame, MapPin } from "lucide-react";
import { useEffect } from "react";
import { updateMetaTags } from "@/utils/seo";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

const wingItems = [
  { 
    name: "Bone-In Buffalo Wings", 
    price: "$12.00", 
    pieces: "8 pieces",
    description: "Crispy bone-in wings tossed in our tangy buffalo sauce. The classic Cape Cod favorite with the perfect heat level.",
    sauces: ["Plain", "Buffalo", "BBQ", "Garlic Parmesan", "Sweet Chili"]
  },
  { 
    name: "Garlic Parmesan Wings", 
    price: "$12.00", 
    pieces: "8 pieces",
    description: "Savory wings coated in buttery garlic and parmesan cheese. A flavor explosion that's addictively delicious.",
    sauces: ["Garlic Parmesan"]
  },
  { 
    name: "BBQ Wings", 
    price: "$12.00", 
    pieces: "8 pieces",
    description: "Sweet and smoky BBQ glazed wings with our house-made barbecue sauce. Perfect for BBQ lovers.",
    sauces: ["BBQ"]
  },
  { 
    name: "Sweet Chili Wings", 
    price: "$12.00", 
    pieces: "8 pieces",
    description: "Asian-inspired sweet chili glaze with a hint of heat. The perfect balance of sweet and spicy.",
    sauces: ["Sweet Chili"]
  },
  { 
    name: "Plain Wings", 
    price: "$12.00", 
    pieces: "8 pieces",
    description: "Perfectly crispy wings with no sauce - let the natural flavor shine. Great for dipping!",
    sauces: ["Plain"]
  },
  { 
    name: "Chicken Tenders", 
    price: "$12.50", 
    pieces: "Large portion",
    description: "Hand-breaded chicken tenders cooked golden and crispy. Your choice of sauce on the side.",
    sauces: ["Plain", "Buffalo", "BBQ", "Sweet Chili"]
  },
];

const sauceDescriptions = [
  { name: "Buffalo", heat: "Hot", description: "Classic tangy hot sauce - our most popular choice" },
  { name: "BBQ", heat: "Mild", description: "Sweet & smoky house-made barbecue" },
  { name: "Garlic Parmesan", heat: "Mild", description: "Buttery garlic with aged parmesan" },
  { name: "Sweet Chili", heat: "Medium", description: "Asian-inspired sweet heat" },
  { name: "Plain", heat: "No sauce", description: "Naked & crispy - perfect for dipping" },
];

function generateWingsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Jack's Lounge Wings Menu - Best Wings in Hyannis MA",
    "description": "Crispy bone-in wings and chicken tenders in Hyannis. Choose from Buffalo, BBQ, Garlic Parmesan, Sweet Chili or Plain.",
    "numberOfItems": wingItems.length,
    "itemListElement": wingItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "MenuItem",
        "name": item.name,
        "description": item.description,
        "offers": {
          "@type": "Offer",
          "price": item.price.replace('$', ''),
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
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
    "servesCuisine": ["Wings", "American", "Italian"],
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
      "name": "Wings Menu",
      "url": "https://www.jackspizzahyannis.com/wings/",
      "hasMenuSection": {
        "@type": "MenuSection",
        "name": "Wings & Tenders",
        "description": "Best wings in Hyannis MA - crispy, flavorful, five sauce options",
        "hasMenuItem": wingItems.map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description
        }))
      }
    }
  };
}

export default function Wings() {
  useEffect(() => {
    updateMetaTags({
      title: "Best Wings in Hyannis MA | Jack's Lounge - Crispy Buffalo Wings & More",
      description: "Craving wings in Hyannis? Jack's Lounge serves the best bone-in wings on Cape Cod! Buffalo, BBQ, Garlic Parmesan & Sweet Chili. Order online or dine in.",
      canonical: "https://www.jackspizzahyannis.com/wings/",
      ogTitle: "Best Wings in Hyannis MA | Jack's Lounge",
      ogDescription: "Crispy bone-in wings with 5 delicious sauces. Buffalo, BBQ, Garlic Parmesan, Sweet Chili & Plain. Order online for pickup or delivery!",
      ogUrl: "https://www.jackspizzahyannis.com/wings/"
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateWingsSchema())}
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
                <Drumstick className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-wings-hero-title">
              Best Wings in Hyannis MA
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-4">
              <strong>Jack's Lounge</strong> serves Cape Cod's crispiest, most flavorful wings.
            </p>
            <p className="text-base md:text-lg text-foreground/70 mb-8">
              Every order is cooked fresh to golden perfection. Choose from five delicious sauce options: Buffalo, BBQ, Garlic Parmesan, Sweet Chili, or Plain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                data-testid="button-order-wings"
              >
                <a
                  href="https://olo.spoton.com/60c3b6829adef31f4442003e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Order Wings Online
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

        {/* Wings Menu */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Wings & Chicken Tenders
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                All wings served with celery and your choice of blue cheese or ranch dressing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wingItems.map((item, index) => (
                <Card key={index} className="hover-elevate" data-testid={`wing-item-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-foreground" data-testid={`text-wing-name-${index}`}>
                        {item.name}
                      </h3>
                      <span className="text-primary font-bold whitespace-nowrap" data-testid={`text-wing-price-${index}`}>
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/50 mb-3">{item.pieces}</p>
                    <p className="text-foreground/70 text-sm mb-3" data-testid={`text-wing-desc-${index}`}>
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.sauces.map((sauce, sauceIndex) => (
                        <span key={sauceIndex} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {sauce}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sauce Guide */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Sauce Guide
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {sauceDescriptions.map((sauce, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg mb-1">{sauce.name}</h4>
                      {sauce.heat && <span className="text-sm">{sauce.heat}</span>}
                      <p className="text-sm text-foreground/70 mt-2">{sauce.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16 p-8 bg-card rounded-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready for the Best Wings in Hyannis?
              </h3>
              <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
                Order online for pickup or delivery. All wings cooked fresh to order!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  data-testid="button-order-wings-bottom"
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

            {/* Why Our Wings */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Why Jack's Has the Best Wings in Hyannis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                    <Drumstick className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Always Fresh</h4>
                  <p className="text-foreground/70">Never frozen, always cooked to order for maximum crispiness</p>
                </div>
                <div className="p-6">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                    <Flame className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">House-Made Sauces</h4>
                  <p className="text-foreground/70">Five signature sauces made in-house daily</p>
                </div>
                <div className="p-6">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Cape Cod Favorite</h4>
                  <p className="text-foreground/70">Locals and visitors agree - we've got the best wings on the Cape</p>
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
