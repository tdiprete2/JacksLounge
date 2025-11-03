import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const hours = [
  { day: "Sunday", hours: "12:00 PM - 9:30 PM" },
  { day: "Monday", hours: "11:00 AM - 10:00 PM" },
  { day: "Tuesday", hours: "11:00 AM - 9:30 PM" },
  { day: "Wednesday", hours: "11:00 AM - 10:30 PM" },
  { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
  { day: "Friday", hours: "11:00 AM - 10:00 PM" },
  { day: "Saturday", hours: "11:00 AM - 11:00 PM" },
];

export default function LocationHours() {
  return (
    <section id="location" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-location-title">
            Visit Us Today
          </h2>
          <p className="text-lg text-foreground/90 leading-relaxed mb-6 max-w-4xl mx-auto" data-testid="text-location-description">
            If you're looking for great food, friendly service, and a relaxed place to unwind, Jack's Lounge is your go-to spot. Visit us at <strong>373 West Main Street, Hyannis, MA 02601</strong>, where we've been serving the community for decades. Enjoy dine-in, takeout, or delivery—whichever works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.0!2d-70.2897!3d41.6532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89fb33c8a7d0d0d1%3A0x1234567890abcdef!2s373%20W%20Main%20St%2C%20Hyannis%2C%20MA%2002601!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Jack's Lounge Location"
              data-testid="iframe-map"
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-primary" size={24} />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=373%20W%20Main%20St%2C%20Hyannis%2C%20MA%2002601%2C%20USA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-primary transition-colors"
                  data-testid="link-address"
                >
                  373 West Main Street
                  <br />
                  Hyannis, MA 02601
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="text-primary" size={24} />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="tel:+15087750612"
                  className="text-lg hover:text-primary transition-colors block"
                  data-testid="link-phone"
                >
                  (508) 775-0612
                </a>
                <a
                  href="mailto:jackspizza@comcast.net"
                  className="text-lg hover:text-primary transition-colors block"
                  data-testid="link-email"
                >
                  jackspizza@comcast.net
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-primary" size={24} />
                  Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hours.map((schedule, index) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between text-base"
                      data-testid={`text-hours-${index}`}
                    >
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
