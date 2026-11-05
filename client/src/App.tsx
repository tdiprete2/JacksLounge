import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import FloatingButtons from "@/components/FloatingButtons";
import { PATHS } from "@shared/site";
// Eager on purpose: direct menu visits hydrate the build-time content without
// waiting for another route chunk. Other pages remain split below.
import Menu from "@/pages/Menu";

// Lazy load pages for code splitting and better performance
const HomeLazy = lazy(() => import("@/pages/Home"));
const ContactLazy = lazy(() => import("@/pages/Contact"));
const StoryLazy = lazy(() => import("@/pages/Story"));
const SpecialsLazy = lazy(() => import("@/pages/Specials"));
const AdminLazy = lazy(() => import("@/pages/Admin"));
const FamousHoneyPizzaLazy = lazy(() => import("@/pages/FamousHoneyPizza"));
const PizzaLazy = lazy(() => import("@/pages/Pizza"));
const WingsLazy = lazy(() => import("@/pages/Wings"));
const NotFoundLazy = lazy(() => import("@/pages/not-found"));

// Wrapper components to work with wouter routing
const Home = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><HomeLazy /></Suspense>;
const Contact = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><ContactLazy /></Suspense>;
const Story = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><StoryLazy /></Suspense>;
const Specials = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><SpecialsLazy /></Suspense>;
const Admin = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><AdminLazy /></Suspense>;
const FamousHoneyPizza = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><FamousHoneyPizzaLazy /></Suspense>;
const Pizza = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><PizzaLazy /></Suspense>;
const Wings = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><WingsLazy /></Suspense>;
const NotFound = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><NotFoundLazy /></Suspense>;

// Check if admin route should be enabled (default: true for Replit, false for GitHub Pages)
const enableAdmin = import.meta.env.VITE_ENABLE_ADMIN !== "false";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router({ ssrPath }: { ssrPath?: string }) {
  return (
    <WouterRouter ssrPath={ssrPath}>
      <ScrollToTop />
      <Switch>
        <Route path={PATHS.home} component={Home} />
        <Route path={PATHS.menu} component={Menu} />
        <Route path={PATHS.pizza} component={Pizza} />
        <Route path={PATHS.wings} component={Wings} />
        <Route path={PATHS.contact} component={Contact} />
        <Route path={PATHS.story} component={Story} />
        <Route path={PATHS.specials} component={Specials} />
        <Route path={PATHS.honeyPizza} component={FamousHoneyPizza} />
        {enableAdmin && <Route path={PATHS.admin} component={Admin} />}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App({ ssrPath }: { ssrPath?: string }) {
  useEffect(() => {
    // Signal React has mounted — CSS hides the static hero placeholder
    document.body.classList.add('react-mounted');
    const timer = setTimeout(() => {
      const p = document.getElementById('hero-placeholder');
      if (p) p.remove();
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <FloatingButtons />
      <Router ssrPath={ssrPath} />
    </HelmetProvider>
  );
}

export default App;
