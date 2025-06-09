import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MediaContentCard from '@/components/MediaContentCard';
import TrackListItem from '@/components/TrackListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input'; // For explicit search input on page
import { Search as SearchIcon } from 'lucide-react';

// Placeholder data
const allResults = {
  tracks: [
    { id: 'st1', title: 'Doraemon Search Result 1', artist: 'Artist A', duration: '3:30', imageUrl: 'https://picsum.photos/seed/search_track1/100', trackNumber: 1 },
    { id: 'st2', title: 'Nobita\'s Theme (Search)', artist: 'Artist B', duration: '2:45', imageUrl: 'https://picsum.photos/seed/search_track2/100', trackNumber: 2 },
  ],
  albums: [
    { id: 'sa1', imageUrl: 'https://picsum.photos/seed/search_album1/200', title: 'Found Doraemon Album', subtitle: 'Album • Artist X', type: 'album' as const },
  ],
  artists: [
     { id: 'sar1', imageUrl: 'https://picsum.photos/seed/search_artist1/200', title: 'Doraemon Singers', subtitle: 'Artist', type: 'artist' as const },
  ],
  playlists: [
    { id: 'sp1', imageUrl: 'https://picsum.photos/seed/search_playlist1/200', title: 'Doraemon Party Mix (Found)', subtitle: 'Playlist • User Z', type: 'playlist' as const },
  ],
};

const musicPlayerBarProps = {
  currentTrack: {
    id: 'player_track_search',
    title: 'Gadget Groove',
    artist: 'The Time Travelers',
    imageUrl: 'https://picsum.photos/seed/dora_player_search/100',
    durationSeconds: 180,
  },
  isPlaying: false,
};

const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPlayingId, setCurrentPlayingId] = React.useState<string | number | null>(null);

  const handlePlayPauseTrack = (id: string | number) => {
    setCurrentPlayingId(prevId => (prevId === id ? null : id));
    console.log('SearchPage: Play/Pause track:', id);
  };
  
  const handlePlayCard = (id: string | number) => {
    console.log('SearchPage: Play content from card:', id);
  };

  // Filtered results (basic example, would be API driven)
  const filteredResults = searchTerm ? {
    tracks: allResults.tracks.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())),
    albums: allResults.albums.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase())),
    artists: allResults.artists.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase())),
    playlists: allResults.playlists.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())),
  } : allResults;


  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <Sidebar />
      <main className="flex-1 flex flex-col ml-64 overflow-hidden">
        {/* Header might contain its own search, this is an example of page-specific search input */}
        <Header userName="Doraemon Fan" />
        <div className="flex-1 relative">
          <ScrollArea className="absolute inset-0 pb-[90px]">
            <div className="p-4 md:p-6 space-y-6">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  type="search"
                  placeholder="What do you want to listen to? (e.g., Doraemon)"
                  className="w-full bg-neutral-800 border-neutral-700 pl-10 pr-4 py-3 rounded-full focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-neutral-800">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="tracks">Tracks</TabsTrigger>
                  <TabsTrigger value="albums">Albums</TabsTrigger>
                  <TabsTrigger value="artists">Artists</TabsTrigger>
                  <TabsTrigger value="playlists">Playlists</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 space-y-4">
                  {filteredResults.tracks.length > 0 && <h3 className="text-xl font-semibold">Tracks</h3>}
                  {filteredResults.tracks.map(track => <TrackListItem key={track.id} {...track} isPlaying={currentPlayingId === track.id} isCurrentTrack={currentPlayingId === track.id} onPlayPause={() => handlePlayPauseTrack(track.id)} />)}
                  {filteredResults.albums.length > 0 && <h3 className="text-xl font-semibold mt-4">Albums</h3>}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredResults.albums.map(item => <MediaContentCard key={item.id} {...item} onPlay={() => handlePlayCard(item.id)} />)}
                  </div>
                  {/* Add Artists and Playlists similarly */}
                </TabsContent>
                <TabsContent value="tracks" className="mt-4 space-y-2">
                  {filteredResults.tracks.map(track => <TrackListItem key={track.id} {...track} isPlaying={currentPlayingId === track.id} isCurrentTrack={currentPlayingId === track.id} onPlayPause={() => handlePlayPauseTrack(track.id)} />)}
                </TabsContent>
                <TabsContent value="albums" className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredResults.albums.map(item => <MediaContentCard key={item.id} {...item} onPlay={() => handlePlayCard(item.id)} />)}
                  </div>
                </TabsContent>
                <TabsContent value="artists" className="mt-4">
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredResults.artists.map(item => <MediaContentCard key={item.id} {...item} />)}
                  </div>
                </TabsContent>
                <TabsContent value="playlists" className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredResults.playlists.map(item => <MediaContentCard key={item.id} {...item} onPlay={() => handlePlayCard(item.id)} />)}
                  </div>
                </TabsContent>
              </Tabs>
              {!searchTerm && <p className="text-center text-neutral-400">Search for your favorite Doraemon songs and artists!</p>}
            </div>
          </ScrollArea>
          <MusicPlayerBar {...musicPlayerBarProps} />
        </div>
      </main>
    </div>
  );
};

export default SearchPage;