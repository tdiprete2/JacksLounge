import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function OnlineOrdering() {
  return (
    <section id="order" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-order-title">
          Order Online
        </h2>
        <p className="text-base md:text-lg text-foreground/70 mb-8">
          Skip the wait and bring Jack's Lounge straight to your table. Order online for pickup or delivery.
        </p>
        <Button
          size="lg"
          asChild
          data-testid="button-order-now"
        >
          <a
            href="https://olo.spoton.com/60c3b6829adef31f4442003e"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            Order Now
            <ExternalLink size={18} />
          </a>
        </Button>
      </div>
    </section>
  );
}
