import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Filter } from "lucide-react";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["/api/products"],
  });

  const categories = [
    { id: "all", name: "All Products" },
    { id: "herbal-tea", name: "Herbal Teas" },
    { id: "essential-oils", name: "Essential Oils" },
    { id: "sound-machine", name: "Sound Machines" },
    { id: "meditation", name: "Meditation" },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Wellness Shop
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully curated products combining science-backed solutions with traditional wellness wisdom
          </p>
        </div>

        {/* Category Filter */}
        <Card className="wellness-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Filter by Category</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="wellness-card">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category or check back later for new products.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Wellness Benefits Section */}
        <Card className="wellness-card mt-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Why Choose Our Wellness Products?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-accent-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Curated Selection</h4>
                <p className="text-sm text-muted-foreground">
                  Every product is carefully selected and tested by our wellness experts
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent-foreground">🌿</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Natural & Organic</h4>
                <p className="text-sm text-muted-foreground">
                  Premium organic ingredients sourced from sustainable suppliers
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent-foreground">🧪</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Science-Backed</h4>
                <p className="text-sm text-muted-foreground">
                  All products are supported by scientific research and traditional knowledge
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need help choosing the right products for your wellness journey?
          </p>
          <Button size="lg" className="wellness-button">
            Get Personalized Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
}
