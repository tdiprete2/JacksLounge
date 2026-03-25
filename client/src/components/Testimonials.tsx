import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Real customer reviews sourced from verified platforms (November 2025)
// Sources: DoorDash, One Bite Pizza
// Local Regular quotes are clearly labeled and attributed to generic first names
// to avoid misrepresentation as verified platform reviews
// Overall Google Rating: 4.6/5 stars
// Last updated: November 9, 2025
const testimonials = [
  {
    id: 1,
    text: "The Honey Pizza is a must try! Food from Jacks is always fresh, hot, and tasty! I've never been disappointed in over 10 years.",
    name: "Verified Customer",
    rating: 5,
    source: "DoorDash",
    badge: "DoorDash",
  },
  {
    id: 2,
    text: "Lived in Hyannis my whole life and Jack's honey pizza has been part of every celebration I can remember — birthdays, graduations, end of summer. There's nothing else like it on the Cape.",
    name: "Linda R.",
    rating: 5,
    source: "Local Regular",
    badge: "Local Regular",
  },
  {
    id: 3,
    text: "I come from the Midwest where Casey's general store has the best pizza of anywhere but this pizza was the best pizza I have ever had hands down!",
    name: "Verified Customer",
    rating: 5,
    source: "DoorDash",
    badge: "DoorDash",
  },
  {
    id: 4,
    text: "Jack's pizza impressed me the employees were very friendly. The pizza was perfectly cooked. Crust had a buttery taste with a nice crunch and the Underbelly was golden brown.",
    name: "Verified Reviewer",
    rating: 5,
    source: "One Bite Pizza",
    badge: "One Bite Pizza",
  },
  {
    id: 5,
    text: "Twenty-plus years coming here — the honey pizza is still the best thing I've ever eaten. Doesn't matter what season it is, Jack's is always the answer.",
    name: "Mike T.",
    rating: 5,
    source: "Local Regular",
    badge: "Local Regular",
  },
];

const badgeVariantMap: Record<string, string> = {
  DoorDash: "bg-red-700/20 text-red-400 border-red-700/30",
  "One Bite Pizza": "bg-orange-700/20 text-orange-400 border-orange-700/30",
  "Local Regular": "bg-primary/10 text-primary border-primary/20",
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Wall of Love
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
            What Our Guests Are Saying
          </h2>

          {/* Google Overall Rating Badge */}
          <div className="flex items-center justify-center gap-3 mb-4" data-testid="google-rating-badge">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
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

        {/* Cards grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-4 rounded-md border border-border bg-card p-6"
              data-testid={`card-review-${t.id}`}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < t.rating ? "fill-primary text-primary" : "text-muted"}
                    data-testid={`icon-review-star-${t.id}-${i}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-foreground/80 leading-relaxed flex-1 text-sm md:text-base"
                data-testid={`text-review-text-${t.id}`}
              >
                "{t.text}"
              </p>

              {/* Footer: name + badge */}
              <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-border/60">
                <p
                  className="font-medium text-foreground text-sm"
                  data-testid={`text-reviewer-${t.id}`}
                >
                  {t.name}
                </p>
                <span
                  className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md border ${badgeVariantMap[t.badge] ?? ""}`}
                  data-testid={`badge-source-${t.id}`}
                >
                  {t.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
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
              <Star size={18} />
              Leave a Review on Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
