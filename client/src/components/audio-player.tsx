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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const duration = track.duration || 180; // Default 3 minutes if not provided
  
  // Demo audio player simulation
  const togglePlay = () => {
    if (isPlaying) {
      // Pause
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Play - simulate audio progress
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border", className)}>      
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 dark:text-white">{track.title}</h3>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={togglePlay}
            size="sm"
            variant="outline"
            className="w-10 h-10 rounded-full p-0"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <div className="flex-1 space-y-1">
            <Slider
              value={[currentTime]}
              onValueChange={handleSeek}
              max={duration}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-gray-500" />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-20"
          />
          <span className="text-xs text-gray-500 w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
}