import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { updateMetaTags } from "@/utils/seo";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const menuCategories = [
  {
    id: 1,
    name: "Appetizers",
    description: "Start your meal right with our famous Hyannis appetizers - wings, nachos, quesadillas & more",
    items: [
      { name: "Nacho Supreme", price: "$14.00", description: "Tortilla chips, topped with our Homemade Chili & Cheese. Served with Lettuce, Tomatoes, Onions, Salsa, and Sour Cream on the side" },
      { name: "Quesadillas", price: "$13.00", description: "Your choice of Chicken, Beef, Vegetarian or Cheese Quesadilla. Served with Lettuce, Onions, Tomatoes, Salsa, and Sour Cream on the side" },
      { name: "Bone-in Chicken Wings", price: "$12.00", description: "8 Piece Wings - Choose your Sauce: Plain, Buffalo, BBQ, Garlic Parmesan, Sweet Chili" },
      { name: "Chicken Tenders", price: "$12.50", description: "Choose your Sauce: Plain, Buffalo, BBQ, or Sweet Chili" },
      { name: "Stuffed Quahog", price: "$7.00", description: "Breaded clam mixed with veggies, and Chorizo Sausage." },
      { name: "Cheese Nachos", price: "$11.50", description: "Warm tortilla Chips and your choice of Chicken or Beef (Add $2.00) served with salsa and sour cream" },
      { name: "Cheesy Smothered Garlic Bread", price: "$7.00", description: "Our homemade Garlic bread with cheese, served with Marinara" },
      { name: "Basket of Warm Nachos", price: "$5.50", description: "Served with Salsa" },
      { name: "Mozzarella Sticks", price: "$10.00", description: "Cheesy goodness served with Marinara" },
      { name: "Pretzel Sticks", price: "$10.00", description: "3 Baked Pretzels with Cheese Sauce, Honey mustard or Both" },
    ]
  },
  {
    id: 2,
    name: "Pizza",
    description: "Best Pizza in Hyannis MA - All 10\" Pizzas can be Gluten Free Crust Add $4.00 - WE ONLY USE FRESH VEGETABLES",
    items: [
      { name: "Special Pizza", prices: "10\" $17.00 / 14\" $23.00", description: "Pepperoni, Sausage, Linguica, Meatballs, Mushrooms, Peppers & Onions" },
      { name: "Meatlovers", prices: "10\" $17.00 / 14\" $23.00", description: "Pepperoni, Sausage, Linguica, Meatballs & Bacon" },
      { name: "Vegetarian", prices: "10\" $15.00 / 14\" $19.00", description: "Mushrooms, Onions, Peppers, Red Onions, Tomatoes & Spinach" },
      { name: "Chicken Bacon Ranch", prices: "10\" $16.00 / 14\" $22.00", description: "Grilled Chicken, Bacon, with ranch drizzled over the top" },
      { name: "Buffalo Chicken Pizza", prices: "10\" $15.50 / 14\" $21.00", description: "Grilled Chicken tossed in Buffalo sauce. Served with Blue Cheese on the side" },
      { name: "Mexican Pizza", prices: "10\" $16.00 / 14\" $22.00", description: "Beef, Olives, & Jalapeños, served with Salsa & Sour Cream on the side" },
      { name: "Jack's Famous Honey Pizza", prices: "10\" $13.25 / 14\" $16.75", description: "Freshly shredded cheese with topped with Honey drizzle. A Kitchen Craft with Hyannis tradition" },
      { name: "Build your Own Pizza", prices: "10\" $11.00 / 14\" $15.00", description: "Start with cheese and add your favorite toppings" },
      { name: "Silver (Thin Crust) Pizza", prices: "10\" $10.00 / 14\" $14.00", description: "Our crispy thin crust pizza" },
    ]
  },
  {
    id: 3,
    name: "Calzones",
    description: "Authentic Italian Calzones in Hyannis - Served with Cheese & Spinach and Marinara",
    items: [
      { name: "Vegetarian Calzone", price: "$13.00", description: "Mushroom, Onion, Tomato, Spinach, Green Pepper & Red Onions" },
      { name: "Sautéed Steak Calzone", price: "$14.00", description: "Shaved Steak sautéed with Pea Pods" },
      { name: "Burrito Calzone", price: "$13.50", description: "Homemade Chili, & Cheese. Served with Tomatoes, Black Olives, Lettuce, Salsa & Sour cream on the side" },
      { name: "Build Your Own Calzone", price: "$12.00", description: "Start with Cheese and Spinach" },
    ]
  },
  {
    id: 4,
    name: "Grinders",
    description: "Classic New England Grinders - Served with a Dill pickle & Chips - Add Fries/Onion Rings $1.50",
    items: [
      { name: "Veggie Grinder", price: "$13.00", description: "Sautéed Mushroom, Onion, Tomato, Green Pepper & Red Onions" },
      { name: "Italian Grinder", price: "$13.00", description: "Capicola, Salami, Provolone, Lettuce, Tomatoes & Onions" },
      { name: "Sautéed Steak & Cheese", price: "$13.00", description: "Your Choice of American, Provolone, or Swiss Cheese" },
      { name: "Meatball Grinder", price: "$13.00", description: "Homemade Meatballs topped with marinara & your choice of American, Swiss, Provolone, or Pizza Cheese" },
      { name: "Linguica Grinder", price: "$13.00", description: "Grilled Linguica, Green Peppers & Marinara Sauce" },
      { name: "Ham & Cheese Grinder", price: "$13.00", description: "Sliced Ham, your choice of American, Swiss, or Provolone" },
    ]
  },
  {
    id: 5,
    name: "Grill",
    description: "Burgers & Grill Favorites in Hyannis - Served with a Dill pickle, Chips or Fries Included - Add Onion Rings $1.50",
    items: [
      { name: "1/2 Pound Hamburger", price: "$12.50", description: "1/2 Pound Burger served with Lettuce Tomato & Onion" },
      { name: "Bacon Cheeseburger", price: "$14.50", description: "1/2 Pound Burger Served with Bacon Lettuce Tomato, Onion & your choice of American, Swiss or American Cheese" },
      { name: "BLT", price: "$9.00", description: "Bacon, Lettuce, Tomato & Mayo, on Your Choice of White, Wheat, Rye or Gluten Free Bread" },
      { name: "Grilled Cheese", price: "$6.50", description: "Grilled Cheese on Your Choice of White, Wheat, Rye or Gluten Free Bread" },
      { name: "Grilled Frank", price: "$6.50", description: "Grilled Hot Dog Served with Chips or Fries & a Dill Pickle" },
      { name: "Chili Dog", price: "$7.25", description: "Homemade Chili over a Grilled Hot Dog" },
    ]
  },
  {
    id: 6,
    name: "Jack's Entrees",
    description: "Signature Hyannis entrees - Hearty Italian classics made fresh every day",
    items: [
      { name: "Spaghetti & Sauce", price: "$9.00", description: "Spaghetti & Marinara w/ Garlic Bread" },
    ]
  },
  {
    id: 7,
    name: "Soup & Salad",
    description: "Fresh salads & homemade soups - Made daily with quality ingredients",
    items: [
      { name: "Soup of the Day", price: "Cup $5.25 / Bowl $6.50", description: "Ask your server for today's selection" },
      { name: "Chili with Garlic Bread", price: "Cup $5.25 / Bowl $7.75", description: "Homemade chili served with garlic bread" },
      { name: "House Salad", price: "Small $6.95 / Large $9.95", description: "Freshly chopped Lettuce, tomatoes, cucumbers, red onions & peppers" },
      { name: "Chef Salad", price: "$13.00", description: "A House salad topped with Chicken, Ham, & cheese. Served with a side of pita bread" },
      { name: "Antipasto Salad", price: "$13.00", description: "A House salad with pepperoni, topped with salami, capicola, cheese & olives. Served with a side of pita bread" },
      { name: "Spinach Salad", price: "$12.00", description: "Fresh Spinach, topped with mushrooms, bacon, & cheese" },
      { name: "Caesar Salad", price: "$11.50", description: "Lettuce topped with croûtons, & parmesan cheese & Caesar dressing" },
    ]
  },
  {
    id: 8,
    name: "Sides",
    description: "Perfect additions to any meal - Fries, onion rings, and more",
    items: [
      { name: "Basket of Fries", price: "$6.00", description: "Crispy golden fries" },
      { name: "Curly Fries", price: "$6.00", description: "Seasoned curly fries" },
      { name: "Onion Rings", price: "$6.50", description: "Beer-battered onion rings" },
      { name: "Sautéed Mushrooms & Onions", price: "$5.00", description: "Fresh sautéed vegetables" },
      { name: "Bag of Chips (Cape Cod or Lay's)", price: "$1.00", description: "Your choice of chips" },
      { name: "Side of Broccoli", price: "$3.50", description: "Steamed broccoli" },
    ]
  },
  {
    id: 9,
    name: "Kid's Menu",
    description: "Kid-friendly favorites for our younger guests - Pizza, pasta, and chicken tenders",
    items: [
      { name: "Chicken Tenders & Fries", price: "$12.50", description: "Baked Chicken Tenders with our Oven Baked Fries" },
      { name: "Kid's Spaghetti", price: "$9.00", description: "Spaghetti, with your choice of butter or Marinara Sauce, and a Piece of garlic bread" },
      { name: "Slice of Cheese Pizza", price: "$4.00", description: "One slice of our famous cheese pizza" },
    ]
  },
];

