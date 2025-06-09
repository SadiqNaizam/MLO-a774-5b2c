import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area'; // For playlist section
import { Separator } from '@/components/ui/separator';

// Example playlist type
interface PlaylistItem {
  id: string;
  name: string;
}

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");

  // Placeholder playlists
  const playlists: PlaylistItem[] = [
    { id: '1', name: 'Chill Vibes' },
    { id: '2', name: 'Workout Beats' },
    { id: '3', name: 'Study Focus' },
    { id: '4', name: 'Doraemon Favorites' }, // Themed placeholder
  ];

  return (
    <aside className="bg-black text-gray-300 w-64 p-4 space-y-6 h-screen flex flex-col fixed left-0 top-0">
      {/* Logo/App Name Placeholder */}
      <div className="text-2xl font-bold text-white mb-4">
        MusicApp
      </div>

      <nav className="space-y-2">
        <Link to="/" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-800 hover:text-white rounded-md transition-colors">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link to="/search" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-800 hover:text-white rounded-md transition-colors">
          <Search size={20} />
          <span>Search</span>
        </Link>
        <Link to="/library" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-800 hover:text-white rounded-md transition-colors">
          <Library size={20} />
          <span>Your Library</span>
        </Link>
      </nav>

      <div className="space-y-2 mt-4">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white">
          <PlusSquare size={20} className="mr-3" />
          Create Playlist
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white">
          <Heart size={20} className="mr-3" />
          Liked Songs
        </Button>
      </div>

      <Separator className="bg-gray-700 my-4" />

      <ScrollArea className="flex-grow pr-2">
        <div className="space-y-1">
          {playlists.map(playlist => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="block text-sm px-3 py-1.5 hover:bg-gray-800 hover:text-white rounded-md truncate"
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* Optional: App version or other footer info */}
      <div className="mt-auto text-xs text-gray-500 pt-4">
        {/* Placeholder for App Info or Settings Link */}
      </div>
    </aside>
  );
}

export default Sidebar;