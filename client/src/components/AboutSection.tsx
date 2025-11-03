export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src="https://static.wixstatic.com/media/4849f2_9c3ec27589344283b6deaa05e8124e0c~mv2.jpg/v1/fill/w_600,h_800,al_c,q_85,usm_0.66_1.00_0.01/IMG_8304_edited.jpg"
              alt="Jack's Lounge Ribs"
              className="rounded-lg shadow-xl w-full"
              loading="lazy"
              data-testid="img-ribs"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-about-title">
              About Jack's Lounge
            </h2>
            <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
            <div className="space-y-4 text-lg text-foreground/90 leading-relaxed">
              <p data-testid="text-about-para-1">
                At Jack's Lounge, we blend easygoing vibes with hearty Italian favorites, ribs, pizza and wings, creating a welcoming spot where locals gather to enjoy great food, friendly service, and unbeatable value. Our passion is serving up delicious, comforting meals that feel like home—whether you're dining in or taking our food to go.
              </p>
              <p data-testid="text-about-para-2">
                Opened in 1963 by John "Jack" Sances, a former pro boxer. Later bought by Henry and Anne DiPrete in 1985. Jack's Lounge is a beloved family-owned and operated pizza restaurant and bar with a 60-year legacy of serving the community. Now owned by Henry & Anne's daughter Grace and their grandson Tim who are keeping the family tradition alive after 40 years of family ownership.
              </p>
              <p data-testid="text-about-para-3">
                Renowned for our signature honey-topped pizzas, Jack's blends traditional charm with a modern twist to create an unique laid back dining experience. Come join us for a taste of tradition and innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
