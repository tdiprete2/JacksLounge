import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { updateMetaTags } from "@/utils/seo";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

const pizzaItems = [
  { 
    name: "Jack's Famous Honey Pizza", 
    prices: { small: "13.25", large: "16.75" },
    description: "Our signature kitchen craft — freshly shredded mozzarella and white cheddar topped with a golden honey drizzle. A DiPrete family creation introduced in the 1980s that keeps locals coming back year after year.",
    image: "/images/featured/honey-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Special Pizza (The Works)", 
    prices: { small: "17", large: "23" },
    description: "Loaded with pepperoni, Italian sausage, linguica, meatballs, fresh mushrooms, green peppers & caramelized onions. The ultimate meat and veggie combination.",
    image: "/images/featured/special-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Meatlovers Pizza", 
    prices: { small: "17", large: "23" },
    description: "For serious carnivores - piled high with pepperoni, Italian sausage, linguica, homemade meatballs & crispy bacon on our hand-tossed crust.",
    image: "/images/featured/meatlovers-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Buffalo Chicken Pizza", 
    prices: { small: "15.50", large: "21" },
    description: "Tender grilled chicken tossed in tangy buffalo sauce, topped with melted mozzarella. Served with creamy blue cheese on the side.",
    image: "/images/featured/buffalo-chicken-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Chicken Bacon Ranch Pizza", 
    prices: { small: "16", large: "22" },
    description: "Juicy grilled chicken and crispy bacon with a generous drizzle of ranch dressing over melted cheese. A crowd favorite.",
    image: "/images/featured/chicken-bacon-ranch-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Mexican Pizza", 
    prices: { small: "16", large: "22" },
    description: "Seasoned beef, black olives & jalapeños with melted cheese. Served with fresh salsa & sour cream on the side for the perfect kick.",
    image: "/images/featured/mexican-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Vegetarian Pizza", 
    prices: { small: "15", large: "19" },
    description: "A garden-fresh combination of mushrooms, onions, green peppers, red onions, vine-ripened tomatoes & fresh spinach on our signature crust.",
    image: "/images/featured/vegetarian-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Build Your Own Pizza", 
    prices: { small: "11", large: "15" },
    description: "Start with our hand-tossed crust and fresh mozzarella, then add your favorite toppings from our selection of premium meats, fresh vegetables & specialty ingredients.",
    image: "/images/featured/build-your-own-pizza-jacks-lounge-hyannis.webp"
  },
  { 
    name: "Silver (Thin Crust) Pizza", 
    prices: { small: "10", large: "14" },
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
    "itemListElement": pizzaItems.map((item, index) => {
      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description,
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": item.prices.small,
            "highPrice": item.prices.large,
            "offerCount": 2,
            "availability": "https://schema.org/InStock"
          }
        }
      };
    })
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
      title: "Best Pizza in Hyannis MA | Jack's Lounge",
      description: "Try the best pizza in Hyannis, Cape Cod! Jack's Lounge serves award-winning specialty pizzas including our famous Honey Pizza. Fresh ingredients, hand-tossed crust. Order online or dine in.",
      canonical: "https://www.jackspizzahyannis.com/pizza/",
      ogTitle: "Best Pizza in Hyannis MA | Jack's Lounge",
      ogDescription: "Award-winning pizza since 1963. Try our famous Honey Pizza, Meatlovers, Buffalo Chicken & more. Fresh ingredients, hand-tossed crust. Order online!",
      ogUrl: "https://www.jackspizzahyannis.com/pizza/"
    });
  }, []);

  const firstRow = pizzaItems.slice(0, 5);
  const secondRow = pizzaItems.slice(5);

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
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
        <section 
          className="relative py-8 md:py-12 px-4"
          style={{
            background: "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)"
          }}
        >
          <div className="max-w-7xl mx-auto">
            <h1 className="sr-only" data-testid="text-pizza-hero-title">Best Pizza in Hyannis MA</h1>
            
            <div className="flex justify-center items-center gap-4 md:gap-6 mb-8 md:mb-12">
              {['P', 'I', 'Z', 'Z', 'A'].map((letter, idx) => (
                <span 
                  key={idx}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-widest"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {firstRow.map((item, index) => (
                <a
                  key={index}
                  href="https://olo.spoton.com/60c3b6829adef31f4442003e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col cursor-pointer"
                  data-testid={`pizza-item-${index}`}
                >
                  <div className="relative h-48 md:h-56 lg:h-64 mb-2 overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.name} - Best pizza in Hyannis MA`}
                      className="w-full h-full object-cover object-center transform -rotate-12 scale-125 group-hover:scale-130 transition-transform duration-300"
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </div>
                  
                  <h3 
                    className="text-lg md:text-xl text-white mb-2 text-center"
                    style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                    data-testid={`text-pizza-name-${index}`}
                  >
                    {item.name}
                  </h3>
                  
                  <div className="flex justify-center gap-2 mb-3" data-testid={`text-pizza-price-${index}`}>
                    <span className="inline-flex items-center justify-center bg-[#e55b25] text-white text-xs font-bold px-2 py-1 rounded">
                      10" ${item.prices.small}
                    </span>
                    <span className="inline-flex items-center justify-center bg-[#e55b25] text-white text-xs font-bold px-2 py-1 rounded">
                      14" ${item.prices.large}
                    </span>
                  </div>
                  
                  <p 
                    className="text-white/80 text-xs md:text-sm leading-relaxed text-center px-1"
                    data-testid={`text-pizza-desc-${index}`}
                  >
                    {item.description}
                  </p>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
              {secondRow.map((item, index) => (
                <a
                  key={index + 5}
                  href="https://olo.spoton.com/60c3b6829adef31f4442003e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col cursor-pointer"
                  data-testid={`pizza-item-${index + 5}`}
                >
                  <div className="relative h-40 md:h-48 mb-2 overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.name} - Best pizza in Hyannis MA`}
                      className="w-full h-full object-cover object-center transform -rotate-12 scale-125 group-hover:scale-130 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  <h3 
                    className="text-base md:text-lg text-white mb-2 text-center"
                    style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                    data-testid={`text-pizza-name-${index + 5}`}
                  >
                    {item.name}
                  </h3>
                  
                  <div className="flex justify-center gap-2 mb-2" data-testid={`text-pizza-price-${index + 5}`}>
                    <span className="inline-flex items-center justify-center bg-[#e55b25] text-white text-xs font-bold px-2 py-1 rounded">
                      10" ${item.prices.small}
                    </span>
                    <span className="inline-flex items-center justify-center bg-[#e55b25] text-white text-xs font-bold px-2 py-1 rounded">
                      14" ${item.prices.large}
                    </span>
                  </div>
                  
                  <p 
                    className="text-white/80 text-xs leading-relaxed text-center px-1"
                    data-testid={`text-pizza-desc-${index + 5}`}
                  >
                    {item.description}
                  </p>
                </a>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-white/20">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <p className="text-white/60 text-sm">Gluten-free crust available on 10" pizzas (+$4.00)</p>
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
                  data-testid="button-order-pizza"
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
