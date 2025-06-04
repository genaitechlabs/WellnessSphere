import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart as ShoppingCartIcon, Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  inStock: boolean;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
    enabled: isOpen,
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: number) => {
      return apiRequest("DELETE", `/api/cart/${itemId}`);
    },
    onSuccess: () => {
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  // Get cart items with product details
  const cartWithProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
    };
  }).filter(item => item.product);

  const total = cartWithProducts.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout functionality would be implemented here.",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCartIcon className="h-5 w-5" />
            Shopping Cart
            {cartItems.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {cartItems.length}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {cartWithProducts.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCartIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add some wellness products to get started
                </p>
                <Button onClick={onClose} className="wellness-button">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartWithProducts.map((item) => (
                  <Card key={item.id} className="p-4">
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-4">
                        {item.product?.imageUrl ? (
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center">
                            <ShoppingCartIcon className="h-6 w-6 text-accent-foreground" />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {item.product?.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.product?.price || 0)}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-foreground">
                            {formatPrice((item.product?.price || 0) * item.quantity)}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive/90 mt-1"
                            onClick={() => removeFromCartMutation.mutate(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {cartWithProducts.length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => clearCartMutation.mutate()}
                  disabled={clearCartMutation.isPending}
                >
                  Clear Cart
                </Button>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-2xl font-bold text-foreground">
                    {formatPrice(total)}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full wellness-button" 
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
