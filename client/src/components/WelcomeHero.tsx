import WelcomeHeroCarousel from "./WelcomeHeroCarousel";

// Hero slideshow images from public directory (locally hosted)
const heroSlides = [
  { desktop: "/images/hero/hero-0-desktop.webp", mobile: "/images/hero/hero-0-mobile.webp", alt: "Jack's Lounge Exterior - Best Pizza Restaurant in Hyannis MA" },
  { desktop: "/images/hero/hero-1-desktop.webp", mobile: "/images/hero/hero-1-mobile.webp", alt: "Best Pizza in Hyannis - Jack's Lounge Famous Honey Pizza" },
  { desktop: "/images/hero/hero-2-desktop.webp", mobile: "/images/hero/hero-2-mobile.webp", alt: "Fresh Italian Food at Jack's Lounge Hyannis Cape Cod" },
  { desktop: "/images/hero/hero-3-desktop.webp", mobile: "/images/hero/hero-3-mobile.webp", alt: "Jack's Lounge Restaurant Hyannis - Family Dining Since 1963" },
  { desktop: "/images/hero/hero-4-desktop.webp", mobile: "/images/hero/hero-4-mobile.webp", alt: "Best Wings and BBQ Ribs in Hyannis at Jack's Lounge" },
  { desktop: "/images/hero/hero-5-desktop.webp", mobile: "/images/hero/hero-5-mobile.webp", alt: "Jack's Lounge Special Meals - Late Night Food Hyannis" },
];

export default function WelcomeHero() {
  return (
    <section className="relative">
      <WelcomeHeroCarousel slides={heroSlides} />
    </section>
  );
}
