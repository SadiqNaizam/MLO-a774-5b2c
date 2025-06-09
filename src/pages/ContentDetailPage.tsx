import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import TrackListItem from '@/components/TrackListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Play, Shuffle, Heart, PlusCircle } from 'lucide-react';

// Placeholder data - in a real app, this would be fetched based on `id`
const contentDetailsData = {
  'album_doraemon_soundtrack_vol1': {
    id: 'album_doraemon_soundtrack_vol1',
    type: 'Album',
    title: "Doraemon Movie Soundtracks Vol. 1",
    creator: "Various Artists",
    imageUrl: 'https://picsum.photos/seed/dora_detail_album/400',
    description: "Relive the magic of Doraemon's movies with this epic soundtrack collection. Featuring iconic themes and memorable scores that accompanied Nobita and friends on their incredible adventures through time and space.",
    tracks: [
      { id: 'dt1', title: 'Main Theme - Stand By Me Doraemon', artist: 'Motohiro Hata', album: 'Doraemon Movie Soundtracks Vol. 1', duration: '4:55', imageUrl: 'https://picsum.photos/seed/dora_sbm/100', trackNumber: 1 },
      { id: 'dt2', title: 'Himawari no Yakusoku', artist: 'Motohiro Hata', album: 'Doraemon Movie Soundtracks Vol. 1', duration: '5:15', imageUrl: 'https://picsum.photos/seed/dora_hima/100', trackNumber: 2 },
      { id: 'dt3', title: 'The Blue Sky is a Pocket', artist: 'Original Cast', album: 'Doraemon Movie Soundtracks Vol. 1', duration: '3:10', imageUrl: 'https://picsum.photos/seed/dora_pocket/100', trackNumber: 3 },
    ]
  },
  'playlist_future_gadgets': {
    id: 'playlist_future_gadgets',
    type: 'Playlist',
    title: "Future Gadgets Groove",
    creator: "Doraemon Fan",
    imageUrl: 'https://picsum.photos/seed/dora_detail_playlist/400',
    description: "A collection of upbeat and futuristic tracks perfect for tinkering with 22nd-century gadgets. Inspired by Doraemon's amazing inventions!",
    tracks: [
      { id: 'fgt1', title: 'Techno Bell', artist: 'Dorami Chan', album: 'Future Sounds', duration: '3:40', imageUrl: 'https://picsum.photos/seed/dora_fg1/100', trackNumber: 1 },
      { id: 'fgt2', title: 'Time Warp Hop', artist: 'The Time Patrol', album: 'Chronos Beats', duration: '4:20', imageUrl: 'https://picsum.photos/seed/dora_fg2/100', trackNumber: 2 },
    ]
  }
};

const musicPlayerBarProps = {
  currentTrack: {
    id: 'player_track_detail',
    title: 'Detail Page Track',
    artist: 'Soundtrack Artist',
    imageUrl: 'https://picsum.photos/seed/dora_player_detail/100',
    durationSeconds: 220,
  },
  isPlaying: false,
};

const ContentDetailPage = () => {
  console.log('ContentDetailPage loaded');
  const { id } = useParams<{ id: string }>();
  // Default to one of the placeholders if ID doesn't match or is undefined
  const content = id && contentDetailsData[id as keyof typeof contentDetailsData] 
                  ? contentDetailsData[id as keyof typeof contentDetailsData] 
                  : contentDetailsData['album_doraemon_soundtrack_vol1'];

  const [currentPlayingId, setCurrentPlayingId] = React.useState<string | number | null>(null);

  const handlePlayPauseTrack = (trackId: string | number) => {
    setCurrentPlayingId(prevId => (prevId === trackId ? null : trackId));
    console.log('ContentDetailPage: Play/Pause track:', trackId);
  };
  
  if (!content) {
    return (
        <div className="flex h-screen bg-neutral-900 text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col ml-64 overflow-hidden items-center justify-center">
          <p>Content not found. Perhaps the Anywhere Door took you to the wrong place!</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <Sidebar />
      <main className="flex-1 flex flex-col ml-64 overflow-hidden">
        <Header userName="Doraemon Fan" showBackButton={true} />
        <div className="flex-1 relative">
          <ScrollArea className="absolute inset-0 pb-[90px]">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
                <img src={content.imageUrl} alt={content.title} className="w-full md:w-64 h-auto md:h-64 object-cover rounded-lg shadow-xl" />
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-semibold text-neutral-300 uppercase">{content.type}</p>
                  <h1 className="text-4xl md:text-5xl font-bold text-white my-2">{content.title}</h1>
                  <p className="text-neutral-300 text-lg mb-1">By {content.creator}</p>
                  <p className="text-neutral-400 text-sm mt-2 leading-relaxed max-w-prose">{content.description}</p>
                  <div className="mt-6 flex items-center space-x-3">
                    <Button size="lg" className="bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-full font-semibold">
                      <Play className="mr-2 h-6 w-6" fill="currentColor" /> Play All
                    </Button>
                    <Button variant="outline" size="icon" className="border-neutral-600 hover:border-white text-neutral-300 hover:text-white">
                      <Shuffle className="h-5 w-5" />
                    </Button>
                     <Button variant="outline" size="icon" className="border-neutral-600 hover:border-white text-neutral-300 hover:text-white">
                      <Heart className="h-5 w-5" />
                    </Button>
                     <Button variant="outline" size="icon" className="border-neutral-600 hover:border-white text-neutral-300 hover:text-white">
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                {content.tracks.map((track, index) => (
                  <TrackListItem
                    key={track.id}
                    {...track}
                    trackNumber={index + 1}
                    isPlaying={currentPlayingId === track.id}
                    isCurrentTrack={currentPlayingId === track.id}
                    onPlayPause={() => handlePlayPauseTrack(track.id)}
                    onLike={() => console.log('Liked track on detail page:', track.id)}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
          <MusicPlayerBar {...musicPlayerBarProps} />
        </div>
      </main>
    </div>
  );
};

export default ContentDetailPage;