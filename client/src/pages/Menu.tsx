import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { updateMetaTags } from "@/utils/seo";

const menuCategories = [
  {
    id: 1,
    name: "Appetizers",
    description: "Best appetizers in Hyannis - Famous wings, loaded nachos, quesadillas & Cape Cod favorites",
    items: [
      { name: "Nacho Supreme", price: "$14.00", description: "Hyannis favorite! Tortilla chips topped with our Homemade Chili & Cheese. Served with Lettuce, Tomatoes, Onions, Salsa, and Sour Cream" },
      { name: "Quesadillas", price: "$13.00", description: "Best quesadillas in Hyannis - Chicken, Beef, Vegetarian or Cheese. Served with Lettuce, Onions, Tomatoes, Salsa, and Sour Cream" },
      { name: "Bone-in Chicken Wings", price: "$12.00", description: "Best wings in Hyannis! 8 crispy-baked pieces. Choose: Plain, Buffalo, BBQ, Garlic Parmesan, Sweet Chili" },
      { name: "Chicken Tenders", price: "$12.50", description: "Crispy boneless tenders - Cape Cod favorite! Choose: Plain, Buffalo, BBQ, or Sweet Chili sauce" },
      { name: "Stuffed Quahog", price: "$7.00", description: "Authentic Cape Cod stuffed quahog - Breaded clam with veggies and Chorizo Sausage" },
      { name: "Cheese Nachos", price: "$11.50", description: "Game day favorite! Warm tortilla chips with Chicken or Beef (Add $2.00), salsa and sour cream" },
      { name: "Cheesy Smothered Garlic Bread", price: "$7.00", description: "Italian favorite - Our homemade garlic bread with melted cheese, served with Marinara" },
      { name: "Basket of Warm Nachos", price: "$5.50", description: "Perfect party starter - Crispy nachos served with fresh Salsa" },
      { name: "Mozzarella Sticks", price: "$10.00", description: "Golden crispy mozzarella sticks served with Marinara - A Hyannis favorite" },
      { name: "Pretzel Sticks", price: "$10.00", description: "3 freshly baked soft pretzels with Cheese Sauce, Honey Mustard or Both" },
    ]
  },
  {
    id: 2,
    name: "Pizza",
    description: "Best Pizza in Hyannis MA - Home of the Original Honey Pizza Since 1963. Gluten Free Crust Available (+$4). Fresh Vegetables Only!",
    items: [
      { name: "Special Pizza", prices: "10\" $17.00 / 14\" $23.00", description: "Hyannis favorite loaded pizza - Pepperoni, Sausage, Linguica, Meatballs, Mushrooms, Peppers & Onions" },
      { name: "Meatlovers", prices: "10\" $17.00 / 14\" $23.00", description: "Best meat pizza in Hyannis - Loaded with Pepperoni, Sausage, Linguica, Meatballs & Bacon" },
      { name: "Vegetarian", prices: "10\" $15.00 / 14\" $19.00", description: "Fresh veggie pizza - Mushrooms, Onions, Peppers, Red Onions, Tomatoes & Spinach" },
      { name: "Chicken Bacon Ranch", prices: "10\" $16.00 / 14\" $22.00", description: "Cape Cod favorite - Grilled Chicken, crispy Bacon, with creamy ranch drizzled over the top" },
      { name: "Buffalo Chicken Pizza", prices: "10\" $15.50 / 14\" $21.00", description: "Spicy buffalo pizza - Grilled Chicken tossed in Buffalo sauce. Blue Cheese on the side" },
      { name: "Mexican Pizza", prices: "10\" $16.00 / 14\" $22.00", description: "Unique Mexican-style pizza - Beef, Olives, & Jalapeños with Salsa & Sour Cream" },
      { name: "Jack's Famous Honey Pizza", prices: "10\" $13.25 / 14\" $16.75", description: "The Original Honey Pizza! Fresh mozzarella topped with our signature honey drizzle - A Hyannis tradition since 1963" },
      { name: "Build your Own Pizza", prices: "10\" $11.00 / 14\" $15.00", description: "Create your perfect pizza - Start with cheese and add your favorite fresh toppings" },
      { name: "Silver (Thin Crust) Pizza", prices: "10\" $10.00 / 14\" $14.00", description: "Crispy thin crust pizza - Light and delicious Cape Cod style" },
    ]
  },
  {
    id: 3,
    name: "Calzones",
    description: "Best Calzones in Hyannis - Authentic Italian calzones with cheese & spinach, served with Marinara",
    items: [
      { name: "Vegetarian Calzone", price: "$13.00", description: "Fresh veggie calzone - Mushroom, Onion, Tomato, Spinach, Green Pepper & Red Onions" },
      { name: "Sautéed Steak Calzone", price: "$14.00", description: "Hearty steak calzone - Shaved Steak sautéed with fresh Pea Pods" },
      { name: "Burrito Calzone", price: "$13.50", description: "Mexican-Italian fusion! Homemade Chili & Cheese with Tomatoes, Black Olives, Lettuce, Salsa & Sour Cream" },
      { name: "Build Your Own Calzone", price: "$12.00", description: "Create your perfect calzone - Start with Cheese and Spinach, add your favorites" },
    ]
  },
  {
    id: 4,
    name: "Grinders",
    description: "Best Grinders in Hyannis - Classic New England subs with Dill pickle & Chips. Add Fries or Onion Rings $1.50",
    items: [
      { name: "Veggie Grinder", price: "$13.00", description: "Fresh vegetarian sub - Sautéed Mushroom, Onion, Tomato, Green Pepper & Red Onions" },
      { name: "Italian Grinder", price: "$13.00", description: "Authentic Italian sub - Capicola, Salami, Provolone, Lettuce, Tomatoes & Onions" },
      { name: "Sautéed Steak & Cheese", price: "$13.00", description: "Classic Philly-style steak sub - Your choice of American, Provolone, or Swiss Cheese" },
      { name: "Meatball Grinder", price: "$13.00", description: "Hyannis favorite - Homemade meatballs with marinara & your choice of cheese" },
      { name: "Linguica Grinder", price: "$13.00", description: "Portuguese-style grinder - Grilled Linguica with Green Peppers & Marinara Sauce" },
      { name: "Ham & Cheese Grinder", price: "$13.00", description: "Classic deli sub - Sliced Ham with American, Swiss, or Provolone cheese" },
    ]
  },
  {
    id: 5,
    name: "Grill",
    description: "Best Burgers in Hyannis - Juicy burgers & grill favorites with Dill pickle, Chips or Fries included. Add Onion Rings $1.50",
    items: [
      { name: "1/2 Pound Hamburger", price: "$12.50", description: "Best burger in Hyannis - 1/2 Pound juicy burger with fresh Lettuce, Tomato & Onion" },
      { name: "Bacon Cheeseburger", price: "$14.50", description: "Cape Cod favorite - 1/2 Pound burger with crispy Bacon, Lettuce, Tomato & your choice of cheese" },
      { name: "BLT", price: "$9.00", description: "Classic BLT sandwich - Crispy Bacon, fresh Lettuce, Tomato & Mayo on your choice of bread" },
      { name: "Grilled Cheese", price: "$6.50", description: "Comfort food classic - Golden grilled cheese on White, Wheat, Rye or Gluten Free bread" },
      { name: "Grilled Frank", price: "$6.50", description: "All-American hot dog - Grilled to perfection with Chips or Fries & Dill Pickle" },
      { name: "Chili Dog", price: "$7.25", description: "Loaded chili dog - Grilled frank smothered in our homemade chili" },
    ]
  },
  {
    id: 6,
    name: "Jack's Entrees",
    description: "Best BBQ Ribs in Hyannis - Jack's Famous slow-cooked entrees, a Cape Cod tradition since 1963",
    items: [
      { name: "1/2 Rack of Ribs (2 Pieces)", price: "$20.00", description: "Jack's Famous BBQ Ribs - Half rack of tender pork ribs with our signature BBQ sauce, served with Rice and Vegetable" },
      { name: "Full Rack of Ribs (4 Pieces)", price: "$26.00", description: "Best ribs in Hyannis! Full rack of fall-off-the-bone pork ribs with signature BBQ sauce, Rice and Vegetable" },
      { name: "Spaghetti & Sauce", price: "$9.00", description: "Classic Italian pasta - Spaghetti with homemade Marinara and warm Garlic Bread" },
    ]
  },
  {
    id: 7,
    name: "Soup & Salad",
    description: "Fresh salads & homemade soups in Hyannis - Made daily with quality ingredients",
    items: [
      { name: "Soup of the Day", price: "Cup $5.25 / Bowl $6.50", description: "Fresh homemade soup - Ask your server for today's delicious selection" },
      { name: "Chili with Garlic Bread", price: "Cup $5.25 / Bowl $7.75", description: "Jack's famous homemade chili - Hearty and flavorful, served with warm garlic bread" },
      { name: "House Salad", price: "Small $6.95 / Large $9.95", description: "Fresh garden salad - Crisp lettuce, tomatoes, cucumbers, red onions & peppers" },
      { name: "Chef Salad", price: "$13.00", description: "Classic chef salad - Fresh greens topped with Chicken, Ham, & cheese with pita bread" },
      { name: "Antipasto Salad", price: "$13.00", description: "Italian antipasto - Pepperoni, salami, capicola, cheese & olives on fresh greens with pita" },
      { name: "Spinach Salad", price: "$12.00", description: "Healthy spinach salad - Fresh Spinach topped with mushrooms, bacon, & cheese" },
      { name: "Caesar Salad", price: "$11.50", description: "Classic Caesar - Crisp lettuce with croûtons, parmesan cheese & creamy Caesar dressing" },
    ]
  },
  {
    id: 8,
    name: "Sides",
    description: "Perfect additions to any meal in Hyannis - Crispy fries, onion rings, and more",
    items: [
      { name: "Basket of Fries", price: "$6.00", description: "Golden crispy fries - The perfect side to any meal" },
      { name: "Curly Fries", price: "$6.00", description: "Seasoned curly fries - A Cape Cod favorite" },
      { name: "Onion Rings", price: "$6.50", description: "Crispy beer-battered onion rings - Hand-breaded and golden" },
      { name: "Sautéed Mushrooms & Onions", price: "$5.00", description: "Fresh sautéed vegetables - Perfect topping for burgers or steaks" },
      { name: "Bag of Chips (Cape Cod or Lay's)", price: "$1.00", description: "Local Cape Cod chips or classic Lay's - Your choice" },
      { name: "Side of Broccoli", price: "$3.50", description: "Healthy steamed broccoli - Fresh and delicious" },
    ]
  },
  {
    id: 9,
    name: "Kid's Menu",
    description: "Family-friendly kids menu in Hyannis - Pizza, pasta, and chicken tenders for our younger guests",
    items: [
      { name: "Chicken Tenders & Fries", price: "$12.50", description: "Kids favorite! Crispy baked Chicken Tenders with golden Oven Baked Fries" },
      { name: "Kid's Spaghetti", price: "$9.00", description: "Classic kid's pasta - Spaghetti with butter or Marinara Sauce and warm garlic bread" },
      { name: "Slice of Cheese Pizza", price: "$4.00", description: "One slice of Jack's famous cheese pizza - Best pizza in Hyannis for kids!" },
    ]
  },
];

export default function Menu() {
  useEffect(() => {
    updateMetaTags({
      title: "Menu - Jack's Lounge Hyannis | Best Pizza & Italian Restaurant",
      description: "View Jack's Lounge full menu - signature honey pizzas, BBQ ribs, wings, Italian favorites, calzones, grinders & more. Order online for pickup or delivery in Hyannis, MA.",
      canonical: "https://www.jackspizzahyannis.com/menu",
      ogTitle: "Jack's Lounge Menu - Best Pizza & Italian Food in Hyannis MA",
      ogDescription: "Browse our full menu of pizzas, wings, Italian favorites and more. Over 60 years serving Hyannis with authentic recipes and fresh ingredients.",
      ogUrl: "https://www.jackspizzahyannis.com/menu"
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-menu-hero-title">
              Jack's Lounge Menu - Best Pizza & Italian Food Hyannis MA
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8">
              Over 60 years serving Hyannis with delicious Italian and American favorites. From our signature honey-topped pizzas to fall-off-the-bone ribs, every dish is made with care using fresh, quality ingredients.
            </p>
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
