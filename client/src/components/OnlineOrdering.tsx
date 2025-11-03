export default function OnlineOrdering() {
  return (
    <section id="order" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-order-title">
            Order Online
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Skip the wait and bring Jack's Lounge straight to your table. Order online for pickup or delivery.
          </p>
        </div>

        <div className="w-full bg-card rounded-lg shadow-lg overflow-hidden" style={{ minHeight: "800px" }}>
          <iframe
            src="https://olo.spoton.com/60c3b6829adef31f4442003e"
            width="100%"
            height="800"
            frameBorder="0"
            title="Online Ordering"
            className="w-full"
            data-testid="iframe-ordering"
          />
        </div>
      </div>
    </section>
  );
}
