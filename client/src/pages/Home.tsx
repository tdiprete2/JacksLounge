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
      title: "Best Pizza & Wings in Hyannis, MA | Jack's Lounge | Hot Honey Pizza",
      description: "Best pizza & wings in Hyannis! Signature hot honey pizza, crispy wings, BBQ ribs since 1963. Gluten-free options. Order delivery & pickup online!",
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
