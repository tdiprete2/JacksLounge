import { Button } from "@/components/ui/button";

export default function OrderFromWebsite() {
  const scrollToOrder = () => {
    const element = document.getElementById("order");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-order-section-title">
              Order From Our Website
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed mb-6" data-testid="text-order-section-description">
              Skip the wait and bring Jack's Lounge straight to your table. Order online through our website for pickup or delivery and enjoy your favorites with just a few clicks.
            </p>
            <Button
              size="lg"
              onClick={scrollToOrder}
              data-testid="button-order-section"
            >
              Order Now
            </Button>
          </div>

          <div className="relative">
            <picture>
              <source media="(min-width: 768px)" srcSet="/images/sections/order-desktop.webp" type="image/webp" />
              <source media="(max-width: 767px)" srcSet="/images/sections/order-mobile.webp" type="image/webp" />
              <img
                src="/images/sections/order-desktop.webp"
                alt="Order pizza and wings online from Jack's Lounge in Hyannis MA - fast pickup and delivery"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
                width="1200"
                height="800"
                data-testid="img-order-section"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
