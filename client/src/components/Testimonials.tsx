import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Justin T.",
    text: "Jacks Lounge is a local favorite. I've been coming here since I was a kid and now I go there as an adult. Their pizza is crunchy and thin and checks all the boxes. Jacks staff is always friendly, they always have a menu with specials that are delicious. I would recommend if you're looking for a small atmosphere with great vibes and tasty food and drinks!",
    avatar: "https://static-content.owner.com/funnel/images/f5f11da7-63a1-4748-aefe-c032925da3e9?v=3696744320&w=128&q=80&auto=format",
  },
  {
    id: 2,
    name: "Brooke S.",
    text: "Hands down have the best fries, they were baked instead of fried so I felt so good afterwards after eating them. Also, decent calm chowder! Thank you Jack's.",
    avatar: "https://static-content.owner.com/funnel/images/d546fac5-339e-41fb-bdc8-eda6d29e6a7b?v=2907565741&w=128&q=80&auto=format",
  },
  {
    id: 3,
    name: "April M.",
    text: "The wings were AMAZING ! Cole was so nice. We are definitely going to go back for dinner. I love the atmosphere It's an awesome lounge!",
    avatar: "https://static-content.owner.com/funnel/images/747fd2a6-b8d0-4f75-93ee-199d6c3bf466?v=6837840113&w=128&q=80&auto=format",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-base md:text-lg font-semibold text-center text-foreground mb-12" data-testid="text-testimonials-title">
          What our guests are saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="text-center" data-testid={`card-testimonial-${testimonial.id}`}>
              <p className="text-foreground/80 mb-8 leading-relaxed" data-testid={`text-review-${testimonial.id}`}>
                {testimonial.text}
              </p>
              <div className="flex flex-col items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                  data-testid={`img-avatar-${testimonial.id}`}
                />
                <p className="font-medium text-foreground" data-testid={`text-name-${testimonial.id}`}>
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            asChild
            data-testid="button-review"
          >
            <a
              href="https://www.google.com/search?sca_esv=3254653861c5b0f8&rlz=1C1RXQR_enUS1135US1135&sxsrf=AE3TifN0Q5URC3ThX_nkrDSGkCP1zNDDxQ:1762219892513&q=jacks+lounge&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s_t01b4el_-ZS1G1dmBrR9n8YoDA0yOra6PcSzrOxUdjKKs8_A1nWsQ2k1U2chO53gBrp_M6ECVF7uLFdFWd76zz-n94&sa=X&ved=2ahUKEwiGkNbVrNeQAxX2pIkEHf5nAfwQrrQLegQIHhAA&cshid=1762219920073083&biw=2195&bih=1074&dpr=1.75#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Star size={20} />
              Leave a Review on Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
