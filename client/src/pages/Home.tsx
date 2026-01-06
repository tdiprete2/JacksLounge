import { useEffect } from "react";
import { updateMetaTags } from "@/utils/seo";
import Header from "@/components/Header";
import FeaturedItems from "@/components/FeaturedItems";
import WelcomeHero from "@/components/WelcomeHero";
import ItalianFavorites from "@/components/ItalianFavorites";
import OrderFromWebsite from "@/components/OrderFromWebsite";
import FoodGallery from "@/components/FoodGallery";
import EventOrders from "@/components/EventOrders";
import NeighborhoodSpot from "@/components/NeighborhoodSpot";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import RewardsSection from "@/components/RewardsSection";
import LocationHours from "@/components/LocationHours";
import OnlineOrdering from "@/components/OnlineOrdering";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    updateMetaTags({
      title: "Jack's Lounge | Best Honey Pizza & Wings in Hyannis, MA",
      description: "Taste the original Honey Pizza at Jack's Lounge! Serving Hyannis since 1963 with the best wings, BBQ ribs & Italian favorites. Order online for fast delivery.",
      canonical: "https://www.jackspizzahyannis.com/",
      ogUrl: "https://www.jackspizzahyannis.com/"
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <WelcomeHero />
        <FeaturedItems />
        <ItalianFavorites />
        <OrderFromWebsite />
        <FoodGallery />
        <EventOrders />
        <NeighborhoodSpot />
        <Testimonials />
        <FAQ />
        <Features />
        <RewardsSection />
        <LocationHours />
        <OnlineOrdering />
      </main>
      <Footer />
    </div>
  );
}
