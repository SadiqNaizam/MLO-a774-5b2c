import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Share2, ListMusic, Shuffle, Repeat } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area'; // For lyrics or queue
import TrackListItem from './TrackListItem'; // Assuming TrackListItem is in the same directory or imported correctly

interface NowPlayingViewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentTrack?: {
    id: string;
    title: string;
    artist: string;
    albumName?: string;
    imageUrl: string;
    durationSeconds: number;
    lyrics?: string; // Optional lyrics
  };
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onSkipNext?: () => void;
  onSkipPrevious?: () => void;
  // Add other relevant props like queue, shuffle/repeat states, like status etc.
  queue?: Array<{ id: string; title: string; artist: string; duration: string; imageUrl?: string }>;
}

const NowPlayingView: React.FC<NowPlayingViewProps> = ({
  isOpen,
  onOpenChange,
  currentTrack,
  isPlaying,
  onPlayPause,
  onSkipNext,
  onSkipPrevious,
  queue = [],
}) => {
  console.log("Rendering NowPlayingView, isOpen:", isOpen, "track:", currentTrack?.title);

  if (!currentTrack) {
    // Or return a minimal sheet content if needed when no track but sheet is open
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] bg-gradient-to-b from-neutral-800 via-neutral-900 to-black text-white p-0 flex flex-col">
        <SheetHeader className="p-6 pb-2 text-left">
          {/* Can be used for a title like "Now Playing" or specific controls */}
           <div className="flex justify-between items-center">
            <SheetTitle className="text-lg font-semibold">{currentTrack.albumName || "Now Playing"}</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">&times;</Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-grow px-6">
          <div className="flex flex-col items-center space-y-6 mt-4">
            <AspectRatio ratio={1 / 1} className="w-full max-w-xs sm:max-w-sm rounded-lg overflow-hidden shadow-2xl">
              <img src={currentTrack.imageUrl} alt={currentTrack.title} className="object-cover w-full h-full" />
            </AspectRatio>

            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold">{currentTrack.title}</h2>
              <p className="text-lg text-neutral-300">{currentTrack.artist}</p>
            </div>

            {/* Placeholder for Progress Bar (could be duplicated from MusicPlayerBar or a new instance) */}
            <div className="w-full max-w-md">
              {/* TODO: Add Progress Slider here, similar to MusicPlayerBar */}
              <div className="h-2 bg-neutral-700 rounded-full my-2">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '60%' }}></div> {/* Example progress */}
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>2:30</span> {/* Example current time */}
                <span>{ Math.floor(currentTrack.durationSeconds / 60)}:{ (currentTrack.durationSeconds % 60).toString().padStart(2, '0') }</span>
              </div>
            </div>


            <div className="flex items-center justify-center space-x-4 sm:space-x-6 w-full max-w-md">
              <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-white" aria-label="Shuffle">
                <Shuffle size={20} />
              </Button>
              <Button variant="ghost" size="icon" onClick={onSkipPrevious} className="text-neutral-300 hover:text-white" aria-label="Previous">
                <SkipBack size={28} fill="currentColor" />
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={onPlayPause}
                className="bg-white text-black hover:bg-neutral-200 rounded-full w-16 h-16 p-2"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={onSkipNext} className="text-neutral-300 hover:text-white" aria-label="Next">
                <SkipForward size={28} fill="currentColor" />
              </Button>
              <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-white" aria-label="Repeat">
                <Repeat size={20} />
              </Button>
            </div>

            {/* Optional: Lyrics or Queue Section */}
            {queue.length > 0 && (
                <div className="w-full max-w-md mt-6">
                    <h3 className="text-lg font-semibold mb-2">Up Next</h3>
                    <div className="max-h-60 space-y-1"> {/* Contained scroll for queue */}
                        {queue.map((track, index) => (
                            <TrackListItem
                                key={track.id}
                                id={track.id}
                                title={track.title}
                                artist={track.artist}
                                duration={track.duration}
                                imageUrl={track.imageUrl}
                                trackNumber={index + 1}
                                onPlayPause={() => console.log("Play from queue:", track.id)} // Placeholder
                                isPlaying={false} // Example: not playing from queue directly
                            />
                        ))}
                    </div>
                </div>
            )}
            {currentTrack.lyrics && (
                 <div className="w-full max-w-md mt-6">
                    <h3 className="text-lg font-semibold mb-2">Lyrics</h3>
                    <p className="text-sm text-neutral-400 whitespace-pre-line leading-relaxed">{currentTrack.lyrics}</p>
                </div>
            )}

          </div>
        </ScrollArea>

        <SheetFooter className="p-6 border-t border-neutral-700/50 bg-black/30 backdrop-blur-sm">
          <div className="flex justify-around items-center w-full">
            <Button variant="ghost" className="text-neutral-300 hover:text-white flex flex-col items-center h-auto py-1">
                <Heart size={20} className="mb-1"/> <span className="text-xs">Like</span>
            </Button>
            <Button variant="ghost" className="text-neutral-300 hover:text-white flex flex-col items-center h-auto py-1">
                <Share2 size={20} className="mb-1"/> <span className="text-xs">Share</span>
            </Button>
             <Button variant="ghost" className="text-neutral-300 hover:text-white flex flex-col items-center h-auto py-1">
                <ListMusic size={20} className="mb-1"/> <span className="text-xs">Queue</span>
            </Button>
            {/* Add more controls like volume if not managed by main player bar when sheet is open */}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NowPlayingView;