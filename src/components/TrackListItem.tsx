import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, MoreHorizontal, Heart, CheckCircle } from 'lucide-react'; // Added CheckCircle for playing state

interface TrackListItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string; // Optional album name
  duration: string; // e.g., "3:45"
  imageUrl?: string; // Optional small cover art
  trackNumber?: number | string; // Optional track number
  isPlaying?: boolean;
  isCurrentTrack?: boolean; // To highlight the currently selected/playing track
  onPlayPause: (id: string | number) => void;
  onLike?: (id: string | number) => void;
  // Add more actions like add to queue, add to playlist via context menu
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  id,
  title,
  artist,
  album,
  duration,
  imageUrl,
  trackNumber,
  isPlaying = false,
  isCurrentTrack = false,
  onPlayPause,
  onLike,
}) => {
  console.log("Rendering TrackListItem:", title, "isPlaying:", isPlaying);

  const handlePlayPauseClick = () => {
    onPlayPause(id);
  };

  const handleLikeClick = () => {
    onLike?.(id);
    console.log("Liked track:", title);
  };

  return (
    <div
      className={`flex items-center p-2 space-x-3 hover:bg-neutral-700/50 rounded-md group ${
        isCurrentTrack ? 'bg-neutral-700/70 text-green-400' : 'text-neutral-300'
      }`}
      role="button"
      tabIndex={0}
      onClick={handlePlayPauseClick} // Allow clicking whole item to play/pause
      onKeyDown={(e) => e.key === 'Enter' && handlePlayPauseClick()}
    >
      <div className="w-8 text-center text-sm text-neutral-400 group-hover:hidden">
        {trackNumber || <Play size={16} className={`text-neutral-300 ${isCurrentTrack && !isPlaying ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`} />}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={`w-8 h-8 p-0 hidden group-hover:flex items-center justify-center ${isCurrentTrack && isPlaying ? 'flex' : ''}`}
        onClick={(e) => { e.stopPropagation(); handlePlayPauseClick(); }} // Prevent outer click if button used
        aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
      >
        {isPlaying ? <Pause size={16} fill="currentColor" className="text-green-400" /> : <Play size={16} className="text-neutral-300" />}
      </Button>

      {imageUrl && (
        <img src={imageUrl} alt={album || title} className="w-10 h-10 rounded object-cover" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${isCurrentTrack ? 'text-green-400' : 'text-white'}`}>{title}</p>
        <p className="text-xs text-neutral-400 truncate">{artist}</p>
      </div>
      {album && <p className="text-xs text-neutral-400 truncate hidden md:block w-1/4">{album}</p>}
      {onLike && (
         <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleLikeClick(); }} className="text-neutral-400 hover:text-green-400" aria-label="Like song">
            <Heart size={16} />
         </Button>
      )}
      <p className="text-xs text-neutral-400 w-12 text-right">{duration}</p>
      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} className="text-neutral-400 hover:text-white" aria-label="More options">
        <MoreHorizontal size={16} />
      </Button>
    </div>
  );
}

export default TrackListItem;