function parsePrice(priceStr: string): string | null {
  const match = priceStr.match(/^\$?([\d.]+)/);
  return match ? match[1] : null;
}

function parseSizePrice(priceStr: string): { lowPrice: string; highPrice: string } | null {
  const match = priceStr.match(/10"\s*\$?([\d.]+)\s*\/\s*14"\s*\$?([\d.]+)/);
  if (match) {
    return { lowPrice: match[1], highPrice: match[2] };
  }
  return null;
}

function generateMenuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Jack's Lounge Full Menu",
    "description": "Complete menu featuring pizza, wings, Italian favorites, calzones, grinders, soups, salads and more at Jack's Lounge in Hyannis, MA.",
    "url": "https://www.jackspizzahyannis.com/menu/",
    "hasMenuSection": menuCategories.map(category => ({
      "@type": "MenuSection",
      "name": category.name,
      "description": category.description,
      "hasMenuItem": category.items.map(item => {
        const baseItem = {
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description
        };
        
        if ('price' in item && item.price) {
          const singlePrice = parsePrice(item.price);
          if (singlePrice) {
            return {
              ...baseItem,
              "offers": {
                "@type": "Offer",
                "price": singlePrice,
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            };
          }
        }
        
        if ('prices' in item && item.prices) {
          const rangePrices = parseSizePrice(item.prices);
          if (rangePrices) {
            return {
              ...baseItem,
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": rangePrices.lowPrice,
                "highPrice": rangePrices.highPrice,
                "priceCurrency": "USD",
                "offerCount": 2,
                "availability": "https://schema.org/InStock"
              }
            };
          }
        }
        
        return baseItem;
      })
    }))
  };
}

