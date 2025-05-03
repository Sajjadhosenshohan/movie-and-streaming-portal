import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, Plus } from 'lucide-react';
import { Media } from '../../types';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';

interface MediaCardProps {
  media: Media;
  variant?: 'default' | 'featured' | 'compact';
}

const MediaCard: React.FC<MediaCardProps> = ({ media, variant = 'default' }) => {
  const { isAuthenticated, user } = useAuthStore();
  const { addToWatchlist, watchlist } = useUserStore();
  
  const isInWatchlist = watchlist.some(item => item.mediaId === media.id);
  
  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAuthenticated && user) {
      addToWatchlist(user.id, media.id);
    }
  };
  
  if (variant === 'featured') {
    return (
      <div 
        className="group relative h-[500px] w-full rounded-xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${media.backdrop || media.poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="shrink-0 w-32 md:w-48 overflow-hidden rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              <img 
                src={media.poster} 
                alt={media.title}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mr-2">
                  {media.type === 'movie' ? 'Movie' : 'Series'}
                </span>
                <span className="text-sm text-gray-300">
                  {media.releaseYear}
                </span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-sm text-gray-300">
                  {media.duration}
                </span>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-3">{media.title}</h2>
              
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 fill-yellow-400 w-5 h-5 mr-1" />
                <span className="text-yellow-400 font-medium mr-4">{media.rating}</span>
                <div className="flex flex-wrap gap-2">
                  {media.genres.slice(0, 3).map((genre, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 line-clamp-3">
                {media.synopsis}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Link to={`/media/${media.id}`}>
                  <Button 
                    size="md" 
                    leftIcon={<Play size={16} className="ml-0.5" />}
                  >
                    Watch Now
                  </Button>
                </Link>
                
                {isAuthenticated && !isInWatchlist && (
                  <Button 
                    variant="outline" 
                    size="md"
                    leftIcon={<Plus size={16} />}
                    onClick={handleAddToWatchlist}
                  >
                    Add to Watchlist
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'compact') {
    return (
      <Link 
        to={`/media/${media.id}`}
        className="block group relative rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all duration-200"
      >
        <div className="aspect-[2/3] w-full bg-gray-900">
          <img 
            src={media.poster} 
            alt={media.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center text-sm mb-1">
            <Star className="text-yellow-400 fill-yellow-400 w-4 h-4 mr-1" />
            <span>{media.rating}</span>
          </div>
          <h3 className="font-medium text-sm line-clamp-1">{media.title}</h3>
        </div>
      </Link>
    );
  }
  
  // Default card
  return (
    <div className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col transform hover:-translate-y-1 transition-all duration-300">
      <div className="relative overflow-hidden">
        <Link to={`/media/${media.id}`}>
          <img 
            src={media.poster} 
            alt={media.title}
            className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              variant="primary" 
              size="sm"
              leftIcon={<Play size={16} className="ml-0.5" />}
            >
              Watch Now
            </Button>
          </div>
          
          {/* Media type badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-600 text-white">
              {media.type === 'movie' ? 'Movie' : 'Series'}
            </span>
          </div>
          
          {/* Rating badge */}
          <div className="absolute top-3 right-3 flex items-center bg-black bg-opacity-75 rounded-full px-2 py-1">
            <Star className="text-yellow-400 fill-yellow-400 w-3 h-3 mr-1" />
            <span className="text-white text-xs font-medium">{media.rating}</span>
          </div>
        </Link>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center text-xs text-gray-400 mb-1">
          <span>{media.releaseYear}</span>
          <span className="mx-1">•</span>
          <span>{media.duration}</span>
        </div>
        
        <Link to={`/media/${media.id}`} className="mb-2">
          <h3 className="font-semibold text-white text-lg line-clamp-1 group-hover:text-purple-400 transition-colors">
            {media.title}
          </h3>
        </Link>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {media.genres.slice(0, 2).map((genre, index) => (
            <span 
              key={index}
              className="text-xs px-1.5 py-0.5 rounded bg-gray-700 text-gray-300"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
          {media.synopsis}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-white">
            {media.buyPrice && (
              <span className="font-medium">
                ${media.buyPrice}
              </span>
            )}
            {media.rentPrice && media.buyPrice && (
              <span className="mx-1 text-gray-500">|</span>
            )}
            {media.rentPrice && (
              <span className="text-sm text-gray-400">
                Rent: ${media.rentPrice}
              </span>
            )}
          </div>
          
          {isAuthenticated && !isInWatchlist && (
            <button 
              onClick={handleAddToWatchlist}
              className="text-gray-400 hover:text-purple-500 transition-colors"
              aria-label="Add to watchlist"
            >
              <Plus size={20} />
            </button>
          )}
          
          {isAuthenticated && isInWatchlist && (
            <span className="text-purple-500">
              <Clock size={20} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;