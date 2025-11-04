import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import buildYourOwnPizza from "@assets/stock_images/build_your_own_custo_1b8db730.jpg";
import chickenQuesadilla from "@assets/stock_images/chicken_quesadilla_g_3a7fccd1.jpg";
import bonelessWings from "@assets/stock_images/boneless_buffalo_chi_58fc0c34.jpg";
import garlicBread from "@assets/stock_images/cheesy_garlic_bread__7c0835fb.jpg";
import meatLoversPizza from "@assets/stock_images/meat_lovers_pizza_pe_887b7199.jpg";
import wingDings from "@assets/stock_images/bone-in_chicken_wing_96bdedf1.jpg";

const featuredItems = [
  {
    id: 1,
    name: "Build Your Own Pizza",
    image: buildYourOwnPizza,
    alt: "Build Your Own Custom Pizza - Hyannis Best Pizza"
  },
  {
    id: 2,
    name: "Chicken Quesadilla",
    image: chickenQuesadilla,
    alt: "Grilled Chicken Quesadilla with Cheese - Jack's Lounge Hyannis"
  },
  {
    id: 3,
    name: "Boneless Buffalo Wings",
    image: bonelessWings,
    alt: "Boneless Buffalo Wings - Jack's Lounge Hyannis"
  },
  {
    id: 4,
    name: "Cheese Smothered Garlic Bread",
    image: garlicBread,
    alt: "Cheese Smothered Garlic Bread with Marinara - Hyannis Italian Food"
  },
  {
    id: 5,
    name: "Meat Lovers Pizza",
    image: meatLoversPizza,
    alt: "Meat Lovers Pizza - Best Pizza in Hyannis MA"
  },
  {
    id: 6,
    name: "Bone in Wings",
    image: wingDings,
    alt: "Baked Bone-in Wings - Jack's Lounge Hyannis"
  },
];

export default function FeaturedItems() {
  const scrollToOrder = () => {
    const element = document.getElementById("order");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="featured" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-featured-title">
            Hyannis Pizza & Italian Favorites
          </h2>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToOrder}
            data-testid="button-view-menu"
          >
            View Menu
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover-elevate cursor-pointer"
              onClick={scrollToOrder}
              data-testid={`card-menu-item-${item.id}`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-center" data-testid={`text-item-name-${item.id}`}>
                  {item.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
