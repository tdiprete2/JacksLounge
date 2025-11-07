import { Link, useLocation } from "wouter";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const [location, navigate] = useLocation();

  const scrollToSection = (id: string) => {
    if (location !== "/") {
      // Navigate to home page first, then scroll
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
  };

  return (
    <footer className="bg-card border-t border-border py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4" data-testid="text-footer-title">
              Jack's Lounge - Hyannis Pizza & Bar
            </h3>
            <p className="text-muted-foreground mb-4">
              Serving Hyannis with signature honey-topped pizzas, BBQ ribs, and Italian favorites since 1963.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.facebook.com/Jackspizzahyannis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <Facebook size={24} />
                <span>Follow us on Facebook for Daily Specials</span>
              </a>
              <a
                href="https://www.instagram.com/jackspizzahyannis/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <Instagram size={24} />
                <span>Follow us on Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/menu"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-menu"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/story"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-story"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <a
                  href="https://order.spoton.com/so-jacks-4621/hyannis-ma/679d5d0ce023c79ae4105677"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-order"
                >
                  Order Online
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("location")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-location"
                >
                  Location & Hours
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li data-testid="text-footer-address">
                373 West Main Street
                <br />
                Hyannis, MA 02601
              </li>
              <li>
                <a href="tel:+15087750612" className="hover:text-primary transition-colors" data-testid="link-footer-phone">
                  (508) 775-0612
                </a>
              </li>
              <li>
                <a href="mailto:jackspizza@comcast.net" className="hover:text-primary transition-colors" data-testid="link-footer-email">
                  jackspizza@comcast.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p data-testid="text-footer-copyright">
            © {new Date().getFullYear()} Jack's Lounge. All rights reserved. Family-owned and operated since 1963.
          </p>
        </div>
      </div>
    </footer>
  );
}
