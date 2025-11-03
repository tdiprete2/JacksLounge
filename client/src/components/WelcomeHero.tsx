import exteriorImage from "@assets/20251029_101841_1762190095054.jpg";

export default function WelcomeHero() {
  return (
    <section className="relative">
      <div className="relative h-[600px] md:h-[700px]">
        <img
          src={exteriorImage}
          alt="Welcome to Jack's Lounge"
          className="w-full h-full object-cover"
          data-testid="img-welcome-hero"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-welcome-title">
              Welcome to Jack's Lounge
            </h2>
            <p className="text-lg md:text-xl leading-relaxed" data-testid="text-welcome-description">
              For over fifty years, Jack's Lounge has been a favorite spot in Hyannis for great food, cold drinks, and good times. Located at 373 West Main Street, we're proud to serve our community with honest, hearty meals that bring people together. Whether you're here for dinner with friends or ordering in for a cozy night at home, Jack's makes dining easy, comfortable, and always satisfying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
