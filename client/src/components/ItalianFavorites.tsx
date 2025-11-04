import { Button } from "@/components/ui/button";
// Import optimized section images (WebP format)
import ribsDesktop from "@assets/optimized/section-italian-favorites-desktop.webp";
import ribsMobile from "@assets/optimized/section-italian-favorites-mobile.webp";

export default function ItalianFavorites() {
  const scrollToOrder = () => {
    const element = document.getElementById("order");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="italian-favorites" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <picture>
              <source media="(min-width: 768px)" srcSet={ribsDesktop} type="image/webp" />
              <source media="(max-width: 767px)" srcSet={ribsMobile} type="image/webp" />
              <img
                src={ribsDesktop}
                alt="Hearty Italian and American Favorites"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
                data-testid="img-italian-favorites"
              />
            </picture>
          </div>

          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-italian-title">
              Hearty Italian and American Favorites Made Fresh
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed mb-6" data-testid="text-italian-description">
              At Jack's Lounge, we serve a mix of Italian and American favorites that everyone loves. Our menu is packed with comforting dishes like pizza, ribs, wings, and other hearty meals that never go out of style. Every dish is prepared with care and served fresh, so you can always count on a great meal. We even offer uncooked pizzas so you can bake them at home and enjoy that same Jack's flavor right from your oven.
            </p>
            <Button
              size="lg"
              onClick={scrollToOrder}
              data-testid="button-italian-menu"
            >
              Explore Our Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
