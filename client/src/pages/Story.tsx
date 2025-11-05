import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function Story() {
  useEffect(() => {
    document.title = "Our Story | Jack's Lounge - 60 Years of Family Tradition in Hyannis MA";
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateOGTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', 'Discover Jack\'s Lounge story - family-owned Hyannis restaurant since 1963. From pro boxer John "Jack" Sances to 3 generations of the DiPrete family serving signature honey pizzas.');
    updateOGTag('og:title', 'Our Story | Jack\'s Lounge - 60 Years of Family Tradition');
    updateOGTag('og:description', 'Discover Jack\'s Lounge story - family-owned Hyannis restaurant since 1963. From pro boxer John "Jack" Sances to 3 generations serving signature honey pizzas.');
    updateOGTag('og:type', 'website');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1" id="main-content">
        {/* Hero Section */}
        <section className="bg-card py-16 md:py-24 px-4 md:px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-story-title">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              At Jack's Lounge, we blend easygoing vibes with hearty Italian favorites, ribs, pizza and wings, creating a welcoming spot where locals gather to enjoy great food, friendly service, and unbeatable value.
            </p>
          </div>
        </section>

        {/* Main Story Content */}
        <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* First Paragraph */}
            <Card className="p-8 md:p-10">
              <p className="text-base md:text-lg leading-relaxed text-foreground" data-testid="text-story-intro">
                Our passion is serving up delicious, comforting meals that feel like home—whether you're dining in or taking our food to go. Opened in <strong>1963 by John "Jack" Sances</strong>, a former professional boxer, Jack's Lounge has been a cornerstone of the Hyannis community for over six decades.
              </p>
            </Card>

            {/* The Legacy Section */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center" data-testid="text-legacy-title">
                A Family Legacy
              </h2>
              <Card className="p-8 md:p-10">
                <p className="text-base md:text-lg leading-relaxed text-foreground mb-6" data-testid="text-story-diprete">
                  In <strong>1985</strong>, the restaurant was purchased by <strong>Henry and Anne DiPrete</strong>, who continued Jack's tradition of exceptional food and warm hospitality. For 40 years, the DiPrete family has nurtured this beloved establishment, making it a true family affair.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-foreground" data-testid="text-story-current">
                  Today, Jack's Lounge is proudly owned and operated by Henry & Anne's daughter <strong>Grace</strong> and their grandson <strong>Tim</strong>, who are keeping the family tradition alive. Now in its third generation of family ownership, Jack's continues to serve the community with the same dedication and passion that started 60 years ago.
                </p>
              </Card>
            </div>

            {/* Signature Pizzas */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center" data-testid="text-signature-title">
                Our Signature Pizzas
              </h2>
              <Card className="p-8 md:p-10 bg-primary/5 border-primary/20">
                <p className="text-base md:text-lg leading-relaxed text-foreground text-center" data-testid="text-story-pizza">
                  Renowned for our <strong className="text-primary">signature honey-topped pizzas</strong>, Jack's Lounge blends traditional charm with a modern twist to create a unique laid-back dining experience. Our honey pizzas have become legendary in the Cape Cod area, drawing pizza lovers from near and far.
                </p>
              </Card>
            </div>

            {/* Tradition Meets Innovation */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center" data-testid="text-tradition-title">
                Tradition Meets Innovation
              </h2>
              <Card className="p-8 md:p-10">
                <p className="text-base md:text-lg leading-relaxed text-foreground text-center" data-testid="text-story-closing">
                  Jack's Lounge is more than just a restaurant—it's a beloved family-owned institution with a <strong>60-year legacy</strong> of serving the Hyannis community. Come join us for a taste of tradition and innovation, where every meal is made with care and every guest is treated like family.
                </p>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center pt-8">
              <p className="text-xl md:text-2xl font-semibold text-primary mb-4">
                Visit Us Today
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                Experience the warmth, flavor, and tradition that has made Jack's Lounge a Hyannis favorite for six decades.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
