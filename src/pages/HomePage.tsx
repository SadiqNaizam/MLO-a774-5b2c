import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MediaContentCard from '@/components/MediaContentCard';
import TrackListItem from '@/components/TrackListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder data inspired by Doraemon theme
const samplePlaylists = [
  { id: 'pl1', imageUrl: 'https://picsum.photos/seed/dora_playlist1/200', title: "Doraemon's Future Gadgets Mix", subtitle: 'Playlist • By MusicApp', type: 'playlist' as const },
  { id: 'pl2', imageUrl: 'https://picsum.photos/seed/dora_playlist2/200', title: "Nobita's Afternoon Nap Lullabies", subtitle: 'Playlist • By MusicApp', type: 'playlist' as const },
  { id: 'pl3', imageUrl: 'https://picsum.photos/seed/dora_playlist3/200', title: 'Gian\'s Concert Rehearsal', subtitle: 'Playlist • Top Hits', type: 'playlist' as const },
];

const sampleAlbums = [
  { id: 'al1', imageUrl: 'https://picsum.photos/seed/dora_album1/200', title: 'Doraemon The Movie: OST Collection', subtitle: 'Album • Various Artists', type: 'album' as const },
  { id: 'al2', imageUrl: 'https://picsum.photos/seed/dora_album2/200', title: 'Anywhere Door Journeys', subtitle: 'Album • Future Funk Band', type: 'album' as const },
];

const sampleTracks = [
  { id: 't1', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', album: 'Doraemon Classics', duration: '3:15', imageUrl: 'https://picsum.photos/seed/dora_track1/100', trackNumber: 1 },
  { id: 't2', title: 'Yume wo Kanaete Doraemon', artist: 'mao', album: 'Modern Doraemon Hits', duration: '4:05', imageUrl: 'https://picsum.photos/seed/dora_track2/100', trackNumber: 2 },
  { id: 't3', title: 'Boku Doraemon', artist: 'Nobuyo Ōyama', album: 'Doraemon Classics', duration: '2:50', imageUrl: 'https://picsum.photos/seed/dora_track3/100', trackNumber: 3 },
];

const musicPlayerBarProps = {
  currentTrack: {
    id: 'player_track_home',
    title: 'Stand By Me - Theme Song',
    artist: 'Motohiro Hata',
    imageUrl: 'https://picsum.photos/seed/dora_player_home/100',
    durationSeconds: 240,
  },
  isPlaying: false,
  onPlayPause: () => console.log('HomePage Player: Play/Pause'),
  onSkipNext: () => console.log('HomePage Player: Skip next'),
  onSkipPrevious: () => console.log('HomePage Player: Skip previous'),
};

const HomePage = () => {
  console.log('HomePage loaded');
  const [currentPlayingId, setCurrentPlayingId] = React.useState<string | number | null>(null);

  const handlePlayPauseTrack = (id: string | number) => {
    setCurrentPlayingId(prevId => (prevId === id ? null : id));
    console.log('Play/Pause track:', id);
  };

  const handlePlayCard = (id: string | number) => {
    console.log('Play content from card:', id);
    // Potentially update MusicPlayerBar or navigate
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <Sidebar />
      <main className="flex-1 flex flex-col ml-64 overflow-hidden">
        <Header userName="Doraemon Fan" />
        <div className="flex-1 relative">
          <ScrollArea className="absolute inset-0 pb-[90px]"> {/* pb-[90px] for MusicPlayerBar height */}
            <div className="p-4 md:p-6 space-y-8">
              <section>
                <h1 className="text-3xl font-bold text-white mb-6">Welcome, Doraemon Fan!</h1>
                <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Featured Playlists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {samplePlaylists.map(item => (
                    <MediaContentCard key={item.id} {...item} onPlay={() => handlePlayCard(item.id)} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-neutral-200 mb-4">New Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {sampleAlbums.map(item => (
                    <MediaContentCard key={item.id} {...item} onPlay={() => handlePlayCard(item.id)} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Popular Tracks</h2>
                <div className="space-y-2">
                  {sampleTracks.map(track => (
                    <TrackListItem
                      key={track.id}
                      {...track}
                      isPlaying={currentPlayingId === track.id}
                      isCurrentTrack={currentPlayingId === track.id}
                      onPlayPause={() => handlePlayPauseTrack(track.id)}
                      onLike={() => console.log('Liked track:', track.id)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </ScrollArea>
          <MusicPlayerBar {...musicPlayerBarProps} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;