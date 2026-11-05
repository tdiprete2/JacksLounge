import { Gift, ShoppingBag } from "lucide-react";

import { SITE } from "@shared/site";
const REWARDS_URL = "https://l.spoton.com/DrOldL";
const BRAND_GOLD = "#d4af37";

export default function FloatingButtons() {
  return (
    <>
      {/* Desktop floating pills; mobile ordering is handled by the sticky header. */}

      {/* Rewards Button - Bottom Left */}
      <a
        href={REWARDS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sign Up for Rewards"
        data-testid="button-floating-rewards"
        className="fixed bottom-12 left-8 z-50 hidden items-center gap-3 rounded-full px-4 py-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 md:flex"
        style={{ backgroundColor: BRAND_GOLD }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <Gift className="h-5 w-5 text-black" />
        </div>
        <span className="text-sm font-semibold text-black border-l-2 border-white pl-3">
          Sign Up for Rewards
        </span>
      </a>

      {/* Order Online Button - Bottom Right */}
      <a
        href={SITE.orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order Online"
        data-testid="button-floating-order"
        className="fixed bottom-12 right-8 z-50 hidden items-center gap-3 rounded-full px-4 py-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 md:flex"
        style={{ backgroundColor: BRAND_GOLD }}
      >
        <span className="text-sm font-semibold text-black border-r-2 border-white pr-3">
          Order Online
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <ShoppingBag className="h-5 w-5 text-black" />
        </div>
      </a>
    </>
  );
}
