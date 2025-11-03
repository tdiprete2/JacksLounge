import { Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VisitUs() {
  return (
    <section id="visit" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-visit-title">
          Visit Us Today!
        </h2>
        <div className="mb-8">
          <p className="text-lg font-semibold mb-4">We're open:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto text-left">
            <div className="flex justify-between px-4 py-2">
              <span className="font-medium">Monday – Friday</span>
              <span>11 AM–10 PM</span>
            </div>
            <div className="flex justify-between px-4 py-2">
              <span className="font-medium">Saturday</span>
              <span>11 AM–11 PM</span>
            </div>
            <div className="flex justify-between px-4 py-2 md:col-span-2 justify-center">
              <span className="font-medium">Sunday</span>
              <span>12 PM–9:30 PM</span>
            </div>
          </div>
        </div>
        <p className="text-lg mb-8">Come by and enjoy a meal that feels like home.</p>
        <Button
          size="lg"
          asChild
          data-testid="button-facebook"
        >
          <a
            href="https://www.facebook.com/Jackspizzahyannis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <Facebook size={20} />
            Follow Us on Facebook for Daily Specials
          </a>
        </Button>
      </div>
    </section>
  );
}
