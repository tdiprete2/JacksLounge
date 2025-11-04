import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSlide {
  desktop: string;
  mobile: string;
  alt: string;
}

interface WelcomeHeroCarouselProps {
  slides: HeroSlide[];
}

export default function WelcomeHeroCarousel({ slides }: WelcomeHeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-play slideshow - respects reduced motion
  useEffect(() => {
    if (!emblaApi) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <>
      <div className="relative h-[600px] md:h-[700px] overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <picture>
                <source 
                  srcSet={slide.mobile} 
                  media="(max-width: 767px)" 
                  type="image/webp"
                  {...(index === 0 && { fetchpriority: "high" as const })}
                />
                <source 
                  srcSet={slide.desktop} 
                  media="(min-width: 768px)" 
                  type="image/webp"
                  {...(index === 0 && { fetchpriority: "high" as const })}
                />
                <img
                  src={slide.mobile}
                  alt={slide.alt}
                  className="w-full h-[600px] md:h-[700px] object-cover"
                  data-testid={`img-hero-slide-${index}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  {...(index === 0 && { fetchPriority: "high" as const })}
                  width="1920"
                  height="700"
                />
              </picture>
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-welcome-title">
              Best Pizza in Hyannis
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" data-testid="text-welcome-description">
              A Neighborhood Tradition Serving Great Food and Good Times
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 border-primary/50 text-white hover:bg-primary/20 backdrop-blur-sm pointer-events-auto"
          data-testid="button-prev-slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 border-primary/50 text-white hover:bg-primary/20 backdrop-blur-sm pointer-events-auto"
          data-testid="button-next-slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
