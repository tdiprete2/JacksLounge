import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { updateMetaTags } from "@/utils/seo";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

const wingFlavors = [
  { 
    name: "The Original", 
    description: "Our signature oven-baked wings, kept simple and seasoned to perfection. Rubbed in a custom blend of savory spices and baked until the skin is golden-crisp and the meat is tender. No sauce, no mess—just bold, natural flavor in every bite.",
    image: "/images/featured/original-wings-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Buffalo", 
    description: "The gold standard. Baked wings tossed in a bright, tangy cayenne pepper sauce with a smooth buttery finish. Bold flavor with a classic kick. Served with a cool side of Bleu Cheese or Ranch.",
    image: "/images/featured/buffalo-wings-jacks-lounge-hyannis.webp"
  },
  { 
    name: "BBQ", 
    description: "Our wings are tossed in a rich, BBQ glaze that defines the word \"sticky.\" Infused with hickory smoke and a hint of molasses, the sauce creates a deep, savory coating that's thick enough to cling and bold enough to satisfy.",
    image: "/images/featured/bbq-wings-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Garlic Parm", 
    description: "A savory classic. Our crispy baked wings are fully coated in a rich, buttery garlic sauce and tossed until every crevice is filled with creamy parmesan flavor.",
    image: "/images/featured/garlic-parm-wings-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Sweet Chili", 
    description: "Crispy, oven-baked wings. In a thick, glistening coating that hits you first with a smooth sweetness before finishing with a mild, tangy chili kick. Perfectly tossed so every bite is coated in that signature red-pepper shine.",
    image: "/images/featured/sweet-chili-wings-jacks-lounge-hyannis.webp"
  },
];

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
    description: "Chicken tenders cooked golden and crispy. Your choice of sauce on the side.",
    sauces: ["Plain", "Buffalo", "BBQ", "Sweet Chili"]
  },
];

const wingPricing = [
  { pieces: "8 Piece", price: "12" },
  { pieces: "16 Piece", price: "22" },
  { pieces: "25 Piece", price: "32" },
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
    <div className="min-h-screen bg-[#2a2a2a]">
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
        <section 
          className="relative py-8 md:py-12 px-4"
          style={{
            background: "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)"
          }}
        >
          <div className="max-w-7xl mx-auto">
            <h1 className="sr-only" data-testid="text-wings-hero-title">Best Wings in Hyannis MA</h1>
            
            <div className="flex justify-center items-center gap-1 md:gap-2 mb-8 md:mb-12">
              {['W', 'I', 'N', 'G', 'S'].map((letter, idx) => (
                <div key={idx} className="flex items-center">
                  <span 
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-widest"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {letter}
                  </span>
                  {idx < 4 && (
                    <div className="w-px h-16 md:h-24 lg:h-32 bg-white/30 mx-2 md:mx-4" />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {wingFlavors.map((item, index) => (
                <a
                  key={index}
                  href="https://olo.spoton.com/60c3b6829adef31f4442003e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col cursor-pointer"
                  data-testid={`wing-item-${index}`}
                >
                  <div className="relative h-48 md:h-56 lg:h-64 mb-4 overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.name} Wings - Best wings in Hyannis MA`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </div>
                  
                  <h3 
                    className="text-lg md:text-xl text-white mb-3 text-center"
                    style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                    data-testid={`text-wing-name-${index}`}
                  >
                    {item.name}
                  </h3>
                  
                  <p 
                    className="text-white/80 text-xs md:text-sm leading-relaxed text-center px-1"
                    data-testid={`text-wing-desc-${index}`}
                  >
                    {item.description}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white/5 rounded-lg">
              <h3 className="text-xl md:text-2xl text-white text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Also Available: Chicken Tenders
              </h3>
              <p className="text-white/70 text-center text-sm max-w-2xl mx-auto">
                Chicken tenders cooked golden and crispy. Your choice of sauce on the side: Plain, Buffalo, BBQ, or Sweet Chili. <span className="text-[#e55b25] font-bold">$12.50</span>
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-12 pt-8 border-t border-white/20">
              {wingPricing.map((option, index) => (
                <div key={index} className="flex items-center gap-3" data-testid={`text-wing-price-${index}`}>
                  <span className="text-white text-lg md:text-xl font-semibold">
                    {option.pieces}
                  </span>
                  <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#e55b25] text-white text-lg md:text-xl font-bold">
                    ${option.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-white/20">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <p className="text-white/60 text-sm">All wings served with celery and your choice of blue cheese or ranch</p>
              </div>
              
              <div className="text-center">
                <h2 
                  className="text-2xl md:text-3xl text-[#d4af37] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                >
                  Jack's Lounge
                </h2>
                <p className="text-white/80 text-sm">373 West Main Street Hyannis, MA</p>
                <p className="text-white/80 text-sm">(508)-775-0612</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
                <Button
                  size="lg"
                  className="bg-[#e55b25] hover:bg-[#d14a15] text-white"
                  asChild
                  data-testid="button-order-wings"
                >
                  <a
                    href="https://olo.spoton.com/60c3b6829adef31f4442003e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Order Online
                    <ExternalLink size={18} />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                  data-testid="button-view-full-menu"
                >
                  <Link href="/menu/">
                    View Full Menu
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
