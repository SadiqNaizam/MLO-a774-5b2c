import React, { useState } from 'react';
import NowPlayingViewComponent from '@/components/NowPlayingView'; // The custom component
// This page mainly serves to display the NowPlayingView component in a "full page" manner or as a dedicated route.
// In a typical app, NowPlayingView might be a global sheet/modal controlled by app state.

const placeholderTrack = {
  id: 'np_page_track',
  title: 'Doraemon\'s Pocket Symphony',
  artist: 'The Gadgeteers',
  albumName: '22nd Century Classics',
  imageUrl: 'https://picsum.photos/seed/dora_np_page/600', // Larger image for this view
  durationSeconds: 280,
  lyrics: "In a world of future dreams,\nWith gadgets, joy it seems.\nA blue cat, a magic door,\nAdventures we explore!",
};

const placeholderQueue = [
  { id: 'q_np1', title: 'Time Machine Shuffle', artist: 'The Chrononauts', duration: '3:10', imageUrl: 'https://picsum.photos/seed/dora_q_np1/100' },
  { id: 'q_np2', title: 'Big Light Anthem', artist: 'Mini Dora Band', duration: '2:55', imageUrl: 'https://picsum.photos/seed/dora_q_np2/100' },
  { id: 'q_np3', title: 'Memory Bread Ballad', artist: 'Gian (Karaoke Version)', duration: '4:00', imageUrl: 'https://picsum.photos/seed/dora_q_np3/100' },
];


const NowPlayingPage = () => {
  console.log('NowPlayingPage loaded');
  // For a dedicated page, the NowPlayingView might always be "open".
  // onOpenChange could navigate away or be a no-op if it's a dedicated route.
  const [isOpen, setIsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    // If !open, perhaps navigate back or to home:
    // if (!open) navigate('/'); // Assuming navigate from react-router-dom is available
    console.log('NowPlayingView open state (from page):', open);
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
    console.log('NowPlayingView play/pause (from page)');
  };
  
  const handleSkipNext = () => console.log('NowPlayingView skip next (from page)');
  const handleSkipPrevious = () => console.log('NowPlayingView skip previous (from page)');

  return (
    // This page might not need Sidebar/Header if NowPlayingView is meant to be fully immersive.
    // Or it could be wrapped in the standard layout, and NowPlayingView acts as a modal ON this page.
    // Given the prompt for NowPlayingView to use Sheet/Dialog, it's likely an overlay.
    // Here, we'll render it as the primary content of this "page" route.
    <div className="bg-black h-screen w-screen fixed inset-0 z-[100]"> {/* Ensure it covers everything */}
       <NowPlayingViewComponent
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        currentTrack={placeholderTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onSkipNext={handleSkipNext}
        onSkipPrevious={handleSkipPrevious}
        queue={placeholderQueue}
      />
       {/* Message for when the sheet is closed, if it's the only content of the page */}
      {!isOpen && (
        <div className="flex items-center justify-center h-full text-white">
          <p>Now Playing view is closed. <button onClick={() => setIsOpen(true)} className="text-green-400 underline">Re-open</button></p>
        </div>
      )}
    </div>
  );
};

export default NowPlayingPage;