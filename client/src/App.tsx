import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { ShoppingCart } from "@/components/shopping-cart";
import Home from "@/pages/home";
import SoundTherapy from "@/pages/sound-therapy";
import Shop from "@/pages/shop";
import Booking from "@/pages/booking";
import Mindfulness from "@/pages/mindfulness";
import NotFound from "@/pages/not-found";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sound-therapy" component={SoundTherapy} />
      <Route path="/shop" component={Shop} />
      <Route path="/booking" component={Booking} />
      <Route path="/mindfulness" component={Mindfulness} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation onCartClick={() => setIsCartOpen(true)} />
          <main className="pb-20 md:pb-0">
            <Router />
          </main>
          <ShoppingCart 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
          />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
