import { useEffect } from "react";
import { updateMetaTags } from "@/utils/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook } from "lucide-react";

// Extend Window interface for Facebook SDK
declare global {
  interface Window {
    FB?: {
      XFBML?: {
        parse: () => void;
      };
    };
    fbAsyncInit?: () => void;
  }
}

export default function Specials() {
  useEffect(() => {
    updateMetaTags({
      title: "Daily Specials & Updates | Jack's Lounge - Hyannis MA",
      description: "Check out Jack's Lounge latest daily specials, promotions, and updates. Follow our Facebook feed for the freshest news on pizza deals, wing specials, and events in Hyannis MA.",
      canonical: "https://www.jackspizzahyannis.com/specials/",
      ogTitle: "Daily Specials & Updates | Jack's Lounge",
      ogDescription: "Check out Jack's Lounge latest daily specials, promotions, and updates. Fresh pizza deals, wing specials, and events in Hyannis MA.",
      ogUrl: "https://www.jackspizzahyannis.com/specials/"
    });

    // Track elements injected by this component so we can clean them up
    let injectedFbRoot: HTMLDivElement | null = null;
    let injectedScript: HTMLScriptElement | null = null;

    // Ensure fb-root div exists (required by the Facebook SDK)
    if (!document.getElementById('fb-root')) {
      injectedFbRoot = document.createElement('div');
      injectedFbRoot.id = 'fb-root';
      document.body.insertBefore(injectedFbRoot, document.body.firstChild);
    }

    const parseFacebookPlugin = () => {
      if (window.FB?.XFBML) {
        window.FB.XFBML.parse();
      }
    };

    if (window.FB) {
      // SDK already loaded from a previous visit to this page
      parseFacebookPlugin();
    } else {
      // Chain fbAsyncInit so we don't overwrite any existing handler
      const prevInit = window.fbAsyncInit;
      window.fbAsyncInit = function() {
        if (prevInit) prevInit();
        parseFacebookPlugin();
      };

      // Inject the SDK script only once per page session
      if (!document.querySelector('script[src*="connect.facebook.net"]')) {
        injectedScript = document.createElement('script');
        injectedScript.async = true;
        injectedScript.defer = true;
        injectedScript.crossOrigin = 'anonymous';
        injectedScript.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
        document.body.appendChild(injectedScript);
      }
    }

    return () => {
      // Clean up elements injected by this component on unmount
      if (injectedFbRoot && injectedFbRoot.parentNode) {
        injectedFbRoot.parentNode.removeChild(injectedFbRoot);
      }
      if (injectedScript && injectedScript.parentNode) {
        injectedScript.parentNode.removeChild(injectedScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1" id="main-content">
        {/* Hero Section */}
        <section className="bg-card py-16 md:py-24 px-4 md:px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-specials-title">
              Updates & Specials
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Stay up to date with our latest daily specials, promotions, and restaurant news. Follow our Facebook feed below for the freshest updates!
            </p>
          </div>
        </section>

        {/* Facebook Feed Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction Card */}
            <Card className="p-8 md:p-10 mb-12">
              <p className="text-base md:text-lg leading-relaxed text-foreground text-center mb-6" data-testid="text-specials-intro">
                We post daily specials, seasonal promotions, and restaurant updates on our Facebook page. Check back often to see what's new at Jack's Lounge!
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  asChild
                  data-testid="button-facebook-external"
                >
                  <a
                    href="https://www.facebook.com/jacksloungehyannis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Facebook size={20} />
                    View on Facebook
                  </a>
                </Button>
              </div>
            </Card>

            {/* Facebook Page Plugin */}
            <div className="flex justify-center" data-testid="container-facebook-feed">
              <div className="w-full max-w-2xl">
                <Card className="p-4 md:p-6">
                  <div 
                    className="fb-page" 
                    data-href="https://www.facebook.com/jacksloungehyannis"
                    data-tabs="timeline"
                    data-width="500"
                    data-height="800"
                    data-small-header="false"
                    data-adapt-container-width="true"
                    data-hide-cover="false"
                    data-show-facepile="true"
                  >
                    <blockquote 
                      cite="https://www.facebook.com/jacksloungehyannis" 
                      className="fb-xfbml-parse-ignore"
                    >
                      <a href="https://www.facebook.com/jacksloungehyannis">Jack&#039;s Lounge</a>
                    </blockquote>
                  </div>
                </Card>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-12">
              <p className="text-base text-muted-foreground">
                Don't see the feed? Make sure you have JavaScript enabled or{" "}
                <a 
                  href="https://www.facebook.com/jacksloungehyannis" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  data-testid="link-facebook-fallback"
                >
                  visit our Facebook page directly
                </a>.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
