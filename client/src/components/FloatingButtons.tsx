import { Gift, ShoppingBag } from "lucide-react";

export default function FloatingButtons() {
  return (
    <>
      {/* Rewards Button - Bottom Left */}
      <a
        href="https://l.spoton.com/DrOldL"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sign Up for Rewards"
        data-testid="button-floating-rewards"
        className="fixed bottom-8 left-4 z-50 flex items-center gap-3 rounded-full px-4 py-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 md:bottom-12 md:left-8"
        style={{ backgroundColor: '#d4af37' }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <Gift className="h-5 w-5 text-black" />
        </div>
        <span className="hidden text-sm font-semibold text-black sm:inline-block border-l-2 border-white pl-3">
          Sign Up for Rewards
        </span>
      </a>

      {/* Order Online Button - Bottom Right */}
      <a
        href="https://olo.spoton.com/60c3b6829adef31f4442003e"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order Online"
        data-testid="button-floating-order"
        className="fixed bottom-8 right-4 z-50 flex items-center gap-3 rounded-full px-4 py-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 md:bottom-12 md:right-8"
        style={{ backgroundColor: '#d4af37' }}
      >
        <span className="hidden text-sm font-semibold text-black sm:inline-block border-r-2 border-white pr-3">
          Order Online
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <ShoppingBag className="h-5 w-5 text-black" />
        </div>
      </a>
    </>
  );
}
