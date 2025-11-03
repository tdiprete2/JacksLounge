import Header from "@/components/Header";
import FeaturedItems from "@/components/FeaturedItems";
import WelcomeHero from "@/components/WelcomeHero";
import ItalianFavorites from "@/components/ItalianFavorites";
import OrderFromWebsite from "@/components/OrderFromWebsite";
import FoodGallery from "@/components/FoodGallery";
import EventOrders from "@/components/EventOrders";
import NeighborhoodSpot from "@/components/NeighborhoodSpot";
import VisitUs from "@/components/VisitUs";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import RewardsSection from "@/components/RewardsSection";
import LocationHours from "@/components/LocationHours";
import OnlineOrdering from "@/components/OnlineOrdering";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <FeaturedItems />
        <WelcomeHero />
        <ItalianFavorites />
        <OrderFromWebsite />
        <FoodGallery />
        <EventOrders />
        <NeighborhoodSpot />
        <VisitUs />
        <Testimonials />
        <Features />
        <RewardsSection />
        <LocationHours />
        <OnlineOrdering />
      </main>
      <Footer />
    </div>
  );
}
