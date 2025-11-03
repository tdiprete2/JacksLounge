import wingsImage from "@assets/IMG_7117 (1)_1762190095052.jpg";
import saladImage from "@assets/IMG_7550_1762190095052.jpg";
import ribsImage from "@assets/IMG_8292_1762190095053.jpg";
import quesadillaImage from "@assets/IMG_8582_1762190095053.jpg";
import pizzaSpreadImage from "@assets/1761751831936_1762190095056.jpg";
import pastaImage from "@assets/IMG_6715_1762190095057.jpg";

const galleryImages = [
  wingsImage,
  ribsImage,
  saladImage,
  quesadillaImage,
  pizzaSpreadImage,
  pastaImage,
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
