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
      title: "Jack's Lounge | Hyannis, MA Pizza, Ribs & Italian Food | Order Online",
      description: "Jack's Lounge in Hyannis, MA - 60+ years serving signature honey-topped pizzas, BBQ ribs, wings & Italian favorites. Family-owned restaurant with dine-in, takeout & delivery.",
      canonical: "https://jackspizzahyannis.com/",
      ogUrl: "https://jackspizzahyannis.com/"
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
