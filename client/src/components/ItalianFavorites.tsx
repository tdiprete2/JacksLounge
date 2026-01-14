import { Button } from "@/components/ui/button";

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
              <source media="(min-width: 768px)" srcSet="/images/sections/section-italian-favorites-desktop.webp" type="image/webp" />
              <source media="(max-width: 767px)" srcSet="/images/sections/section-italian-favorites-mobile.webp" type="image/webp" />
              <img
                src="/images/sections/section-italian-favorites-desktop.webp"
                alt="Tuesday Special - 25% Off All Pizzas at Jack's Lounge Hyannis MA"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
                width="1200"
                height="800"
                data-testid="img-italian-favorites"
              />
            </picture>
          </div>

          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-italian-title">
              Tuesday Special: 25% Off All Pizzas
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed mb-6" data-testid="text-italian-description">Every Tuesday, enjoy 25% off all pizzas at Jack's Lounge! No coupon needed, no minimum purchase required. Whether you're craving our signature honey-topped pizzas, a loaded Meat Lovers, or building your own custom creation, Tuesday is the perfect day to satisfy your pizza cravings at a great price.</p>
            <Button
              size="lg"
              onClick={scrollToOrder}
              data-testid="button-italian-menu"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
