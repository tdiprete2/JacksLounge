import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
// Import optimized featured item images (WebP format)
import buildYourOwnDesktop from "@assets/optimized/featured-build-your-own-desktop.webp";
import buildYourOwnMobile from "@assets/optimized/featured-build-your-own-mobile.webp";
import quesadillaDesktop from "@assets/optimized/featured-quesadilla-desktop.webp";
import quesadillaMobile from "@assets/optimized/featured-quesadilla-mobile.webp";
import bonelessWingsDesktop from "@assets/optimized/featured-boneless-wings-desktop.webp";
import bonelessWingsMobile from "@assets/optimized/featured-boneless-wings-mobile.webp";
import garlicBreadDesktop from "@assets/optimized/featured-garlic-bread-desktop.webp";
import garlicBreadMobile from "@assets/optimized/featured-garlic-bread-mobile.webp";
import meatLoversDesktop from "@assets/optimized/featured-meat-lovers-desktop.webp";
import meatLoversMobile from "@assets/optimized/featured-meat-lovers-mobile.webp";
import wingsDesktop from "@assets/optimized/featured-wings-desktop.webp";
import wingsMobile from "@assets/optimized/featured-wings-mobile.webp";

const featuredItems = [
  {
    id: 1,
    name: "Build Your Own Pizza",
    description: "Create your perfect pizza with fresh toppings on our signature honey-topped crust",
    desktop: buildYourOwnDesktop,
    mobile: buildYourOwnMobile,
    alt: "Build Your Own Custom Pizza at Jack's Lounge - Best Pizza in Hyannis MA"
  },
  {
    id: 2,
    name: "Chicken Quesadilla",
    description: "Grilled tortilla stuffed with seasoned chicken, cheese, peppers, and onions",
    desktop: quesadillaDesktop,
    mobile: quesadillaMobile,
    alt: "Chicken Quesadilla with Salsa and Sour Cream - Jack's Lounge Hyannis Mexican Food"
  },
  {
    id: 3,
    name: "Boneless Buffalo Tenders",
    description: "Crispy boneless chicken tenders tossed in Buffalo sauce, served with blue cheese",
    desktop: bonelessWingsDesktop,
    mobile: bonelessWingsMobile,
    alt: "Crispy Boneless Buffalo Chicken Tenders with Blue Cheese Dip - Best Chicken Tenders Hyannis at Jack's Lounge"
  },
  {
    id: 4,
    name: "Cheese Smothered Garlic Bread",
    description: "Fresh Italian bread topped with garlic butter and melted mozzarella cheese",
    desktop: garlicBreadDesktop,
    mobile: garlicBreadMobile,
    alt: "Melted Cheese Smothered Garlic Bread with Marinara Sauce - Best Italian Appetizers Hyannis at Jack's Lounge"
  },
  {
    id: 5,
    name: "Meat Lovers Pizza",
    description: "Loaded with pepperoni, sausage, bacon, and ham on our famous honey-topped crust",
    desktop: meatLoversDesktop,
    mobile: meatLoversMobile,
    alt: "Meat Lovers Pizza with Pepperoni Sausage and Bacon - Best Pizza in Hyannis at Jack's Lounge"
  },
  {
    id: 6,
    name: "Bone-in Wings",
    description: "Crispy-baked chicken wings with your choice of sauce: Buffalo, BBQ, Teriyaki, or Garlic Parmesan",
    desktop: wingsDesktop,
    mobile: wingsMobile,
    alt: "Crispy Baked Bone-in Chicken Wings with Blue Cheese - Best Wings in Hyannis at Jack's Lounge"
  },
];

export default function FeaturedItems() {
  const [, setLocation] = useLocation();

  const navigateToMenu = () => {
    setLocation("/menu");
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
            onClick={navigateToMenu}
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
              onClick={navigateToMenu}
              data-testid={`card-menu-item-${item.id}`}
            >
              <div className="aspect-square overflow-hidden">
                <picture>
                  <source media="(min-width: 768px)" srcSet={item.desktop} type="image/webp" />
                  <source media="(max-width: 767px)" srcSet={item.mobile} type="image/webp" />
                  <img
                    src={item.desktop}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    width="800"
                    height="800"
                  />
                </picture>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-center mb-2" data-testid={`text-item-name-${item.id}`}>
                  {item.name}
                </h3>
                <p className="text-sm text-foreground/70 text-center" data-testid={`text-item-description-${item.id}`}>
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
