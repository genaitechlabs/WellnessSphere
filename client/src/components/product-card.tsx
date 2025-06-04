import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // price in cents
  category: string;
  imageUrl?: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/cart", {
        userId: 1, // Demo user ID
        productId: product.id,
        quantity: 1,
      });
    },
    onSuccess: () => {
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(0)}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "herbal-tea":
        return "bg-green-100 text-green-700";
      case "essential-oils":
        return "bg-purple-100 text-purple-700";
      case "sound-machine":
        return "bg-blue-100 text-blue-700";
      case "meditation":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "herbal-tea":
        return "Herbal Tea";
      case "essential-oils":
        return "Essential Oils";
      case "sound-machine":
        return "Sound Machine";
      case "meditation":
        return "Meditation";
      default:
        return category;
    }
  };

  return (
    <Card className={cn("wellness-card group hover:scale-105 transition-all", className)}>
      <div className="relative overflow-hidden rounded-t-2xl">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-accent flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-accent-foreground" />
          </div>
        )}
        
        <Badge 
          className={`absolute top-3 left-3 ${getCategoryColor(product.category)}`}
        >
          {getCategoryName(product.category)}
        </Badge>
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <Button 
            className="w-full wellness-button group"
            onClick={() => addToCartMutation.mutate()}
            disabled={!product.inStock || addToCartMutation.isPending}
          >
            {addToCartMutation.isPending ? (
              "Adding..."
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
