import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load pages for code splitting and better performance
const HomeLazy = lazy(() => import("@/pages/Home"));
const MenuLazy = lazy(() => import("@/pages/Menu"));
const ContactLazy = lazy(() => import("@/pages/Contact"));
const StoryLazy = lazy(() => import("@/pages/Story"));
const AdminLazy = lazy(() => import("@/pages/Admin"));
const NotFoundLazy = lazy(() => import("@/pages/not-found"));

// Wrapper components to work with wouter routing
const Home = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><HomeLazy /></Suspense>;
const Menu = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><MenuLazy /></Suspense>;
const Contact = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><ContactLazy /></Suspense>;
const Story = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><StoryLazy /></Suspense>;
const Admin = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><AdminLazy /></Suspense>;
const NotFound = () => <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}><NotFoundLazy /></Suspense>;

// Get base path from environment or use root
const base = import.meta.env.BASE_URL || "/";

// Check if admin route should be enabled (default: true for Replit, false for GitHub Pages)
const enableAdmin = import.meta.env.VITE_ENABLE_ADMIN !== "false";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <WouterRouter base={base}>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/contact" component={Contact} />
        <Route path="/story" component={Story} />
        {enableAdmin && <Route path="/admin" component={Admin} />}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
