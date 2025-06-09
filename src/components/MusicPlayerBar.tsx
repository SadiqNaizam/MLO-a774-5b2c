import React, { useState, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Heart, ListMusic } from 'lucide-react';
import { Link } from 'react-router-dom'; // For song/artist links

interface MusicPlayerBarProps {
  currentTrack?: {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    durationSeconds: number; // For slider max value
  };
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onSkipNext?: () => void;
  onSkipPrevious?: () => void;
  onSeek?: (value: number) => void; // Seek position in seconds
  onVolumeChange?: (value: number) => void;
  onToggleMute?: () => void;
  isMuted?: boolean;
  volumeLevel?: number; // 0-100
  currentTimeSeconds?: number; // Current playback time in seconds
  onOpenNowPlaying?: () => void; // To trigger NowPlayingView
  onLikeTrack?: (trackId: string) => void;
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  currentTrack,
  isPlaying = false,
  onPlayPause,
  onSkipNext,
  onSkipPrevious,
  onSeek,
  onVolumeChange,
  isMuted = false,
  onToggleMute,
  volumeLevel = 70,
  currentTimeSeconds = 0,
  onOpenNowPlaying,
  onLikeTrack,
}) => {
  console.log("Rendering MusicPlayerBar, track:", currentTrack?.title, "isPlaying:", isPlaying);

  const formatTime = (seconds: number): string => {
    const flooredSeconds = Math.floor(seconds);
    const Mins = Math.floor(flooredSeconds / 60);
    const Secs = flooredSeconds % 60;
    return `${Mins}:${Secs < 10 ? '0' : ''}${Secs}`;
  };

  const handleSeek = (value: number[]) => {
    onSeek?.(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    onVolumeChange?.(value[0]);
  };

  if (!currentTrack) {
    return (
      <footer className="bg-neutral-900 border-t border-neutral-800 p-3 flex items-center justify-center text-neutral-500 fixed bottom-0 left-0 right-0 h-[90px] z-50">
        No track selected.
      </footer>
    );
  }

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 p-3 flex items-center justify-between text-white fixed bottom-0 left-0 right-0 h-[90px] z-50">
      {/* Left: Track Info */}
      <div className="flex items-center space-x-3 w-1/4 min-w-[180px]">
        {currentTrack.imageUrl && (
          <AspectRatio ratio={1 / 1} className="w-14 h-14 rounded overflow-hidden">
            <img src={currentTrack.imageUrl} alt={currentTrack.title} className="object-cover w-full h-full" />
          </AspectRatio>
        )}
        <div>
          <Link to={`/track/${currentTrack.id}`} className="font-semibold text-sm hover:underline truncate block">{currentTrack.title}</Link>
          <Link to={`/artist/${currentTrack.artist}`} className="text-xs text-neutral-400 hover:underline truncate block">{currentTrack.artist}</Link>
        </div>
         {onLikeTrack && (
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-green-500 ml-2" onClick={() => onLikeTrack(currentTrack.id)}>
                <Heart size={18} />
            </Button>
        )}
      </div>

      {/* Center: Playback Controls & Progress */}
      <div className="flex flex-col items-center justify-center flex-grow max-w-xl">
        <div className="flex items-center space-x-3 mb-1">
          <Button variant="ghost" size="icon" onClick={onSkipPrevious} className="text-neutral-400 hover:text-white" aria-label="Previous Track">
            <SkipBack size={20} fill="currentColor" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onPlayPause}
            className="bg-white text-black hover:bg-neutral-200 rounded-full w-8 h-8 p-1.5 flex items-center justify-center"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onSkipNext} className="text-neutral-400 hover:text-white" aria-label="Next Track">
            <SkipForward size={20} fill="currentColor" />
          </Button>
        </div>
        <div className="flex items-center w-full space-x-2">
          <span className="text-xs text-neutral-400 w-10 text-right">{formatTime(currentTimeSeconds)}</span>
          <Slider
            defaultValue={[0]}
            value={[currentTimeSeconds]}
            max={currentTrack.durationSeconds}
            step={1}
            onValueChange={handleSeek}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child_span]:bg-green-500 [&>span:first-child_span]:h-1"
            aria-label="Track progress"
          />
          <span className="text-xs text-neutral-400 w-10 text-left">{formatTime(currentTrack.durationSeconds)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center space-x-3 w-1/4 justify-end min-w-[180px]">
         <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white" aria-label="Queue" onClick={onOpenNowPlaying}>
            <ListMusic size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onToggleMute} className="text-neutral-400 hover:text-white" aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted || volumeLevel === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
        <Slider
          defaultValue={[volumeLevel]}
          value={[volumeLevel]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 [&>span:first-child]:h-1 [&>span:first-child_span]:bg-white [&>span:first-child_span]:h-1"
          aria-label="Volume control"
        />
        {onOpenNowPlaying && (
          <Button variant="ghost" size="icon" onClick={onOpenNowPlaying} className="text-neutral-400 hover:text-white" aria-label="Now Playing View">
            <Maximize2 size={18} />
          </Button>
        )}
      </div>
    </footer>
  );
}

export default MusicPlayerBar;