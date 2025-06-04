import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/audio-player";
import { useQuery } from "@tanstack/react-query";
import { 
  Bath, 
  Moon, 
  Wind, 
  Play, 
  Clock,
  Heart,
  Brain,
  Leaf
} from "lucide-react";

export default function Mindfulness() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  
  const { data: soundTracks = [] } = useQuery({
    queryKey: ["/api/sound-tracks"],
  });

  const meditationTracks = soundTracks.filter(track => 
    track.category === "meditation" || track.category === "sleep"
  );

  const exercises = [
    {
      id: "guided-meditation",
      title: "Guided Meditation",
      description: "Expert-led meditation sessions for stress relief, focus, and emotional balance",
      icon: Bath,
      color: "bg-green-100 text-green-600",
      duration: "5-20 min",
      benefits: ["Reduces stress", "Improves focus", "Emotional balance"],
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&h=400"
    },
    {
      id: "sleep-stories",
      title: "Sleep Stories",
      description: "Calming bedtime stories and sleep meditations to help you drift off peacefully",
      icon: Moon,
      color: "bg-purple-100 text-purple-600",
      duration: "10-30 min",
      benefits: ["Better sleep", "Reduces anxiety", "Peaceful mind"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&h=400"
    },
    {
      id: "breathing-techniques",
      title: "Breathing Techniques",
      description: "Practice ancient breathing methods proven to reduce anxiety and improve mental clarity",
      icon: Wind,
      color: "bg-blue-100 text-blue-600",
      duration: "3-10 min",
      benefits: ["Instant calm", "Better focus", "Anxiety relief"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=400"
    }
  ];

  const breathingTechniques = [
    {
      name: "4-7-8 Breathing",
      description: "Inhale for 4, hold for 7, exhale for 8",
      duration: "5 minutes",
      difficulty: "Beginner"
    },
    {
      name: "Box Breathing",
      description: "Equal counts for inhale, hold, exhale, hold",
      duration: "10 minutes", 
      difficulty: "Intermediate"
    },
    {
      name: "Alternate Nostril",
      description: "Ancient pranayama technique for balance",
      duration: "15 minutes",
      difficulty: "Advanced"
    }
  ];

  const wellnessTips = [
    {
      icon: Heart,
      title: "Morning Gratitude",
      tip: "Start each day by acknowledging three things you're grateful for to set a positive tone"
    },
    {
      icon: Leaf,
      title: "Nature Connection",
      tip: "Spend at least 10 minutes outdoors daily to reduce stress and boost vitamin D"
    },
    {
      icon: Brain,
      title: "Mindful Moments",
      tip: "Take three conscious breaths before starting any new activity to center yourself"
    }
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Mindfulness Exercises
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guided practices for inner peace, focus, and emotional well-being through 
            meditation, breathing exercises, and calming sleep stories
          </p>
        </div>

        {/* Main Exercises Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {exercises.map((exercise) => {
            const IconComponent = exercise.icon;
            
            return (
              <Card key={exercise.id} className="wellness-card group hover:scale-105 transition-transform">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img 
                    src={exercise.image} 
                    alt={exercise.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Button
                    size="lg"
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
                    onClick={() => setActiveExercise(exercise.id)}
                  >
                    <Play className="h-6 w-6 text-white" />
                  </Button>
                </div>
                
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${exercise.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {exercise.title}
                      </CardTitle>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {exercise.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {exercise.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {exercise.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full wellness-button"
                    onClick={() => setActiveExercise(exercise.id)}
                  >
                    Begin Session
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Audio Tracks Section */}
        {meditationTracks.length > 0 && (
          <Card className="wellness-card mb-12">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                Guided Audio Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {meditationTracks.map((track) => (
                <AudioPlayer 
                  key={track.id}
                  track={track}
                  className="bg-accent/20"
                />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Breathing Techniques */}
        <Card className="wellness-card mb-12">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Wind className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Breathing Techniques
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Practice gratitude to cultivate a positive mindset
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {breathingTechniques.map((technique, index) => (
              <div key={index} className="bg-accent/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{technique.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {technique.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {technique.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Duration: {technique.duration}
                  </span>
                  <Button size="sm" variant="outline" className="rounded-full">
                    Start Practice
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="text-center mt-6">
              <Button className="wellness-button">
                View All Breathing Exercises
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Wellness Tips */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground text-center">
              Daily Wellness Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {wellnessTips.map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.tip}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
