const galleryImages = [
  "https://static-content.owner.com/funnel/images/15b92713-bcef-448e-9208-a87150a675e8?v=2959572632&w=800&q=80&auto=format",
  "https://static-content.owner.com/funnel/images/f0bffb1d-4edb-4acf-b39c-4e18c89b253b?v=7771038006&w=800&q=80&auto=format",
  "https://static-content.owner.com/funnel/images/e5e45b66-980e-40bc-a113-9ced3d033d69?v=1599201131&w=800&q=80&auto=format",
  "https://static-content.owner.com/funnel/images/ebb4ff00-afc5-4cdc-84bc-cc4ec36e2fed?v=5220625911&w=800&q=80&auto=format",
  "https://static-content.owner.com/funnel/images/13ec33a2-8261-4e7e-af9c-7bdca7ef1e07?v=4765369682&w=800&q=80&auto=format",
  "https://static-content.owner.com/funnel/images/d3b48274-0351-467f-84c1-a911560bfa56?v=1275882646&w=800&q=80&auto=format",
];

export default function FoodGallery() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-gallery-title">
            Satisfy Your Cravings: Freshly Made, Always Delicious!
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our food gallery showcases a wide variety of options that suit every appetite. Whether you're stopping by for a casual meal, celebrating with friends, or grabbing a quick bite at home, you'll find dishes made fresh and ready to enjoy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg hover-elevate cursor-pointer"
              data-testid={`img-gallery-${index}`}
            >
              <img
                src={image}
                alt={`Food gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
