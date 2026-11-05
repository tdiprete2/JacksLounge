import { useEffect, useState } from "react";
import { updateMetaTags } from "@/utils/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import FormProviders from "@/components/FormProviders";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactRequestSchema, type InsertContactRequest } from "@shared/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = insertContactRequestSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  website: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HOURS, SITE } from "@shared/site";

const scheduleLabels = {
  dineIn: "Dine-in",
  takeout: "Takeout",
  delivery: "Delivery",
} as const;

function DeferredMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  if (!mapLoaded) {
    return (
      <div className="aspect-video rounded-lg overflow-hidden mb-6 relative group">
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <Button
            onClick={() => setMapLoaded(true)}
            size="lg"
            data-testid="button-load-map"
            className="gap-2"
          >
            <MapPin className="w-5 h-5" />
            Load Interactive Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden mb-6">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.4687876!2d-70.2962!3d41.6532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDM5JzExLjUiTiA3MMKwMTcnNDYuMyJX!5e0!3m2!1sen!2sus!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Jack's Lounge Location"
        data-testid="map-embed"
      />
    </div>
  );
}

export default function Contact() {
  return <FormProviders><ContactPage /></FormProviders>;
}

function ContactPage() {
  const { toast } = useToast();

  useEffect(() => {
    updateMetaTags({
      title: "Contact Jack's Lounge Hyannis MA | Hours, Location, Phone",
      description: "Contact Jack's Lounge in Hyannis MA at 373 West Main Street. Call 508-775-0612 for orders, party trays, large orders, hours, directions, or questions.",
      canonical: "https://www.jackspizzahyannis.com/contact/",
      ogTitle: "Contact Jack's Lounge - Hyannis MA Pizza & Italian Restaurant",
      ogDescription: "Get in touch with Jack's Lounge in Hyannis. Call, email, or visit us at 373 West Main Street for the best pizza and Italian food on Cape Cod.",
      ogUrl: "https://www.jackspizzahyannis.com/contact/"
    });
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
      website: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: InsertContactRequest) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-card">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-contact-hero-title">
              Contact Jack's Lounge Hyannis
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
              Have questions about our menu, want to place a large order, or just want to say hello? 
              We'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="p-6 hover-elevate">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <a 
                    href="tel:+15087750612" 
                    className="text-foreground/70 hover:text-primary transition-colors"
                    data-testid="link-phone"
                  >
                    (508) 775-0612
                  </a>
                </div>
              </Card>

              <Card className="p-6 hover-elevate">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <a 
                    href="mailto:jackspizza@comcast.net" 
                    className="text-foreground/70 hover:text-primary transition-colors break-all"
                    data-testid="link-email"
                  >
                    jackspizza@comcast.net
                  </a>
                </div>
              </Card>

              <Card className="p-6 hover-elevate">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <a 
                    href="https://maps.google.com/?q=373+West+Main+Street,+Hyannis,+MA+02601"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-primary transition-colors"
                    data-testid="link-address"
                  >
                    373 West Main Street<br />
                    Hyannis, MA 02601
                  </a>
                </div>
              </Card>

              <Card className="p-6 hover-elevate">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Hours</h3>
                   <p className="text-sm text-foreground/70">
                     Dine-in, takeout, and delivery have separate closing times. See all schedules below.
                   </p>
                </div>
              </Card>
            </div>

             <section className="mb-16" aria-labelledby="service-hours-title">
               <h2 id="service-hours-title" className="font-serif text-3xl md:text-4xl font-bold text-center mb-8">
                 Hours by Service
               </h2>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {(Object.keys(scheduleLabels) as Array<keyof typeof scheduleLabels>).map((service) => (
                   <Card key={service} className="p-6">
                     <h3 className="text-xl font-semibold mb-4">{scheduleLabels[service]}</h3>
                     <dl className="space-y-2 text-sm">
                       {HOURS[service].map(({ day, open, close }) => (
                         <div key={day} className="flex justify-between gap-4">
                           <dt className="font-medium">{day}</dt>
                           <dd className="text-foreground/70 text-right">{open}–{close}</dd>
                         </div>
                       ))}
                     </dl>
                   </Card>
                 ))}
               </div>
               <p className="text-center text-sm text-foreground/60 mt-4">
                 Holiday hours may vary. Please call {SITE.phoneDisplay} to confirm.
               </p>
             </section>

             {/* Contact Form and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-form-title">
                  Send Us a Message
                </h2>
                <p className="text-foreground/70 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem className="hidden" aria-hidden="true">
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ""}
                              tabIndex={-1}
                              autoComplete="off"
                              data-testid="input-website"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                required
                                aria-required="true"
                                maxLength={80}
                                autoComplete="given-name"
                                data-testid="input-first-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                maxLength={80}
                                autoComplete="family-name"
                                data-testid="input-last-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                              <Input
                                type="email"
                                {...field}
                                required
                                aria-required="true"
                                maxLength={254}
                                autoComplete="email"
                                data-testid="input-email"
                              />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                maxLength={120}
                                autoComplete="organization"
                                data-testid="input-company"
                              />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                              <Textarea
                                {...field}
                                required
                                aria-required="true"
                                maxLength={4000}
                                autoComplete="off"
                                className="min-h-40"
                                data-testid="input-message"
                              />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full" 
                      data-testid="button-submit"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Map and Social */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-location-title">
                    Visit Us
                  </h2>
                  <DeferredMap />
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <a
                       href={SITE.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-directions"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </div>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                  <p className="text-foreground/70 mb-6">
                    Follow us on social media for daily specials, updates, and more!
                  </p>
                  <div className="space-y-3">
                    <Button
                      asChild
                      size="lg"
                      className="w-full"
                    >
                      <a
                        href="https://www.facebook.com/jacksloungehyannis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2"
                        data-testid="button-facebook"
                      >
                        <Facebook className="w-5 h-5" />
                        Visit Our Facebook Page
                      </a>
                    </Button>
                    
                    <Button
                      asChild
                      size="lg"
                      className="w-full"
                    >
                      <a
                        href="https://www.instagram.com/jackspizzahyannis/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2"
                        data-testid="button-instagram"
                      >
                        <SiInstagram className="w-5 h-5" />
                        Follow Us on Instagram
                      </a>
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5">
                  <h3 className="text-xl font-semibold mb-4">Large Orders & Events</h3>
                  <p className="text-foreground/70 mb-4">
                    Planning a party or event? We offer discounts for large orders and special Party Pizzas. 
                    Call us at (508) 775-0612 for the quickest response.
                  </p>
                  <p className="text-sm text-foreground/60">
                    We specialize in wings, tenders, salads, and specialty trays. We do not offer full catering services.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
