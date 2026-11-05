import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import { PATHS, SITE } from "@shared/site";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (location !== "/") {
      // Navigate to home page, then scroll after navigation
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-3 xl:h-20 xl:flex-row xl:items-center xl:justify-between xl:gap-0 xl:py-0">
            <div className="flex items-center justify-between xl:justify-start">
              <Link href="/" aria-label="Jack's Lounge - Hyannis MA Pizza Restaurant Home">
                <picture>
                  <source
                    type="image/webp"
                    media="(min-width: 768px)"
                    srcSet="/images/logo/logo-1x.webp 1x, /images/logo/logo-2x.webp 2x"
                  />
                  <source
                    type="image/webp"
                    srcSet="/images/logo/logo-mobile.webp"
                  />
                  <img
                    src="/images/logo/logo-1x.png"
                    alt="Jack's Lounge - Best Pizza in Hyannis, MA"
                    width="216"
                    height="56"
                    className="h-12 w-auto max-w-[160px] cursor-pointer md:h-14 md:max-w-none"
                    data-testid="img-logo"
                    loading="eager"
                    {...({ fetchpriority: "high" } as any)}
                  />
                </picture>
              </Link>
            </div>

            <nav className="hidden xl:flex items-center gap-4" aria-label="Main navigation">
                <Link
                  href={PATHS.menu}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-menu-page"
              >
                Menu
              </Link>
                <Link
                  href={PATHS.story}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-story-page"
              >
                Our Story
              </Link>
                <Link
                  href={PATHS.specials}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-specials-page"
              >
                Specials
              </Link>
              <a
                href="/#featured"
                onClick={(e) => scrollToSection(e, "featured")}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-featured"
                aria-label="View featured items"
              >
                Featured
              </a>
              <a
                href="/#gallery"
                onClick={(e) => scrollToSection(e, "gallery")}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-gallery"
                aria-label="View food gallery"
              >
                Gallery
              </a>
              <a
                href="/#location"
                onClick={(e) => scrollToSection(e, "location")}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-visit"
                aria-label="Visit us - location and hours"
              >
                Visit Us
              </a>
              <a
                href="/#testimonials"
                onClick={(e) => scrollToSection(e, "testimonials")}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-testimonials"
                aria-label="Read customer reviews"
              >
                Reviews
              </a>
                <Link
                  href={PATHS.contact}
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
                data-testid="link-contact-page"
              >
                Contact
              </Link>
              <Button
                asChild
                data-testid="button-order-online"
                aria-label="Order food online"
              >
                <a
                  href={SITE.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Online
                </a>
              </Button>
            </nav>

            <div className="absolute right-4 top-3 flex xl:hidden items-center gap-2">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 shrink-0"
                    data-testid="button-mobile-menu"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="z-[60] max-h-[100dvh] w-[min(88vw,400px)] max-w-[400px] overflow-y-auto motion-reduce:animate-none data-[state=open]:duration-200"
                >
                  <SheetTitle className="sr-only">Jack's Lounge navigation</SheetTitle>
                  <SheetDescription className="sr-only">
                    Open a page or jump to a section of the homepage.
                  </SheetDescription>
                  <nav
                    className="mt-8 flex flex-col gap-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
                    aria-label="Mobile navigation"
                  >
                    <Link
                      href={PATHS.menu}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md"
                      data-testid="link-menu-page-mobile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Menu
                    </Link>
                    <Link
                      href={PATHS.story}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md"
                      data-testid="link-story-page-mobile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Our Story
                    </Link>
                    <Link
                      href={PATHS.specials}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md"
                      data-testid="link-specials-page-mobile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Specials
                    </Link>
                    <a
                      href="/#featured"
                      onClick={(e) => scrollToSection(e, "featured")}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md block"
                      data-testid="link-featured-mobile"
                      aria-label="View featured items"
                    >
                      Featured
                    </a>
                    <a
                      href="/#gallery"
                      onClick={(e) => scrollToSection(e, "gallery")}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md block"
                      data-testid="link-gallery-mobile"
                      aria-label="View food gallery"
                    >
                      Gallery
                    </a>
                    <a
                      href="/#location"
                      onClick={(e) => scrollToSection(e, "location")}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md block"
                      data-testid="link-visit-mobile"
                      aria-label="Visit us - location and hours"
                    >
                      Visit Us
                    </a>
                    <a
                      href="/#testimonials"
                      onClick={(e) => scrollToSection(e, "testimonials")}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md block"
                      data-testid="link-testimonials-mobile"
                      aria-label="Read customer reviews"
                    >
                      Reviews
                    </a>
                    <Link
                      href={PATHS.contact}
                      className="text-lg font-medium text-foreground hover-elevate px-4 py-3 rounded-md"
                      data-testid="link-contact-page-mobile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                    <Button
                      asChild
                      className="mt-3 min-h-12"
                      size="lg"
                      data-testid="button-order-online-mobile"
                      aria-label="Order food online"
                    >
                      <a
                        href={SITE.orderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Order Online
                      </a>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex w-full items-stretch gap-2 xl:hidden">
              <a
                href={SITE.phoneHref}
                className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-md border border-primary/50 bg-card px-2 text-[clamp(.82rem,4vw,1rem)] font-semibold tracking-tight text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`Call Jack's Lounge at ${SITE.phoneDisplay}`}
                data-testid="link-mobile-phone"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                <span className="whitespace-nowrap">{SITE.phoneDisplay}</span>
              </a>
              <a
                href={SITE.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-md bg-primary px-3 text-sm font-bold text-primary-foreground shadow-md transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Order food online"
                data-testid="button-mobile-header-order"
              >
                Order Online
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
