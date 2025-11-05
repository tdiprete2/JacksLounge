import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";
// Import optimized rewards images - real restaurant pizza photo (WebP format)
import rewardsDesktop from "@assets/optimized/rewards-desktop.webp";
import rewardsMobile from "@assets/optimized/rewards-mobile.webp";

export default function RewardsSection() {
  return (
    <section className="relative">
      <div className="relative h-[450px] md:h-[550px]">
        <picture>
          <source media="(min-width: 768px)" srcSet={rewardsDesktop} type="image/webp" />
          <source media="(max-width: 767px)" srcSet={rewardsMobile} type="image/webp" />
          <img
            src={rewardsDesktop}
            alt="Download Jack's Lounge app - order pizza, earn rewards, get discounts on your favorite Hyannis food"
            className="w-full h-full object-cover"
            width="1920"
            height="550"
            data-testid="img-rewards"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/75 to-black/65" />
        <div className="absolute inset-0 flex items-center justify-center py-8">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center text-white">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg leading-tight" data-testid="text-rewards-title">
              Download Our App & Save
            </h2>
            <p className="text-base md:text-xl lg:text-2xl leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto drop-shadow-md font-medium" data-testid="text-rewards-description">
              Order faster, earn points with every purchase, and unlock exclusive discounts on Jack's famous pizza and ribs!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                data-testid="button-app-store"
                className="bg-black/90 hover:bg-black text-white border-2 border-white/30 shadow-xl min-w-[200px]"
              >
                <a
                  href="https://apps.apple.com/us/app/goto-place/id6736528808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-90">Download on the</div>
                    <div className="text-base font-semibold">App Store</div>
                  </div>
                </a>
              </Button>
              <Button
                size="lg"
                asChild
                data-testid="button-google-play"
                className="bg-black/90 hover:bg-black text-white border-2 border-white/30 shadow-xl min-w-[200px]"
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.spoton.gotobyspoton&hl=en_US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-90">GET IT ON</div>
                    <div className="text-base font-semibold">Google Play</div>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
