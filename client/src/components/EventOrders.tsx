import { Link } from "wouter";
import { Button } from "@/components/ui/button";
// Import optimized event orders images - real restaurant party platter photos
import eventImageDesktop from "@assets/optimized/event-orders-desktop.webp";
import eventImageMobile from "@assets/optimized/event-orders-mobile.webp";

export default function EventOrders() {
  return (
    <section className="relative">
      <div className="relative h-[450px] md:h-[550px] lg:h-[600px]">
        <picture>
          <source srcSet={eventImageMobile} media="(max-width: 767px)" type="image/webp" />
          <source srcSet={eventImageDesktop} media="(min-width: 768px)" type="image/webp" />
          <img
            src={eventImageMobile}
            alt="Jack's Lounge party platters - pizza, chicken tenders, fries, and fresh salad for events and special orders"
            className="w-full h-full object-cover"
            width="800"
            height="533"
            data-testid="img-event-orders"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/75 to-black/65" />
        <div className="absolute inset-0 flex items-center justify-center py-8">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg leading-tight" data-testid="text-event-title">
              Party Platters & Special Orders
            </h2>
            <p className="text-base md:text-xl leading-relaxed mb-4 md:mb-6 max-w-3xl mx-auto drop-shadow-md" data-testid="text-event-description">
              Planning a party or event? Call us at <a href="tel:5087750612" className="text-primary font-bold hover:underline whitespace-nowrap">(508) 775-0612</a> for quick service!
            </p>
            <p className="text-sm md:text-lg mb-3 md:mb-5 drop-shadow-md font-medium">
              Special Discounts: Party pizzas, wings, tenders, salads & more
            </p>
            <p className="text-xs md:text-base mb-5 md:mb-8 text-white/95 drop-shadow-md max-w-2xl mx-auto">
              For specialty trays (pasta, lasagna, steak tips, shepherd's pie), please call us directly.
            </p>
            <Button
              size="lg"
              asChild
              data-testid="button-inquire"
              className="shadow-xl text-base md:text-lg"
            >
              <Link href="/contact/">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
