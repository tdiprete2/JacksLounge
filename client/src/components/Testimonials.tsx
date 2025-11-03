import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Justin T.",
    rating: 5,
    text: "Jacks Lounge is a local favorite. I've been coming here since I was a kid and now I go there as an adult. Their pizza is crunchy and thin and checks all the boxes. Jacks staff is always friendly, they always have a menu with specials that are delicious. I would recommend if you're looking for a small atmosphere with great vibes and tasty food and drinks!",
    avatar: "https://static-content.owner.com/funnel/images/f5f11da7-63a1-4748-aefe-c032925da3e9?v=3696744320&w=128&q=80&auto=format",
  },
  {
    id: 2,
    name: "Brooke S.",
    rating: 5,
    text: "Hands down have the best fries, they were baked instead of fried so I felt so good afterwards after eating them. Also, decent clam chowder! Thank you Jack's.",
    avatar: "https://static-content.owner.com/funnel/images/d546fac5-339e-41fb-bdc8-eda6d29e6a7b?v=2907565741&w=128&q=80&auto=format",
  },
  {
    id: 3,
    name: "April M.",
    rating: 5,
    text: "The wings were AMAZING! Cole was so nice. We are definitely going to go back for dinner. I love the atmosphere. It's an awesome lounge!",
    avatar: "https://static-content.owner.com/funnel/images/747fd2a6-b8d0-4f75-93ee-199d6c3bf466?v=6837840113&w=128&q=80&auto=format",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
            What Our Guests Are Saying
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Don't just take our word for it - hear from our valued customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover-elevate" data-testid={`card-testimonial-${testimonial.id}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                    data-testid={`img-avatar-${testimonial.id}`}
                  />
                  <div>
                    <h3 className="font-semibold text-lg" data-testid={`text-name-${testimonial.id}`}>
                      {testimonial.name}
                    </h3>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={16} className="fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed" data-testid={`text-review-${testimonial.id}`}>
                  {testimonial.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
