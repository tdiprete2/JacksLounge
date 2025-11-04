import { useState, useEffect, useCallback } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const scrollNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Auto-play slideshow - respects reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <div className="relative h-[600px] md:h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <picture>
              <source 
                srcSet={slide.mobile} 
                media="(max-width: 767px)" 
                type="image/webp"
              />
              <source 
                srcSet={slide.desktop} 
                media="(min-width: 768px)" 
                type="image/webp"
              />
              <img
                src={slide.mobile}
                alt={slide.alt}
                className="w-full h-[600px] md:h-[700px] object-cover"
                data-testid={`img-hero-slide-${index}`}
                loading={index === 0 ? "eager" : "lazy"}
                width="1920"
                height="700"
              />
            </picture>
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

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

        {/* Navigation buttons - stacked on right */}
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="bg-black/40 border-primary/60 text-white hover:bg-primary/30 backdrop-blur-md shadow-lg pointer-events-auto transition-all"
            data-testid="button-prev-slide"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="bg-black/40 border-primary/60 text-white hover:bg-primary/30 backdrop-blur-md shadow-lg pointer-events-auto transition-all"
            data-testid="button-next-slide"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
