import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import featuredHero from "@assets/IMG_8292_1762190095053.jpg";

const featuredItems = [
  {
    id: 1,
    name: "Special Pizza (10\")",
    image: "https://static-content.owner.com/funnel/images/c35a676f-0035-4881-8fd2-98c73c9c5fdf.jpg?v=7798769924&w=800&q=80&auto=format",
  },
  {
    id: 2,
    name: "Rack of Ribs",
    image: "https://static-content.owner.com/funnel/images/6337435e-6c9b-4fe8-b7d1-411305f2eb93.jpg?v=7003287042&w=800&q=80&auto=format",
  },
  {
    id: 3,
    name: "1/2 Lb Burger",
    image: "https://static-content.owner.com/funnel/images/f60d5a30-3326-4b3d-8e64-54a4d21a303a.jpg?v=2717042700&w=800&q=80&auto=format",
  },
  {
    id: 4,
    name: "1/2 Lb Cheeseburger",
    image: "https://static-content.owner.com/funnel/images/13090050-118b-4694-9437-e88fade74bfb.jpg?v=7248658325&w=800&q=80&auto=format",
  },
  {
    id: 5,
    name: "Canadian Bacon Calzone",
    image: "https://static-content.owner.com/funnel/images/633c64dc-35fb-4b32-acda-a99560465aca.jpg?v=6037713343&w=800&q=80&auto=format",
  },
  {
    id: 6,
    name: "Pepperoni Calzone",
    image: "https://static-content.owner.com/funnel/images/6c3ffdc1-58e7-49a3-bdfd-dead015d4582.jpg?v=3453523493&w=800&q=80&auto=format",
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
    <section id="featured" className="bg-background">
      {/* Hero Shot */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={featuredHero}
          alt="Featured Items at Jack's Lounge"
          className="w-full h-full object-cover"
          data-testid="img-featured-hero"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-featured-title">
              Featured
            </h2>
            <p className="text-lg md:text-xl mb-6">Signature dishes that keep our customers coming back</p>
            <Button
              variant="default"
              size="lg"
              onClick={scrollToOrder}
              data-testid="button-view-menu"
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Items Grid */}
      <div className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

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
                  alt={item.name}
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
      </div>
    </section>
  );
}
