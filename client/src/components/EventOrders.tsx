import { Button } from "@/components/ui/button";
import barImage from "@assets/20251029_102404_1762190095055.jpg";

export default function EventOrders() {
  return (
    <section className="relative">
      <div className="relative h-[500px] md:h-[600px]">
        <img
          src={barImage}
          alt="Event & Special Orders"
          className="w-full h-full object-cover"
          data-testid="img-event-orders"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-event-title">
              Event & Special Orders
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto" data-testid="text-event-description">
              Looking for food for your next Birthday Party or Business event or get together? Fill our the form below. For the quickest response on all events or parties please call us @ (508)-775-0612. We offer discounts for large orders and special Party Pizzas. As well as Large orders of Wings or Tenders, and Salads. We do not offer Catering.
            </p>
            <p className="text-base md:text-lg mb-8">
              For Specialty orders of Large of Lunch or Dinner Trays of different Pastas, Lasagna, Steak Tips, or Shepard's Pie (Not on the menu) Please call the restaurant.
            </p>
            <Button
              size="lg"
              asChild
              data-testid="button-inquire"
            >
              <a href="/contact">Inquire Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
