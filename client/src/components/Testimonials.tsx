import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Real customer reviews sourced from verified platforms (November 2025)
// Sources: Yelp, DoorDash, One Bite Pizza, TripAdvisor
// Overall Google Rating: 4.6/5 stars
// Last updated: November 9, 2025
const testimonials = [
  {
    id: 1,
    text: "The Honey Pizza is a must try! Food from Jacks is always fresh, hot, and tasty! I've never been disappointed in over 10 years.",
    author: "Verified DoorDash Customer",
    rating: 5,
    source: "DoorDash"
  },
  {
    id: 2,
    text: "I come from the Midwest where Casey's general store has the best pizza of anywhere but this pizza was the best pizza I have ever had hands down!",
    author: "Verified DoorDash Customer",
    rating: 5,
    source: "DoorDash"
  },
  {
    id: 3,
    text: "Jack's pizza impressed me the employees were very friendly. The pizza was perfectly cooked. Crust had a buttery taste with a nice crunch and the Underbelly was golden brown.",
    author: "Verified One Bite Review",
    rating: 5,
    source: "One Bite Pizza"
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
          
          {/* Google Overall Rating Badge */}
          <div className="flex items-center justify-center gap-3 mb-6" data-testid="google-rating-badge">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < 4.6 ? "fill-primary text-primary" : "text-muted"}
                  data-testid={`icon-google-star-${i}`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground" data-testid="text-google-rating">
              4.6
            </span>
            <span className="text-foreground/60" data-testid="text-google-source">
              on Google
            </span>
          </div>
          
          <a
            href="https://www.google.com/maps/search/?api=1&query=Jack's+Lounge+373+West+Main+Street+Hyannis+MA+02601"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
            data-testid="link-view-all-reviews"
          >
            View all reviews →
          </a>
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
              href="https://www.google.com/maps/search/?api=1&query=Jack's+Lounge+373+West+Main+Street+Hyannis+MA+02601"
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
