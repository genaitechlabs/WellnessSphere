import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioPlayer } from "@/components/audio-player";
import { useQuery } from "@tanstack/react-query";
import { Music, Waves, TreePine, Moon, Bath } from "lucide-react";

export default function SoundTherapy() {
  const { data: soundTracks = [], isLoading } = useQuery({
    queryKey: ["/api/sound-tracks"],
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "rain":
        return <Waves className="h-6 w-6" />;
      case "ocean":
        return <Waves className="h-6 w-6" />;
      case "forest":
        return <TreePine className="h-6 w-6" />;
      case "meditation":
        return <Bath className="h-6 w-6" />;
      case "sleep":
        return <Moon className="h-6 w-6" />;
      default:
        return <Music className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "rain":
        return "bg-blue-100 text-blue-600";
      case "ocean":
        return "bg-blue-100 text-blue-600";
      case "forest":
        return "bg-green-100 text-green-600";
      case "meditation":
        return "bg-purple-100 text-purple-600";
      case "sleep":
        return "bg-indigo-100 text-indigo-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getBackgroundColor = (category: string) => {
    switch (category) {
      case "rain":
        return "bg-blue-50";
      case "ocean":
        return "bg-blue-50";
      case "forest":
        return "bg-green-50";
      case "meditation":
        return "bg-purple-50";
      case "sleep":
        return "bg-indigo-50";
      default:
        return "bg-gray-50";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Sound Therapy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in healing soundscapes designed to promote deep relaxation, 
            better sleep, and enhanced focus through scientifically-backed audio therapy.
          </p>
        </div>

        {/* Sound Tracks Grid */}
        <div className="space-y-6">
          {soundTracks.map((track) => (
            <Card 
              key={track.id} 
              className={`wellness-card ${getBackgroundColor(track.category)}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getCategoryColor(track.category)}`}>
                      {getCategoryIcon(track.category)}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-foreground">
                        {track.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground capitalize">
                        {track.category} • {Math.floor((track.duration || 0) / 60)}:{((track.duration || 0) % 60).toString().padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {track.description}
                </p>
                
                <AudioPlayer 
                  track={track}
                  className="bg-background/60"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="wellness-card mt-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Benefits of Sound Therapy
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Better Sleep</h4>
                <p className="text-sm text-muted-foreground">
                  Calming sounds help regulate your sleep cycle and improve sleep quality
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bath className="h-8 w-8 text-accent-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Stress Relief</h4>
                <p className="text-sm text-muted-foreground">
                  Natural sounds reduce cortisol levels and promote deep relaxation
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-8 w-8 text-accent-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Enhanced Focus</h4>
                <p className="text-sm text-muted-foreground">
                  Background sounds mask distractions and improve concentration
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relaxing Sounds Section */}
        <Card className="wellness-card mt-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Relaxing Sounds</h3>
            <div className="space-y-3">
              <div className="bg-muted/50 rounded-xl p-3">
                <span className="text-sm text-foreground">Nature Sounds Collection</span>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <span className="text-sm text-foreground">Meditation Frequencies</span>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <span className="text-sm text-foreground">Sleep Soundscapes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
