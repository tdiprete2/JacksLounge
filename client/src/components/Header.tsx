import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-2xl font-serif font-bold text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md"
              data-testid="link-home"
            >
              Jack's Lounge
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("menu")}
              data-testid="button-menu"
            >
              Menu
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("about")}
              data-testid="button-about"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("location")}
              data-testid="button-location"
            >
              Location
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contact")}
              data-testid="button-contact"
            >
              Contact
            </Button>
          </nav>

          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("order")}
              data-testid="button-order-online"
            >
              Order Online
            </Button>
          </div>

          <button
            className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-4 py-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("menu")}
              data-testid="button-menu-mobile"
            >
              Menu
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("about")}
              data-testid="button-about-mobile"
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("location")}
              data-testid="button-location-mobile"
            >
              Location
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("contact")}
              data-testid="button-contact-mobile"
            >
              Contact
            </Button>
            <Button
              className="w-full"
              onClick={() => scrollToSection("order")}
              data-testid="button-order-online-mobile"
            >
              Order Online
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
