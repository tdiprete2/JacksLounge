// Import optimized section images (WebP format)
import pizzaDesktop from "@assets/optimized/section-rewards-desktop.webp";
import pizzaMobile from "@assets/optimized/section-rewards-mobile.webp";

export default function RewardsSection() {
  return (
    <section className="relative">
      <div className="relative h-[400px] md:h-[500px]">
        <picture>
          <source media="(min-width: 768px)" srcSet={pizzaDesktop} type="image/webp" />
          <source media="(max-width: 767px)" srcSet={pizzaMobile} type="image/webp" />
          <img
            src={pizzaDesktop}
            alt="Jack's Lounge Rewards"
            className="w-full h-full object-cover"
            data-testid="img-rewards"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-3xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-rewards-title">
              Jack's Lounge Rewards
            </h2>
            <p className="text-lg md:text-xl leading-relaxed" data-testid="text-rewards-description">
              Join our rewards program, earn points every time you order online and redeem your points for free food!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
