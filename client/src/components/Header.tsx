import { Button } from "@/components/ui/button";

export default function Header() {
  const scrollToOrder = () => {
    const element = document.getElementById("order");
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
              className="h-14"
              data-testid="img-logo"
            />
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://olo.spoton.com/60c3b6829adef31f4442003e"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-foreground hover-elevate px-3 py-2 rounded-md"
              data-testid="link-menu"
            >
              Menu
            </a>
            <Button
              onClick={scrollToOrder}
              data-testid="button-order-online"
            >
              Order online
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
