import React from 'react';
import { Media } from '../../types';
import MediaCard from './MediaCard';
import { Loader } from 'lucide-react';

interface MediaGridProps {
  title?: string;
  media: Media[];
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  variant?: 'default' | 'compact';
}

const MediaGrid: React.FC<MediaGridProps> = ({
  title,
  media,
  isLoading = false,
  error = null,
  emptyMessage = 'No media found',
  variant = 'default'
}) => {
  // Grid classes based on variant
  const gridClasses = variant === 'compact' 
    ? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4'
    : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
  
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">{title}</h2>
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      )}
      
      {error && (
        <div className="bg-red-900/20 border border-red-900 text-red-200 rounded-lg p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {!isLoading && !error && media.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>{emptyMessage}</p>
        </div>
      )}
      
      {!isLoading && !error && media.length > 0 && (
        <div className={gridClasses}>
          {media.map(item => (
            <MediaCard 
              key={item.id} 
              media={item} 
              variant={variant === 'compact' ? 'compact' : 'default'} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGrid;