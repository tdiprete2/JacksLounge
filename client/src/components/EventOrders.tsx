import { Button } from "@/components/ui/button";
// Import optimized event orders images (WebP format)
import eventImageDesktop from "@assets/optimized/event-orders-desktop.webp";
import eventImageMobile from "@assets/optimized/event-orders-mobile.webp";

export default function EventOrders() {
  return (
    <section className="relative">
      <div className="relative h-[500px] md:h-[600px]">
        <picture>
          <source srcSet={eventImageMobile} media="(max-width: 767px)" type="image/webp" />
          <source srcSet={eventImageDesktop} media="(min-width: 768px)" type="image/webp" />
          <img
            src={eventImageMobile}
            alt="Jack's Lounge party platters - pizza, chicken tenders, fries, and fresh salad for events and special orders"
            className="w-full h-full object-cover"
            width="1920"
            height="1280"
            data-testid="img-event-orders"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg" data-testid="text-event-title">
              Party Platters & Special Orders
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-6 max-w-3xl mx-auto drop-shadow-md" data-testid="text-event-description">
              Planning a birthday party, business event, or gathering? We've got you covered! Fill out the form below or call us at <strong className="text-primary font-semibold">(508) 775-0612</strong> for the quickest response.
            </p>
            <p className="text-base md:text-lg mb-6 drop-shadow-md">
              <strong>Special Discounts Available:</strong> Party pizzas, large orders of wings or tenders, fresh salads, and more.
            </p>
            <p className="text-sm md:text-base mb-8 text-white/90 drop-shadow-md">
              For specialty trays of pasta, lasagna, steak tips, or shepherd's pie (not on the menu), please call the restaurant directly.
            </p>
            <Button
              size="lg"
              asChild
              data-testid="button-inquire"
              className="shadow-xl"
            >
              <a href="/contact">Request a Quote</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
