import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
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
              <a
                href="/contact"
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-contact-page"
              >
                Contact
              </a>
              <Button
                onClick={() => scrollToSection("order")}
                data-testid="button-order-online"
                aria-label="Order food online"
              >
                Order Online
              </Button>
            </nav>

            <div className="flex md:hidden items-center gap-2">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="button-mobile-menu"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
                    <a
                      href="/menu"
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md"
                      data-testid="link-menu-page-mobile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Menu
                    </a>
                    <button
                      onClick={() => scrollToSection("featured")}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md text-left"
                      data-testid="link-featured-mobile"
                      aria-label="View featured items"
                    >
                      Featured
                    </button>
                    <button
                      onClick={() => scrollToSection("gallery")}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md text-left"
                      data-testid="link-gallery-mobile"
                      aria-label="View food gallery"
                    >
                      Gallery
                    </button>
                    <button
                      onClick={() => scrollToSection("location")}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md text-left"
                      data-testid="link-visit-mobile"
                      aria-label="Visit us - location and hours"
                    >
                      Visit Us
                    </button>
                    <button
                      onClick={() => scrollToSection("testimonials")}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md text-left"
                      data-testid="link-testimonials-mobile"
                      aria-label="Read customer reviews"
                    >
                      Reviews
                    </button>
                    <a
                      href="/contact"
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md"
                      data-testid="link-contact-page-mobile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </a>
                    <Button
                      onClick={() => scrollToSection("order")}
                      className="mt-4"
                      size="lg"
                      data-testid="button-order-online-mobile"
                      aria-label="Order food online"
                    >
                      Order Online
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
