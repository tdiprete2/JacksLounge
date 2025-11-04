import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "1",
    question: "What are your hours of operation?",
    answer: "We're open Monday 11am-10pm, Tuesday 11am-9:30pm, Wednesday 11am-10:30pm, Thursday-Friday 11am-10pm, Saturday 11am-11pm, and Sunday 12pm-9:30pm. Hours may vary on holidays, so please call ahead during holiday periods."
  },
  {
    id: "2",
    question: "Do you offer delivery?",
    answer: "Yes! You can order online through our SpotOn ordering system for both pickup and delivery. We deliver to the local Hyannis area. Delivery fees may apply depending on your location."
  },
  {
    id: "3",
    question: "Do you take reservations?",
    answer: "We operate on a first-come, first-served basis and do not take reservations. However, we're happy to accommodate large groups - just give us a call ahead at (508) 775-0612 so we can prepare for your party."
  },
  {
    id: "4",
    question: "What makes Jack's pizza special?",
    answer: "Our signature honey-topped pizzas have been a local favorite for over 60 years! We use a unique recipe that includes a light drizzle of honey on our thin, crispy crust pizzas. It's a sweet and savory combination that keeps customers coming back generation after generation."
  },
  {
    id: "5",
    question: "Do you have vegetarian options?",
    answer: "Absolutely! We offer a variety of vegetarian pizzas, calzones, salads, and pasta dishes. Our menu includes veggie pizzas, garden salads, and Italian favorites that can be customized to your dietary preferences."
  },
  {
    id: "6",
    question: "Can I order food for large parties or events?",
    answer: "Yes! We specialize in large orders for parties, business events, and gatherings. We offer discounts on large orders and have special Party Pizzas. For the quickest response, please call us at (508) 775-0612. We also offer specialty trays of pasta, lasagna, steak tips, and more - just call to order."
  },
  {
    id: "7",
    question: "Do you offer catering services?",
    answer: "While we don't offer full catering services, we do provide large orders and specialty trays perfect for events. You can order party-sized portions of our wings, tenders, salads, and pizzas. Call us at (508) 775-0612 to discuss your event needs."
  },
  {
    id: "8",
    question: "Can I get uncooked pizzas to bake at home?",
    answer: "Yes! We offer uncooked pizzas that you can take home and bake in your own oven. This way you can enjoy that fresh-from-the-oven Jack's pizza flavor at home whenever you want."
  },
  {
    id: "9",
    question: "Do you have a bar?",
    answer: "Yes! Jack's Lounge has a full bar with great cocktails, beer, and wine. We also offer happy hour food specials. It's a perfect spot to grab drinks with friends or watch the game."
  },
  {
    id: "10",
    question: "What payment methods do you accept?",
    answer: "We accept cash, all major credit cards (Visa, Mastercard, American Express, Discover), and debit cards. For online orders, you can pay securely through our ordering system."
  },
  {
    id: "11",
    question: "Is parking available?",
    answer: "Yes, we have parking available for our customers. We're conveniently located at 373 West Main Street in Hyannis with easy access and parking."
  },
  {
    id: "12",
    question: "How can I join the rewards program?",
    answer: "Simply order online through our website! When you create an account for online ordering, you're automatically enrolled in Jack's Lounge Rewards. Earn points with every order and redeem them for free food."
  }
];

export default function FAQ() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-faq-title">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/70">
            Got questions? We've got answers! Find everything you need to know about Jack's Lounge.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} data-testid={`faq-item-${faq.id}`}>
              <AccordionTrigger className="text-left text-lg font-semibold" data-testid={`faq-question-${faq.id}`}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80" data-testid={`faq-answer-${faq.id}`}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-card rounded-lg border border-primary/20">
          <h3 className="text-xl font-semibold mb-2">Contact Jack's Lounge Hyannis</h3>
          <p className="text-foreground/70 mb-4">
            Can't find the answer you're looking for? Give us a call or send us a message!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+15087750612"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover-elevate active-elevate-2 font-medium"
              data-testid="button-call-faq"
            >
              Call (508) 775-0612
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-card border border-primary/30 text-foreground rounded-md hover-elevate active-elevate-2 font-medium"
              data-testid="button-contact-faq"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
