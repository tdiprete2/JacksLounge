import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import optimized hero slideshow images (WebP format)
// First hero image served from public folder for LCP optimization
import hero1Desktop from "@assets/optimized/hero-1-desktop.webp";
import hero1Mobile from "@assets/optimized/hero-1-mobile.webp";
import hero2Desktop from "@assets/optimized/hero-2-desktop.webp";
import hero2Mobile from "@assets/optimized/hero-2-mobile.webp";
import hero3Desktop from "@assets/optimized/hero-3-desktop.webp";
import hero3Mobile from "@assets/optimized/hero-3-mobile.webp";
import hero4Desktop from "@assets/optimized/hero-4-desktop.webp";
import hero4Mobile from "@assets/optimized/hero-4-mobile.webp";
import hero5Desktop from "@assets/optimized/hero-5-desktop.webp";
import hero5Mobile from "@assets/optimized/hero-5-mobile.webp";

const heroSlides = [
  { desktop: "/hero-0-desktop.webp", mobile: "/hero-0-mobile.webp", alt: "Jack's Lounge Exterior" },
  { desktop: hero1Desktop, mobile: hero1Mobile, alt: "Delicious Pizza at Jack's Lounge" },
  { desktop: hero2Desktop, mobile: hero2Mobile, alt: "Fresh Food at Jack's Lounge" },
  { desktop: hero3Desktop, mobile: hero3Mobile, alt: "Jack's Lounge Restaurant" },
  { desktop: hero4Desktop, mobile: hero4Mobile, alt: "Signature Dishes" },
  { desktop: hero5Desktop, mobile: hero5Mobile, alt: "Jack's Special Meals" },
];

export default function WelcomeHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-play slideshow
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative">
      <div className="relative h-[600px] md:h-[700px] overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <picture>
                <source media="(min-width: 768px)" srcSet={slide.desktop} type="image/webp" />
                <source media="(max-width: 767px)" srcSet={slide.mobile} type="image/webp" />
                <img
                  src={slide.desktop}
                  alt={slide.alt}
                  className="w-full h-[600px] md:h-[700px] object-cover"
                  data-testid={`img-hero-slide-${index}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  {...(index === 0 && { fetchpriority: "high" })}
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 border-primary/50 text-white hover:bg-primary/20 backdrop-blur-sm"
          data-testid="button-prev-slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 border-primary/50 text-white hover:bg-primary/20 backdrop-blur-sm"
          data-testid="button-next-slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}
