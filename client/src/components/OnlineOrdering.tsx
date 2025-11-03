import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function OnlineOrdering() {
  return (
    <section id="order" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-order-title">
            Order Online
          </h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
            Skip the wait and bring Jack's Lounge straight to your table. Order online for pickup or delivery.
          </p>
          <Button
            size="lg"
            asChild
            className="mb-8"
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

        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-border" style={{ minHeight: "800px" }}>
          <iframe
            src="https://olo.spoton.com/60c3b6829adef31f4442003e"
            width="100%"
            height="800"
            frameBorder="0"
            title="Jack's Lounge Online Ordering - Order Pizza, Ribs, Wings for Pickup or Delivery"
            className="w-full"
            loading="lazy"
            data-testid="iframe-ordering"
            allow="payment"
          />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-foreground/60">
            Having trouble? <a 
              href="https://olo.spoton.com/60c3b6829adef31f4442003e" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              data-testid="link-order-backup"
            >
              Open ordering page directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
