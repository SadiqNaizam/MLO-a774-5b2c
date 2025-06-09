import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MediaContentCardProps {
  id: string | number;
  imageUrl: string;
  title: string;
  subtitle: string; // e.g., Artist name, "Playlist"
  type: 'album' | 'playlist' | 'artist' | 'track'; // To determine link destination
  onPlay?: (id: string | number) => void; // Optional: for direct play action
}

const MediaContentCard: React.FC<MediaContentCardProps> = ({
  id,
  imageUrl,
  title,
  subtitle,
  type,
  onPlay
}) => {
  console.log("Rendering MediaContentCard:", title);

  const linkDestination = `/${type}/${id}`;

  return (
    <Card className="w-full max-w-[200px] bg-neutral-800 border-transparent rounded-lg overflow-hidden group transition-all hover:bg-neutral-700">
      <Link to={linkDestination} className="block p-4">
        <CardContent className="p-0 space-y-3 relative">
          <AspectRatio ratio={1 / 1} className="rounded-md overflow-hidden">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={title}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
          <div className="min-h-[40px]"> {/* Ensure consistent height for text */}
            <h3 className="text-white font-semibold text-base truncate" title={title}>{title}</h3>
            <p className="text-gray-400 text-xs truncate" title={subtitle}>{subtitle}</p>
          </div>
          {onPlay && (
             <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                    e.preventDefault(); // Prevent navigation if play button is inside Link
                    e.stopPropagation();
                    onPlay(id);
                    console.log("Play button clicked on card:", title);
                }}
                className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 transform group-hover:translate-y-0 translate-y-2"
                aria-label={`Play ${title}`}
            >
                <Play size={20} fill="currentColor" />
            </Button>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

export default MediaContentCard;