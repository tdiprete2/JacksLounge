import { useEffect, useCallback, useRef, useState, lazy, Suspense } from "react";
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

// Lazy load the carousel component to defer Embla initialization
const LazyCarousel = lazy(() => import("./WelcomeHeroCarousel"));

export default function WelcomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoadCarousel, setShouldLoadCarousel] = useState(false);

  // Defer carousel initialization until visible (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadCarousel(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fallback component - shows first slide only before carousel loads
  const HeroFallback = () => (
    <div className="relative h-[600px] md:h-[700px]">
      <picture>
        <source 
          srcSet={heroSlides[0].mobile} 
          media="(max-width: 767px)" 
          type="image/webp"
        />
        <source 
          srcSet={heroSlides[0].desktop} 
          media="(min-width: 768px)" 
          type="image/webp"
        />
        <img
          src={heroSlides[0].mobile}
          alt={heroSlides[0].alt}
          className="w-full h-[600px] md:h-[700px] object-cover"
          data-testid="img-hero-slide-0"
          loading="eager"
          width="1920"
          height="700"
          {...({ fetchPriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
        />
      </picture>
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-welcome-title">
            Best Pizza in Hyannis
          </h1>
          <p className="text-lg md:text-xl leading-relaxed" data-testid="text-welcome-description">
            A Neighborhood Tradition Serving Great Food and Good Times
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative" ref={sectionRef}>
      {shouldLoadCarousel ? (
        <Suspense fallback={<HeroFallback />}>
          <LazyCarousel slides={heroSlides} />
        </Suspense>
      ) : (
        <HeroFallback />
      )}
    </section>
  );
}
