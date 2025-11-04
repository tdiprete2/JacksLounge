// Import optimized section images (WebP format)
import interiorDesktop from "@assets/optimized/section-neighborhood-desktop.webp";
import interiorMobile from "@assets/optimized/section-neighborhood-mobile.webp";

export default function NeighborhoodSpot() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <picture>
              <source media="(min-width: 768px)" srcSet={interiorDesktop} type="image/webp" />
              <source media="(max-width: 767px)" srcSet={interiorMobile} type="image/webp" />
              <img
                src={interiorDesktop}
                alt="Your Neighborhood Spot"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
                data-testid="img-neighborhood"
              />
            </picture>
          </div>

          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-neighborhood-title">
              Your Neighborhood Spot
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed" data-testid="text-neighborhood-description">
              Jack's Lounge isn't just about food—it's about community. We've been part of the Hyannis area for more than half a century, serving generations of families, friends, and visitors. Our goal has always been simple: make great food, serve it with care, and create a place where everyone feels welcome. It's why locals keep coming back and why new guests quickly become regulars.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
