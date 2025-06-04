import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingForm } from "@/components/booking-form";
import { Brain, UserCheck, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type SessionType = "ai" | "human" | "group" | null;

export default function Booking() {
  const [selectedSession, setSelectedSession] = useState<SessionType>(null);
  const [showForm, setShowForm] = useState(false);

  const sessionTypes = [
    {
      id: "ai" as const,
      title: "AI-Assisted Guidance",
      description: "Personalized recommendations with AI support",
      price: "Free",
      icon: Brain,
      color: "bg-purple-100 text-purple-600",
      features: [
        "Instant personalized recommendations",
        "24/7 availability",
        "Evidence-based suggestions",
        "Progress tracking"
      ]
    },
    {
      id: "human" as const,
      title: "Human Therapist",
      description: "One-on-one session with certified professional",
      price: "$75/session",
      icon: UserCheck,
      color: "bg-primary/20 text-primary",
      features: [
        "Licensed wellness professional",
        "Personalized treatment plan",
        "45-minute sessions",
        "Follow-up support"
      ]
    },
    {
      id: "group" as const,
      title: "Group Session",
      description: "Guided meditation with small group",
      price: "$35/session",
      icon: Users,
      color: "bg-green-100 text-green-600",
      features: [
        "Small group setting (4-6 people)",
        "Guided by certified instructor",
        "60-minute sessions",
        "Community support"
      ]
    }
  ];

  if (showForm && selectedSession) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(false)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              Book a Wellness Consultant
            </h1>
          </div>

          <BookingForm 
            sessionType={selectedSession}
            onSuccess={() => {
              setShowForm(false);
              setSelectedSession(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Book Your Wellness Session
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a personalized consultation with our certified wellness professionals 
            or try our AI-powered guidance system
          </p>
        </div>

        {/* Session Types */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {sessionTypes.map((session) => {
            const IconComponent = session.icon;
            const isSelected = selectedSession === session.id;
            
            return (
              <Card 
                key={session.id}
                className={`wellness-card cursor-pointer transition-all ${
                  isSelected 
                    ? "ring-2 ring-primary border-primary" 
                    : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedSession(session.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${session.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground mb-1">
                          {session.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mb-2">
                          {session.description}
                        </p>
                        <div className="text-lg font-bold text-primary">
                          {session.price}
                        </div>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="session-type" 
                      checked={isSelected}
                      onChange={() => setSelectedSession(session.id)}
                      className="w-4 h-4 text-primary"
                    />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {session.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Therapist Showcase */}
        <Card className="wellness-card mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Meet Our Certified Therapists
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&h=200" 
                  alt="Dr. Sarah Johnson" 
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4" 
                />
                <h4 className="font-semibold text-foreground mb-1">Dr. Sarah Johnson</h4>
                <p className="text-sm text-muted-foreground mb-2">Licensed Therapist</p>
                <p className="text-xs text-muted-foreground">
                  10+ years in mindfulness and stress management
                </p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&h=200" 
                  alt="Dr. Michael Chen" 
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4" 
                />
                <h4 className="font-semibold text-foreground mb-1">Dr. Michael Chen</h4>
                <p className="text-sm text-muted-foreground mb-2">Sleep Specialist</p>
                <p className="text-xs text-muted-foreground">
                  Expert in sleep disorders and relaxation techniques
                </p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1594824405364-2a2c2c44a10e?auto=format&fit=crop&w=200&h=200" 
                  alt="Dr. Emily Rodriguez" 
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4" 
                />
                <h4 className="font-semibold text-foreground mb-1">Dr. Emily Rodriguez</h4>
                <p className="text-sm text-muted-foreground mb-2">Meditation Guide</p>
                <p className="text-xs text-muted-foreground">
                  Certified in various meditation and breathing techniques
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        {selectedSession && (
          <div className="text-center">
            <Button 
              size="lg" 
              className="wellness-button"
              onClick={() => setShowForm(true)}
            >
              Continue with {sessionTypes.find(s => s.id === selectedSession)?.title}
            </Button>
          </div>
        )}

        {!selectedSession && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Please select a session type to continue
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
