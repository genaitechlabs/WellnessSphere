import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  track: {
    id: number;
    title: string;
    duration?: number;
    audioUrl?: string;
  };
  className?: string;
}

export function AudioPlayer({ track, className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  const duration = track.duration || 180; // Default 3 minutes if not provided
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // For demo purposes, we'll simulate playback since we don't have actual audio files
      audio.currentTime = currentTime;
      audio.play().catch(() => {
        // If no actual audio file, simulate playback
        simulatePlayback();
      });
    }
    setIsPlaying(!isPlaying);
  };

  const simulatePlayback = () => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) {
          setIsPlaying(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (isPlaying && !track.audioUrl) {
      const cleanup = simulatePlayback();
      return cleanup;
    }
  }, [isPlaying, duration, track.audioUrl]);

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("rounded-xl p-4", className)}>
      <audio 
        ref={audioRef} 
        src={track.audioUrl} 
        preload="metadata"
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm text-foreground">{track.title}</span>
          <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            size="sm"
            variant="default"
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-primary-foreground" />
            ) : (
              <Play className="h-4 w-4 text-primary-foreground ml-0.5" />
            )}
          </Button>
          
          <div className="flex-1 space-y-1">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleProgressChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
}
