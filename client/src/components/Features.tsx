import { Card, CardContent } from "@/components/ui/card";

const features = [
  "Dine In",
  "Take Out",
  "Delivery",
  "Happy Hour Food",
  "Great Cocktails",
  "Vegetarian Options"
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-lg md:text-xl font-semibold text-center text-foreground mb-12" data-testid="text-features-title">
          Featuring
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-feature-${index}`}>
              <CardContent className="p-6 text-center">
                <p className="font-medium text-base" data-testid={`text-feature-${index}`}>
                  {feature}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
