import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToOrder = () => {
    const element = document.getElementById("order");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToMenu = () => {
    const element = document.getElementById("featured");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://static-content.owner.com/funnel/images/ff5c81a4-1c65-43a0-b76d-8e3c0db8115f?v=6217982679&w=3840&q=80&auto=format)',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center py-20">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
          Welcome to Jack's Lounge
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          For over fifty years, Jack's Lounge has been a favorite spot in Hyannis for great food, cold drinks, and good times. Located at 373 West Main Street, we're proud to serve our community with honest, hearty meals that bring people together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg backdrop-blur-sm bg-primary/90 hover:bg-primary border border-primary-border"
            onClick={scrollToOrder}
            data-testid="button-hero-order"
          >
            Order Online
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border-white/30"
            onClick={scrollToMenu}
            data-testid="button-hero-menu"
          >
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
