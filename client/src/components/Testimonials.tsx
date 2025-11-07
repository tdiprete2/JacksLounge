import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { ReviewStats, Review } from "@shared/schema";

interface ReviewsResponse {
  stats: ReviewStats | null;
  reviews: Review[];
}

export default function Testimonials() {
  const { data, isLoading } = useQuery<ReviewsResponse>({
    queryKey: ['/api/reviews'],
  });

  const reviews = data?.reviews || [];
  const stats = data?.stats;

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-4" data-testid="text-testimonials-title">
            What our guests are saying
          </h2>
          
          {stats && (
            <div className="flex items-center justify-center gap-2 mb-2" data-testid="div-rating-stats">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.round(stats.overallRating) ? "fill-primary text-primary" : "text-muted"}
                    data-testid={`icon-star-${i}`}
                  />
                ))}
              </div>
              <span className="font-semibold text-lg" data-testid="text-overall-rating">
                {stats.overallRating.toFixed(1)}
              </span>
            </div>
          )}
          
          {stats && (
            <p className="text-sm text-muted-foreground" data-testid="text-review-count">
              Based on {stats.totalReviews} Google reviews
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse" data-testid={`skeleton-review-${i}`}>
                <div className="h-32 bg-muted rounded mb-8"></div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-muted rounded-full"></div>
                  <div className="h-4 w-24 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {reviews.slice(0, 6).map((review) => (
              <div key={review.id} className="text-center" data-testid={`card-review-${review.id}`}>
                <div className="flex justify-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? "fill-primary text-primary" : "text-muted"}
                      data-testid={`icon-review-star-${review.id}-${i}`}
                    />
                  ))}
                </div>
                {review.reviewText && (
                  <p className="text-foreground/80 mb-8 leading-relaxed" data-testid={`text-review-text-${review.id}`}>
                    {review.reviewText}
                  </p>
                )}
                <div className="flex flex-col items-center gap-3">
                  {review.authorPhoto ? (
                    <img
                      src={review.authorPhoto}
                      alt={review.authorName}
                      className="w-16 h-16 rounded-full object-cover"
                      data-testid={`img-avatar-${review.id}`}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center" data-testid={`div-avatar-${review.id}`}>
                      <User size={32} className="text-muted-foreground" />
                    </div>
                  )}
                  <p className="font-medium text-foreground" data-testid={`text-reviewer-${review.id}`}>
                    {review.authorName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

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
