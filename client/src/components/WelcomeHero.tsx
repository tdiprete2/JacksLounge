import WelcomeHeroCarousel from "./WelcomeHeroCarousel";

// Hero slideshow images from public directory (locally hosted)
const heroSlides = [
  { desktop: "/images/hero/hero-0-desktop.webp", mobile: "/images/hero/hero-0-mobile.webp", alt: "Jack's Lounge restaurant exterior - best pizza and Italian food in Hyannis MA" },
  { desktop: "/images/hero/hero-1-desktop.webp", mobile: "/images/hero/hero-1-mobile.webp", alt: "Signature hand-tossed pizza at Jack's Lounge - Hyannis MA Cape Cod" },
  { desktop: "/images/hero/hero-2-desktop.webp", mobile: "/images/hero/hero-2-mobile.webp", alt: "Fresh food made daily at Jack's Lounge - pizza, wings, and Italian favorites in Hyannis MA" },
  { desktop: "/images/hero/hero-3-desktop.webp", mobile: "/images/hero/hero-3-mobile.webp", alt: "Jack's Lounge dining room - family-owned restaurant serving Hyannis MA since 1963" },
  { desktop: "/images/hero/hero-4-desktop.webp", mobile: "/images/hero/hero-4-mobile.webp", alt: "Jack's Lounge signature dishes - famous honey pizza and crispy wings on Cape Cod" },
  { desktop: "/images/hero/hero-5-desktop.webp", mobile: "/images/hero/hero-5-mobile.webp", alt: "Jack's Lounge Hyannis MA - dine-in, takeout, and delivery for pizza and wings" },
];

export default function WelcomeHero() {
  return (
    <section className="relative">
      <WelcomeHeroCarousel slides={heroSlides} />
    </section>
  );
}
