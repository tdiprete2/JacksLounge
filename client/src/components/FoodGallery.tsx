// Gallery images served from /images/gallery/ (optimized WebP format)
const galleryImages = [
  { src: "/images/gallery/gallery-wings.webp", alt: "Crispy chicken wings with sauce at Jack's Lounge Hyannis MA" },
  { src: "/images/gallery/gallery-salad.webp", alt: "Fresh garden salad with toppings at Jack's Lounge" },
  { src: "/images/gallery/gallery-quesadilla.webp", alt: "Grilled quesadilla with melted cheese - Mexican food Hyannis" },
  { src: "/images/gallery/gallery-pizza-spread.webp", alt: "Variety of Jack's signature honey-topped pizzas in Hyannis MA" },
  { src: "/images/gallery/gallery-pasta.webp", alt: "Italian pasta dish from Jack's menu in Hyannis" },
];

export default function FoodGallery() {
  return (
    <section id="gallery" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4" data-testid="text-gallery-title">
            Satisfy Your Cravings: Freshly Made, Always Delicious!
          </h2>
          <p className="text-base text-foreground/70 max-w-3xl mx-auto">
            Our food gallery showcases a wide variety of options that suit every appetite. Whether you're stopping by for a casual meal, celebrating with friends, or grabbing a quick bite at home, you'll find dishes made fresh and ready to enjoy. Each plate is thoughtfully prepared, keeping the flavors simple, satisfying, and approachable for everyone.
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
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
                width="800"
                height="800"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
