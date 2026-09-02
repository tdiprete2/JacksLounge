import { Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOURS } from "@shared/site";

export default function VisitUs() {
  return (
    <section id="visit" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-visit-title">
          Visit Us Today!
        </h2>
        <div className="mb-8">
          <p className="text-lg font-semibold mb-4">Dine-in hours:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto text-left">
            {HOURS.dineIn.map((schedule) => (
              <div key={schedule.day} className="flex justify-between gap-4 px-4 py-2">
                <span className="font-medium">{schedule.day}</span>
                <span>{schedule.open}–{schedule.close}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-lg mb-8">Come by and enjoy a meal that feels like home.</p>
      </div>
    </section>
  );
}
