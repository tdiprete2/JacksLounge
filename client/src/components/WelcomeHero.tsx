import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import hero slideshow images
import exterior1 from "@assets/20251029_101841_1762190095054.jpg";
import exterior2 from "@assets/20251029_102232_1762190095054.jpg";
import food1 from "@assets/IMG_6484_1762190095056.jpg";
import food2 from "@assets/IMG_6613_1762190095056.jpg";
import food3 from "@assets/IMG_6756_1762190095057.jpg";
import food4 from "@assets/IMG_7054_1762190095057.jpg";

const heroSlides = [
  { image: exterior1, alt: "Jack's Lounge Exterior" },
  { image: food1, alt: "Delicious Pizza at Jack's Lounge" },
  { image: food2, alt: "Fresh Food at Jack's Lounge" },
  { image: exterior2, alt: "Jack's Lounge Restaurant" },
  { image: food3, alt: "Signature Dishes" },
  { image: food4, alt: "Jack's Special Meals" },
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
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-[600px] md:h-[700px] object-cover"
                data-testid={`img-hero-slide-${index}`}
              />
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
