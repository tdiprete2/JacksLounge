import { Link } from "wouter";
import { useEffect } from "react";
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
    question: "Do you offer pizza delivery in Hyannis?",
    answer: "Yes! We offer pizza and wings delivery throughout the Hyannis area. Order online through our SpotOn ordering system for convenient delivery or pickup. We're the best pizza delivery in Hyannis, serving hot, fresh pizzas and wings to your door."
  },
  {
    id: "3",
    question: "What is hot honey pizza and do you have it?",
    answer: "Our signature hot honey pizza features our famous honey-topped pizza with a spicy kick! We've been drizzling honey on our pizzas since 1963, creating that perfect sweet and savory balance. It's our most popular specialty and what makes Jack's the best pizza in Hyannis, MA."
  },
  {
    id: "4",
    question: "What makes Jack's Lounge the best wings in Hyannis?",
    answer: "Our wings are crispy-baked to perfection, never fried! We offer both bone-in wings and boneless buffalo tenders with your choice of sauces including Buffalo, BBQ, Sweet Chili, and Garlic Parmesan. Served with blue cheese and celery, our wings are a local favorite in Cape Cod."
  },
  {
    id: "5",
    question: "Why is Jack's pizza special?",
    answer: "Our signature honey-topped pizzas have been a local favorite for over 60 years! We use a unique recipe that includes a light drizzle of honey on our crispy crust pizzas. It's a sweet and savory combination that keeps customers coming back generation after generation. This is what makes us the best pizza in Hyannis."
  },
  {
    id: "6",
    question: "Do you have gluten-free pizza options?",
    answer: "Yes! We offer gluten-free pizza crust options for customers with dietary restrictions. Our gluten-free pizzas can be customized with any of our fresh toppings, including our signature honey drizzle. Perfect for those seeking gluten-free options in Hyannis, MA."
  },
  {
    id: "7",
    question: "Are you open late for pizza delivery?",
    answer: "Yes! We're open until 10pm-11pm most nights, making us one of the best late-night pizza options in Hyannis. Perfect for when you're craving pizza and wings after a night out on Cape Cod. Call (508) 775-0612 or order online for late-night delivery."
  },
  {
    id: "8",
    question: "Do you have vegetarian and vegan pizza options?",
    answer: "Absolutely! We offer a variety of vegetarian pizzas, calzones, salads, and pasta dishes. Our menu includes veggie pizzas, garden salads, and Italian favorites that can be customized to your dietary preferences."
  },
  {
    id: "9",
    question: "Is Jack's Lounge family-friendly?",
    answer: "Absolutely! We're a family-owned restaurant that welcomes families with kids of all ages. We have a diverse menu with options for everyone, from pizza and pasta to wings and salads. Our casual atmosphere makes it perfect for family dinners in Hyannis."
  },
  {
    id: "10",
    question: "Can I order wings for large parties or catering?",
    answer: "Yes! We specialize in large orders of wings, tenders, pizzas, and more for parties and events. We offer party trays of boneless buffalo tenders and bone-in wings with your choice of sauces. Call us at (508) 775-0612 to discuss your catering needs for wings and pizza in Hyannis."
  },
  {
    id: "11",
    question: "Do you take reservations?",
    answer: "We operate on a first-come, first-served basis and do not take reservations. However, we're happy to accommodate large groups - just give us a call ahead at (508) 775-0612 so we can prepare for your party."
  },
  {
    id: "12",
    question: "Can I get uncooked pizzas to bake at home?",
    answer: "Yes! We offer uncooked pizzas that you can take home and bake in your own oven. This way you can enjoy that fresh-from-the-oven Jack's pizza flavor at home whenever you want."
  },
  {
    id: "13",
    question: "Do you have a bar?",
    answer: "Yes! Jack's Lounge has a full bar with great cocktails, beer, and wine. We also offer happy hour food specials. It's a perfect spot to grab drinks with friends or watch the game."
  },
  {
    id: "14",
    question: "What payment methods do you accept?",
    answer: "We accept cash, all major credit cards (Visa, Mastercard, American Express, Discover), and debit cards. For online orders, you can pay securely through our ordering system."
  },
  {
    id: "15",
    question: "Is parking available?",
    answer: "Yes, we have parking available for our customers. We're conveniently located at 373 West Main Street in Hyannis with easy access and parking."
  },
  {
    id: "16",
    question: "How can I join the rewards program?",
    answer: "Simply order online through our website! When you create an account for online ordering, you're automatically enrolled in Jack's Lounge Rewards. Earn points with every order and redeem them for free food."
  }
];

export default function FAQ() {
  useEffect(() => {
    // Add FAQ schema markup for SEO
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Create or update script tag
    let scriptTag = document.getElementById('faq-schema') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'faq-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqSchema);

    // Cleanup on unmount
    return () => {
      const script = document.getElementById('faq-schema');
      if (script) {
        script.remove();
      }
    };
  }, []);

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
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-card border border-primary/30 text-foreground rounded-md hover-elevate active-elevate-2 font-medium"
              data-testid="button-contact-faq"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
