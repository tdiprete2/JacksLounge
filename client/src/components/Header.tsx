import { Button } from "@/components/ui/button";

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-primary/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img
              src="https://static-content.owner.com/funnel/images/c47c230c-9d49-47eb-9a99-29c70bb3518e?v=7683096227&h=56&auto=format&dpr=1"
              alt="Jack's Lounge"
              className="h-14 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              data-testid="img-logo"
            />
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection("featured")}
              className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
              data-testid="link-featured"
            >
              Featured
            </button>
            <button
              onClick={() => scrollToSection("italian-favorites")}
              className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
              data-testid="link-italian"
            >
              Italian Favorites
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
              data-testid="link-gallery"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("visit")}
              className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
              data-testid="link-visit"
            >
              Visit Us
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
              data-testid="link-testimonials"
            >
              Reviews
            </button>
            <Button
              onClick={() => scrollToSection("order")}
              data-testid="button-order-online"
            >
              Order Online
            </Button>
          </nav>

          <div className="flex md:hidden items-center">
            <Button
              onClick={() => scrollToSection("order")}
              data-testid="button-order-online-mobile"
            >
              Order Online
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
