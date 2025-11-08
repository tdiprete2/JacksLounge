import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    text: "Best pizza on the Cape! The family atmosphere and quality ingredients keep us coming back every week.",
    author: "Sarah M.",
    rating: 5,
  },
  {
    id: 2,
    text: "Jack's has been our go-to spot for years. Great food, friendly service, and always consistent quality.",
    author: "Mike R.",
    rating: 5,
  },
  {
    id: 3,
    text: "Love the bake-at-home pizza option! Fresh ingredients and perfect for family gatherings.",
    author: "Jennifer K.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-4" data-testid="text-testimonials-title">
            What our guests are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="text-center" data-testid={`card-review-${testimonial.id}`}>
              <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}
                    data-testid={`icon-review-star-${testimonial.id}-${i}`}
                  />
                ))}
              </div>
              <p className="text-foreground/80 mb-8 leading-relaxed" data-testid={`text-review-text-${testimonial.id}`}>
                {testimonial.text}
              </p>
              <p className="font-medium text-foreground" data-testid={`text-reviewer-${testimonial.id}`}>
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            asChild
            data-testid="button-review"
          >
            <a
              href="https://www.google.com/search?q=jacks+lounge+hyannis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Star size={20} />
              Leave a Review on Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
