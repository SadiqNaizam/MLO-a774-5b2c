import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MediaContentCard from '@/components/MediaContentCard';
import TrackListItem from '@/components/TrackListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

// Placeholder data
const libraryPlaylists = [
  { id: 'lib_pl1', imageUrl: 'https://picsum.photos/seed/lib_dora_pl1/200', title: "My Doraemon Favorites", subtitle: 'Playlist • 20 songs', type: 'playlist' as const },
  { id: 'lib_pl2', imageUrl: 'https://picsum.photos/seed/lib_dora_pl2/200', title: 'Time Travel Tunes', subtitle: 'Playlist • 15 songs', type: 'playlist' as const },
];
const likedSongs = [
  { id: 'liked1', title: 'Doraemon Ekaki Uta', artist: 'Nobuyo Ōyama', album: 'Rare Tracks', duration: '1:50', imageUrl: 'https://picsum.photos/seed/liked_dora1/100', trackNumber: 1 },
  { id: 'liked2', title: 'Aoi Sora wa Pocket sa', artist: 'Kumiko Osugi', album: 'Doraemon Classics', duration: '2:20', imageUrl: 'https://picsum.photos/seed/liked_dora2/100', trackNumber: 2 },
];
const libraryAlbums = [
    { id: 'lib_al1', imageUrl: 'https://picsum.photos/seed/lib_dora_al1/200', title: 'Saved Doraemon Album 1', subtitle: 'Album • Artist Y', type: 'album' as const },
];
const followedArtists = [
    { id: 'lib_ar1', imageUrl: 'https://picsum.photos/seed/lib_dora_ar1/200', title: 'The Doraemons Band', subtitle: 'Artist', type: 'artist' as const },
];

const musicPlayerBarProps = {
  currentTrack: {
    id: 'player_track_library',
    title: 'My Favorite Song',
    artist: 'Me',
    imageUrl: 'https://picsum.photos/seed/dora_player_lib/100',
    durationSeconds: 200,
  },
  isPlaying: true,
};

const LibraryPage = () => {
  console.log('LibraryPage loaded');
  const [currentPlayingId, setCurrentPlayingId] = React.useState<string | number | null>(null);

  const handlePlayPauseTrack = (id: string | number) => {
    setCurrentPlayingId(prevId => (prevId === id ? null : id));
    console.log('LibraryPage: Play/Pause track:', id);
  };
  const handlePlayCard = (id: string | number) => {
    console.log('LibraryPage: Play content from card:', id);
  };


  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <Sidebar />
      <main className="flex-1 flex flex-col ml-64 overflow-hidden">
        <Header userName="Doraemon Fan" />
        <div className="flex-1 relative">
          <ScrollArea className="absolute inset-0 pb-[90px]">
            <div className="p-4 md:p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Your Library</h1>
                <Button variant="ghost" className="text-green-400 hover:text-green-300">
                  <PlusCircle className="mr-2 h-5 w-5" /> Create Playlist
                </Button>
              </div>

              <Tabs defaultValue="playlists" className="w-full">
                <TabsList className="bg-neutral-800">
                  <TabsTrigger value="playlists">Playlists</TabsTrigger>
                  <TabsTrigger value="songs">Liked Songs</TabsTrigger>
                  <TabsTrigger value="albums">Albums</TabsTrigger>
                  <TabsTrigger value="artists">Artists</TabsTrigger>
                </TabsList>
                <TabsContent value="playlists" className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {libraryPlaylists.map(item => <MediaContentCard key={item.id} {...item} onPlay={() => handlePlayCard(item.id)} />)}
                  </div>
                  {libraryPlaylists.length === 0 && <p className="text-neutral-400 text-center py-8">Create your first playlist inspired by Doraemon's adventures!</p>}
                </TabsContent>
                <TabsContent value="songs" className="mt-4 space-y-2">
                  {likedSongs.map(track => <TrackListItem key={track.id} {...track} isPlaying={currentPlayingId === track.id} isCurrentTrack={currentPlayingId === track.id} onPlayPause={() => handlePlayPauseTrack(track.id)} />)}
                   {likedSongs.length === 0 && <p className="text-neutral-400 text-center py-8">Songs you like will appear here.</p>}
                </TabsContent>
                <TabsContent value="albums" className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {libraryAlbums.map(item => <MediaContentCard key={item.id} {...item} />)}
                  </div>
                   {libraryAlbums.length === 0 && <p className="text-neutral-400 text-center py-8">Albums you save will appear here.</p>}
                </TabsContent>
                <TabsContent value="artists" className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {followedArtists.map(item => <MediaContentCard key={item.id} {...item} />)}
                    </div>
                    {followedArtists.length === 0 && <p className="text-neutral-400 text-center py-8">Artists you follow will appear here.</p>}
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
          <MusicPlayerBar {...musicPlayerBarProps} />
        </div>
      </main>
    </div>
  );
};

export default LibraryPage;