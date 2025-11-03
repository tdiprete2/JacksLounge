import { Button } from "@/components/ui/button";

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 bg-background border-b border-primary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <a href="/" aria-label="Jack's Lounge Home">
                <img
                  src="https://static-content.owner.com/funnel/images/c47c230c-9d49-47eb-9a99-29c70bb3518e?v=7683096227&h=56&auto=format&dpr=1"
                  alt="Jack's Lounge"
                  className="h-14 cursor-pointer"
                  data-testid="img-logo"
                />
              </a>
            </div>

            <nav className="hidden md:flex items-center gap-4" aria-label="Main navigation">
              <a
                href="/menu"
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-menu-page"
              >
                Menu
              </a>
              <button
                onClick={() => scrollToSection("featured")}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-featured"
                aria-label="View featured items"
              >
                Featured
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-gallery"
                aria-label="View food gallery"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-visit"
                aria-label="Visit us - location and hours"
              >
                Visit Us
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-testimonials"
                aria-label="Read customer reviews"
              >
                Reviews
              </button>
              <Button
                onClick={() => scrollToSection("order")}
                data-testid="button-order-online"
                aria-label="Order food online"
              >
                Order Online
              </Button>
            </nav>

            <div className="flex md:hidden items-center">
              <Button
                onClick={() => scrollToSection("order")}
                data-testid="button-order-online-mobile"
                aria-label="Order food online"
              >
                Order Online
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
