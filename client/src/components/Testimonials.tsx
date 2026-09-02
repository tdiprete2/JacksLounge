import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SITE } from "@shared/site";

interface GoogleRating {
  rating: number;
  googleMapsUrl: string;
}

export default function Testimonials() {
  const { data, isLoading, isError } = useQuery<GoogleRating>({
    queryKey: ["/api/google-rating"],
    staleTime: 6 * 60 * 60 * 1000,
  });
  const googleMapsUrl = data?.googleMapsUrl || SITE.mapUrl;

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background"
      aria-labelledby="google-rating-title"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Google Rating
          </p>
          <h2
            id="google-rating-title"
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-testimonials-title"
          >
            See How Guests Rate Jack's Lounge
          </h2>
        </div>

        <div
          className="rounded-lg border border-border bg-card px-6 py-10 md:px-10"
          aria-live="polite"
        >
          {isLoading && (
            <p className="text-foreground/60" data-testid="text-google-rating-loading">
              Loading the current Google rating…
            </p>
          )}

          {data && (
            <>
              <div className="flex items-center justify-center gap-3 mb-3">
                <strong
                  className="text-5xl md:text-6xl font-bold text-foreground"
                  data-testid="text-google-rating"
                >
                  {data.rating.toFixed(1)}
                </strong>
                <span className="sr-only">out of 5 stars</span>
              </div>
              <div className="flex justify-center gap-1 mb-3" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={24}
                    className={
                      index < Math.round(data.rating)
                        ? "fill-primary text-primary"
                        : "text-muted"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/60">Current rating on Google</p>
            </>
          )}

          {isError && (
            <p className="text-foreground/60" data-testid="text-google-rating-unavailable">
              The Google rating is temporarily unavailable.
            </p>
          )}
        </div>

        <div className="mt-8">
          <Button size="lg" asChild data-testid="button-review">
            <a
              href={googleMapsUrl}
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
