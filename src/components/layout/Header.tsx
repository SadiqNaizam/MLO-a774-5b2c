import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
// Assuming NavigationMenu might be used here from shadcn, if complex nav is needed.
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

interface HeaderProps {
  // Props for dynamic content, e.g., user name, focused search state
  userName?: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ userName = "User" }) => {
  console.log("Rendering Header");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search') as string;
    if (query.trim()) {
      console.log("Performing search for:", query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="bg-gray-800/80 backdrop-blur-md text-white p-4 flex items-center justify-between sticky top-0 z-40 ml-64"> {/* Adjust ml-64 if sidebar width changes */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-black/30 hover:bg-black/50">
          <ChevronLeft size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate(1)} className="rounded-full bg-black/30 hover:bg-black/50">
          <ChevronRight size={20} />
        </Button>
        {/* Search input, could be conditionally rendered or styled based on route */}
        <form onSubmit={handleSearch} className="relative ml-4 hidden md:block">
          <Input
            type="search"
            name="search"
            placeholder="Search for songs, artists, albums..."
            className="pl-10 pr-4 py-2 w-72 bg-gray-700 border-transparent focus:bg-gray-600 focus:ring-1 focus:ring-green-500 rounded-full"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </form>
      </div>

      {/* Navigation Menu example (if needed, implement using shadcn/ui NavigationMenu) */}
      {/* <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/discover">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Discover
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}

      <div className="flex items-center space-x-4">
        {/* Placeholder for Upgrade Button or other actions */}
        <Button variant="outline" size="sm" className="rounded-full border-gray-500 hover:border-white hover:bg-white/10 text-xs font-semibold">
            Explore Premium
        </Button>
        <Link to="/account" className="flex items-center space-x-2 hover:bg-gray-700 p-1 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt={userName} />
            <AvatarFallback>{userName.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden lg:inline">{userName}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;