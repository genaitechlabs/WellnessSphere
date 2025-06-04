import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AudioPlayer } from "@/components/audio-player";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Play, 
  Brain, 
  Bath, 
  UserCheck, 
  Leaf, 
  Wind,
  Heart,
  Lightbulb,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  const { data: soundTracks = [] } = useQuery({
    queryKey: ["/api/sound-tracks"],
  });

  const featuredProducts = products.slice(0, 3);
  const featuredSoundTrack = soundTracks.find(track => track.category === "rain");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-2xl font-bold text-primary">HealthyOwl</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Good afternoon
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Your mind & body wellness ecosystem, blending modern neuroscience, 
                  AI, and ancient healing knowledge to help you achieve better sleep, 
                  relaxation, and focus.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="wellness-button">
                    Get Started
                  </Button>
                </Link>
                <Link href="/sound-therapy">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Explore Services
                  </Button>
                </Link>
              </div>

              {/* Wellness Tip Card */}
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Wellness tip</h3>
                      <p className="text-sm text-muted-foreground">
                        Take deep breaths to relax your body and mind. Try the 4-7-8 breathing technique for better sleep quality.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=600" 
                alt="Peaceful meditation scene" 
                className="rounded-2xl shadow-lg w-full h-auto" 
              />
              
              {/* Floating cards */}
              <Card className="absolute -bottom-6 -left-6 p-4 shadow-lg border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">AI Recommendations</div>
                    <div className="text-xs text-muted-foreground">Personalized for you</div>
                  </div>
                </div>
              </Card>

              <Card className="absolute -top-6 -right-6 p-4 shadow-lg border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">10,000+</div>
                    <div className="text-xs text-muted-foreground">Happy users</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Wellness Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive wellness solutions combining ancient wisdom with modern science
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sound Therapy */}
            <Card className="wellness-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <Play className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Sound Therapy</h3>
              <p className="text-muted-foreground mb-6">
                Immerse yourself in healing frequencies, rain sounds, and sleep music scientifically proven to reduce stress.
              </p>
              
              {featuredSoundTrack && (
                <div className="mb-4">
                  <AudioPlayer 
                    track={featuredSoundTrack}
                    className="bg-accent/20"
                  />
                </div>
              )}
              
              <Link href="/sound-therapy">
                <Button className="w-full wellness-button">
                  Explore Sounds
                </Button>
              </Link>
            </Card>

            {/* AI Consultation */}
            <Card className="wellness-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI-Assisted Therapy</h3>
              <p className="text-muted-foreground mb-6">
                Get personalized wellness recommendations powered by advanced AI and validated by certified therapists.
              </p>
              
              <Card className="bg-accent/20 p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="text-sm text-foreground">
                    <p>"Based on your sleep patterns, I recommend 10 minutes of evening meditation."</p>
                  </div>
                </div>
              </Card>
              
              <Link href="/booking">
                <Button className="w-full wellness-button">
                  Start AI Session
                </Button>
              </Link>
            </Card>

            {/* Mindfulness Exercises */}
            <Card className="wellness-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <Bath className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Guided Meditation</h3>
              <p className="text-muted-foreground mb-6">
                Access hundreds of guided meditations for stress relief, better sleep, and enhanced focus.
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground">Morning Mindfulness</span>
                  <span className="text-muted-foreground">5 min</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground">Evening Relaxation</span>
                  <span className="text-muted-foreground">10 min</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground">Focus Booster</span>
                  <span className="text-muted-foreground">15 min</span>
                </div>
              </div>
              
              <Link href="/mindfulness">
                <Button className="w-full wellness-button">
                  Start Meditation
                </Button>
              </Link>
            </Card>

            {/* Human Consultation */}
            <Card className="wellness-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <UserCheck className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Book a Wellness Consultant</h3>
              <p className="text-muted-foreground mb-6">
                Connect with certified wellness professionals for personalized one-on-one sessions.
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-xl">
                  <div className="w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <span className="font-medium text-sm">AI-Assisted Guidance</span>
                    <p className="text-xs text-muted-foreground">Personalized recommendations</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-xl">
                  <div className="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center">
                    <UserCheck className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="font-medium text-sm">Talk to a Human Therapist</span>
                    <p className="text-xs text-muted-foreground">Professional consultation</p>
                  </div>
                </div>
              </div>
              
              <Link href="/booking">
                <Button className="w-full wellness-button">
                  Book Session
                </Button>
              </Link>
            </Card>

            {/* Essential Oils */}
            <Card className="wellness-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Natural Remedies</h3>
              <p className="text-muted-foreground mb-6">
                Discover carefully curated essential oils and herbal remedies backed by traditional knowledge.
              </p>
              
              <img 
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=300&h=150" 
                alt="Essential oil bottles with herbs" 
                className="w-full h-24 object-cover rounded-xl mb-4" 
              />
              
              <Link href="/shop">
                <Button className="w-full wellness-button">
                  Shop Remedies
                </Button>
              </Link>
            </Card>

            {/* Breathing Techniques */}
            <Card className="wellness-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <Wind className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Breathing Techniques</h3>
              <p className="text-muted-foreground mb-6">
                Practice ancient breathing methods proven to reduce anxiety and improve mental clarity.
              </p>
              
              <Card className="bg-accent/20 p-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">4-7-8</div>
                  <div className="text-sm text-muted-foreground">Inhale - Hold - Exhale</div>
                </div>
              </Card>
              
              <Link href="/mindfulness">
                <Button className="w-full wellness-button">
                  Start Breathing
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-16 bg-accent/5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Shop
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated wellness products combining science-backed solutions with traditional wisdom
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className="bg-accent/20"
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="wellness-button">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
