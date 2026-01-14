import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Featured items with optimized WebP images served from /images/featured/
const featuredItems = [
  {
    id: 1,
    name: "Build Your Own Pizza",
    description: "Create your perfect pizza with fresh toppings, add our signature honey sauce for the full experience",
    desktop: "/images/featured/featured-build-your-own-desktop.webp",
    mobile: "/images/featured/featured-build-your-own-mobile.webp",
    alt: "Build Your Own Custom Pizza at Jack's Lounge - Best Pizza in Hyannis MA"
  },
  {
    id: 2,
    name: "Chicken Quesadilla",
    description: "Grilled tortilla stuffed with seasoned chicken and cheese",
    desktop: "/images/featured/featured-quesadilla-desktop.webp",
    mobile: "/images/featured/featured-quesadilla-mobile.webp",
    alt: "Chicken Quesadilla with Salsa and Sour Cream - Jack's Lounge Hyannis Mexican Food"
  },
  {
    id: 3,
    name: "Antipasto Salad",
    description: "Fresh greens topped with Italian meats, provolone, pepperoni, cucumbers, tomatoes & more",
    desktop: "/images/featured/featured-boneless-wings-desktop.webp",
    mobile: "/images/featured/featured-boneless-wings-mobile.webp",
    alt: "Fresh Antipasto Salad with Italian Meats and Provolone Cheese - Jack's Lounge Hyannis MA"
  },
  {
    id: 4,
    name: "Cheese Smothered Garlic Bread",
    description: "Fresh Italian bread topped with garlic butter and melted mozzarella cheese",
    desktop: "/images/featured/featured-garlic-bread-desktop.webp",
    mobile: "/images/featured/featured-garlic-bread-mobile.webp",
    alt: "Melted Cheese Smothered Garlic Bread with Marinara Sauce - Best Italian Appetizers Hyannis at Jack's Lounge"
  },
  {
    id: 5,
    name: "Meat Lovers Pizza",
    description: "Loaded with Pepperoni, Sausage, Linguica, Meatballs, & Bacon.",
    desktop: "/images/featured/featured-meat-lovers-desktop.webp",
    mobile: "/images/featured/featured-meat-lovers-mobile.webp",
    alt: "Meat Lovers Pizza with Pepperoni Sausage and Bacon - Best Pizza in Hyannis at Jack's Lounge"
  },
  {
    id: 6,
    name: "Bone-in Wings",
    description: "Crispy-baked chicken wings with your choice of sauce: Buffalo, BBQ, Sweet Chili, or Garlic Parmesan",
    desktop: "/images/featured/featured-wings-desktop.webp",
    mobile: "/images/featured/featured-wings-mobile.webp",
    alt: "Crispy Baked Bone-in Chicken Wings with Blue Cheese - Best Wings in Hyannis at Jack's Lounge"
  },
];

export default function FeaturedItems() {
  return (
    <section id="featured" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-featured-title">
            Hyannis Pizza & Italian Favorites
          </h2>
          <Button
            asChild
            variant="outline"
            size="lg"
            data-testid="button-view-menu"
          >
            <Link href="/menu/">View Menu</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredItems.map((item) => (
            <Link
              key={item.id}
              href="/menu/"
              data-testid={`card-menu-item-${item.id}`}
            >
              <Card className="overflow-hidden hover-elevate cursor-pointer h-full">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
