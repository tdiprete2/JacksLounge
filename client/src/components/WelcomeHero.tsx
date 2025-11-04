import WelcomeHeroCarousel from "./WelcomeHeroCarousel";

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
  return (
    <section className="relative">
      <WelcomeHeroCarousel slides={heroSlides} />
    </section>
  );
}
