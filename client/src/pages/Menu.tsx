import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";

const menuCategories = [
  {
    id: 1,
    name: "Signature Pizzas",
    description: "Our famous thin-crust pizzas topped with honey",
    items: [
      { name: "Cheese Pizza", size: "10\"", description: "Classic mozzarella with our signature honey drizzle" },
      { name: "Special Pizza", size: "10\"", description: "Loaded with pepperoni, sausage, mushrooms, peppers, and onions" },
      { name: "Pepperoni Pizza", size: "10\"", description: "Generous portions of premium pepperoni" },
      { name: "Veggie Pizza", size: "10\"", description: "Fresh vegetables with mozzarella" },
      { name: "BBQ Chicken Pizza", size: "10\"", description: "Grilled chicken with BBQ sauce and red onions" },
    ]
  },
  {
    id: 2,
    name: "BBQ & Ribs",
    description: "Slow-cooked to perfection",
    items: [
      { name: "Full Rack of Ribs", description: "Fall-off-the-bone tender with our signature BBQ sauce" },
      { name: "Half Rack of Ribs", description: "Perfect portion of our famous ribs" },
      { name: "BBQ Chicken", description: "Grilled chicken smothered in BBQ sauce" },
      { name: "BBQ Combo", description: "Half rack of ribs and BBQ chicken" },
    ]
  },
  {
    id: 3,
    name: "Wings",
    description: "Crispy and delicious",
    items: [
      { name: "Buffalo Wings", description: "Classic hot wings with blue cheese or ranch" },
      { name: "BBQ Wings", description: "Tossed in our signature BBQ sauce" },
      { name: "Honey Garlic Wings", description: "Sweet and savory perfection" },
      { name: "Plain Wings", description: "Crispy fried with your choice of sauce on the side" },
    ]
  },
  {
    id: 4,
    name: "Burgers & Sandwiches",
    description: "Hearty and satisfying",
    items: [
      { name: "1/2 Lb Burger", description: "Half-pound of fresh beef on a toasted bun" },
      { name: "1/2 Lb Cheeseburger", description: "Half-pound burger topped with melted cheese" },
      { name: "Bacon Cheeseburger", description: "Topped with crispy bacon and cheese" },
      { name: "Italian Grinder", description: "Cold cuts, cheese, lettuce, tomato, and Italian dressing" },
      { name: "Meatball Sub", description: "Homemade meatballs in marinara with melted cheese" },
    ]
  },
  {
    id: 5,
    name: "Calzones",
    description: "Stuffed and baked to golden perfection",
    items: [
      { name: "Pepperoni Calzone", description: "Pepperoni and mozzarella in our signature dough" },
      { name: "Canadian Bacon Calzone", description: "Canadian bacon and cheese" },
      { name: "Veggie Calzone", description: "Fresh vegetables and mozzarella" },
      { name: "Meat Lovers Calzone", description: "Loaded with pepperoni, sausage, and bacon" },
    ]
  },
  {
    id: 6,
    name: "Italian Favorites",
    description: "Traditional recipes made fresh",
    items: [
      { name: "Spaghetti & Meatballs", description: "Homemade meatballs over spaghetti with marinara" },
      { name: "Chicken Parmesan", description: "Breaded chicken breast with marinara and mozzarella" },
      { name: "Pasta Alfredo", description: "Fettuccine in creamy alfredo sauce" },
      { name: "Lasagna", description: "Layers of pasta, meat sauce, and cheese" },
    ]
  },
  {
    id: 7,
    name: "Appetizers & Sides",
    description: "Start your meal right",
    items: [
      { name: "French Fries", description: "Crispy golden fries" },
      { name: "Onion Rings", description: "Beer-battered and fried crispy" },
      { name: "Mozzarella Sticks", description: "Breaded and fried with marinara" },
      { name: "Garlic Bread", description: "Toasted with garlic butter and parmesan" },
      { name: "Side Salad", description: "Fresh greens with your choice of dressing" },
    ]
  },
];

export default function Menu() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-menu-hero-title">
              Our Menu
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8">
              Over 60 years of serving delicious Italian and American favorites. From our signature honey-topped pizzas to fall-off-the-bone ribs, every dish is made with care.
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
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-foreground" data-testid={`text-item-name-${category.id}-${index}`}>
                              {item.name}
                            </h3>
                            {'size' in item && item.size && (
                              <span className="text-sm text-primary font-medium" data-testid={`text-item-size-${category.id}-${index}`}>
                                {item.size}
                              </span>
                            )}
                          </div>
                          <p className="text-foreground/70" data-testid={`text-item-desc-${category.id}-${index}`}>
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
