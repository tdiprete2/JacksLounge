export default function RewardsSection() {
  return (
    <section className="relative">
      <div className="relative h-[450px] md:h-[550px]">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/sections/rewards-desktop.webp" type="image/webp" />
          <source media="(max-width: 767px)" srcSet="/images/sections/rewards-mobile.webp" type="image/webp" />
          <img
            src="/images/sections/rewards-desktop.webp"
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
              Order faster, earn points with every purchase, and unlock exclusive discounts on Jack's Pizza, Wings & More!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://apps.apple.com/us/app/goto-place/id6736528808"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-app-store"
                className="transition-transform hover:scale-105 active:scale-95"
              >
                <img
                  src="/images/badges/app-store-badge-60.webp"
                  alt="Download Jack's Lounge on the App Store"
                  className="h-[60px] w-auto"
                  width="179"
                  height="60"
                  loading="lazy"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.spoton.gotobyspoton&hl=en_US"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-google-play"
                className="transition-transform hover:scale-105 active:scale-95"
              >
                <img
                  src="/images/badges/google-play-badge-60.webp"
                  alt="Get Jack's Lounge on Google Play"
                  className="h-[60px] w-auto"
                  width="155"
                  height="60"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