export default function Menu() {
  useEffect(() => {
    updateMetaTags({
      title: "Menu - Jack's Lounge Hyannis | Best Pizza & Italian Restaurant",
      description: "View Jack's Lounge full menu - signature honey pizzas, crispy wings, Italian favorites, calzones, grinders & more. Order online for pickup or delivery in Hyannis, MA.",
      canonical: "https://www.jackspizzahyannis.com/menu/",
      ogTitle: "Jack's Lounge Menu - Best Pizza & Italian Food in Hyannis MA",
      ogDescription: "Browse our full menu of pizzas, wings, Italian favorites and more. Family-owned in Hyannis since 1963 with authentic recipes and fresh ingredients.",
      ogUrl: "https://www.jackspizzahyannis.com/menu/"
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateMenuSchema())}
        </script>
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-menu-hero-title">Jack's Lounge Menu - Best Pizza & Wings Hyannis MA</h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8">"Over 60 years serving Hyannis with delicious Italian and American favorites. From our signature Hot Honey Pizza & Honey Pizza to our crispy bone-in chicken wings, every dish is made with care using fresh, quality ingredients. Order online for the best pizza delivery and takeout on Cape Cod."</p>
            <Button
              size="lg"
              asChild
              data-testid="button-order-full-menu"
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
          </div>
        </section>

        {/* Menu Categories */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-16">
              {menuCategories.map((category) => (
                <div key={category.id} data-testid={`category-${category.id}`}>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2" data-testid={`text-category-${category.id}`}>
                      {category.name}
                    </h2>
                    <p className="text-base md:text-lg text-foreground/70">{category.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.items.map((item, index) => (
                      <Card key={index} className="hover-elevate" data-testid={`menu-item-${category.id}-${index}`}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <h3 className="text-xl font-semibold text-foreground" data-testid={`text-item-name-${category.id}-${index}`}>
                              {item.name}
                            </h3>
                            {'price' in item && item.price && (
                              <span className="text-base text-primary font-bold whitespace-nowrap" data-testid={`text-item-price-${category.id}-${index}`}>
                                {item.price}
                              </span>
                            )}
                            {'prices' in item && item.prices && (
                              <span className="text-sm text-primary font-bold whitespace-nowrap" data-testid={`text-item-prices-${category.id}-${index}`}>
                                {item.prices}
                              </span>
                            )}
                          </div>
                          <p className="text-foreground/70 text-sm" data-testid={`text-item-desc-${category.id}-${index}`}>
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Famous Honey Pizza link card */}
            <div className="mt-12">
              <Link
                href="/famous-honey-pizza"
                className="block group rounded-md border border-primary/30 bg-primary/5 hover-elevate transition-colors overflow-hidden"
                data-testid="link-famous-honey-pizza"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 md:p-8">
                  <img
                    src="/images/featured/honey-pizza-jacks-lounge-hyannis.webp"
                    alt="Jack's Famous Honey Pizza"
                    className="w-full sm:w-40 md:w-48 h-32 sm:h-28 object-cover rounded-md shrink-0"
                    loading="lazy"
                    width="192"
                    height="112"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-medium text-primary uppercase tracking-wider mb-1">Signature Item</p>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Jack's Famous Honey Pizza</h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      A DiPrete family original since the 1980s — freshly shredded mozzarella and white cheddar with a golden honey drizzle. Learn the story behind the recipe.
                    </p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-primary shrink-0 hidden sm:block group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            <div className="text-center mt-16">
              <p className="text-foreground/70 mb-6">
                Prices and full menu available when ordering online
              </p>
              <Button
                size="lg"
                asChild
                data-testid="button-view-full-menu"
              >
                <a
                  href="https://olo.spoton.com/60c3b6829adef31f4442003e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  View Full Menu & Order
                  <ExternalLink size={18} />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
