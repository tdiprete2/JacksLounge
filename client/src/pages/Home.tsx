import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedItems from "@/components/FeaturedItems";
import ItalianFavorites from "@/components/ItalianFavorites";
import OrderFromWebsite from "@/components/OrderFromWebsite";
import FoodGallery from "@/components/FoodGallery";
import ContactForm from "@/components/ContactForm";
import NeighborhoodSpot from "@/components/NeighborhoodSpot";
import LocationHours from "@/components/LocationHours";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import AboutSection from "@/components/AboutSection";
import OnlineOrdering from "@/components/OnlineOrdering";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedItems />
        <ItalianFavorites />
        <OrderFromWebsite />
        <FoodGallery />
        <ContactForm />
        <NeighborhoodSpot />
        <LocationHours />
        <Testimonials />
        <Features />
        <AboutSection />
        <OnlineOrdering />
      </main>
      <Footer />
    </div>
  );
}
