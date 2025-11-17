import WelcomeHeroCarousel from "./WelcomeHeroCarousel";

// Hero slideshow images from public directory (locally hosted)
const heroSlides = [
  { desktop: "/images/hero/hero-0-desktop.webp", mobile: "/images/hero/hero-0-mobile.webp", alt: "Jack's Lounge Exterior" },
  { desktop: "/images/hero/hero-1-desktop.webp", mobile: "/images/hero/hero-1-mobile.webp", alt: "Delicious Pizza at Jack's Lounge" },
  { desktop: "/images/hero/hero-2-desktop.webp", mobile: "/images/hero/hero-2-mobile.webp", alt: "Fresh Food at Jack's Lounge" },
  { desktop: "/images/hero/hero-3-desktop.webp", mobile: "/images/hero/hero-3-mobile.webp", alt: "Jack's Lounge Restaurant" },
  { desktop: "/images/hero/hero-4-desktop.webp", mobile: "/images/hero/hero-4-mobile.webp", alt: "Signature Dishes" },
  { desktop: "/images/hero/hero-5-desktop.webp", mobile: "/images/hero/hero-5-mobile.webp", alt: "Jack's Special Meals" },
];

export default function WelcomeHero() {
  return (
    <section className="relative">
      <WelcomeHeroCarousel slides={heroSlides} />
    </section>
  );
}
