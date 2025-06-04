import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Leaf, 
  Menu, 
  X, 
  Home, 
  Music, 
  ShoppingBag, 
  Calendar, 
  Bath,
  ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onCartClick: () => void;
}

export function Navigation({ onCartClick }: NavigationProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: cartItems = [] } = useQuery({
    queryKey: ["/api/cart"],
  });

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/sound-therapy", label: "Sound Therapy", icon: Music },
    { href: "/mindfulness", label: "Mindfulness", icon: Bath },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/booking", label: "Book Session", icon: Calendar },
  ];

  const mobileNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/mindfulness", label: "Relax", icon: Bath },
    { href: "/booking", label: "Consult", icon: Calendar },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-primary">HealthyOwl</span>
              </div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={cn(
                    "font-medium transition-colors hover:text-primary cursor-pointer",
                    location === item.href ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </Link>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={onCartClick}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartItems.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div 
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer",
                        location === item.href 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-accent"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
              
              <div 
                className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer text-muted-foreground hover:bg-accent"
                onClick={() => {
                  onCartClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">
                  Cart {cartItems.length > 0 && `(${cartItems.length})`}
                </span>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex flex-col items-center py-2 px-3 transition-colors cursor-pointer",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  <IconComponent className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
          
          <div 
            className="flex flex-col items-center py-2 px-3 transition-colors cursor-pointer text-muted-foreground relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Cart</span>
            {cartItems.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
              >
                {cartItems.length}
              </Badge>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
