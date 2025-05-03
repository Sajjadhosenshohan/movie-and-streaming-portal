import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MediaGrid from '../components/media/MediaGrid';
import Button from '../components/ui/Button';
import { useMediaStore } from '../store/mediaStore';
import { Genre, StreamingPlatform } from '../types';

const BrowsePage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();
  const { 
    loadAllMedia, 
    filteredMedia, 
    filters, 
    setFilters, 
    resetFilters, 
    isLoading 
  } = useMediaStore();
  
  // Parse URL query parameters on page load
  useEffect(() => {
    loadAllMedia();
    
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    const genre = searchParams.get('genre');
    const platform = searchParams.get('platform');
    const sort = searchParams.get('sort');
    const minRating = searchParams.get('rating');
    const mediaType = searchParams.get('type');
    
    const newFilters: any = {};
    
    if (searchQuery) newFilters.search = searchQuery;
    if (genre) newFilters.genres = [genre as Genre];
    if (platform) newFilters.platforms = [platform as StreamingPlatform];
    if (sort) newFilters.sort = sort as typeof filters.sort;
    if (minRating) newFilters.minRating = parseInt(minRating, 10);
    if (mediaType) newFilters.mediaType = mediaType as typeof filters.mediaType;
    
    if (Object.keys(newFilters).length > 0) {
      setFilters(newFilters);
    }
  }, [location.search, loadAllMedia, setFilters]);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handleGenreChange = (genre: Genre) => {
    const currentGenres = [...filters.genres];
    const index = currentGenres.indexOf(genre);
    
    if (index === -1) {
      // Add genre
      setFilters({ genres: [...currentGenres, genre] });
    } else {
      // Remove genre
      currentGenres.splice(index, 1);
      setFilters({ genres: currentGenres });
    }
  };
  
  const handlePlatformChange = (platform: StreamingPlatform) => {
    const currentPlatforms = [...filters.platforms];
    const index = currentPlatforms.indexOf(platform);
    
    if (index === -1) {
      // Add platform
      setFilters({ platforms: [...currentPlatforms, platform] });
    } else {
      // Remove platform
      currentPlatforms.splice(index, 1);
      setFilters({ platforms: currentPlatforms });
    }
  };
  
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ minRating: parseInt(e.target.value, 10) });
  };
  
  const handleMediaTypeChange = (type: typeof filters.mediaType) => {
    setFilters({ mediaType: type });
  };
  
  const handleSortChange = (sort: typeof filters.sort) => {
    setFilters({ sort });
  };
  
  // Available filter options
  const genres: Genre[] = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 
    'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror', 
    'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War'
  ];
  
  const platforms: StreamingPlatform[] = [
    'Netflix', 'Amazon Prime', 'Disney+', 'HBO Max', 
    'Hulu', 'Apple TV+', 'CinemateOriginal'
  ];
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Browse</h1>
          
          <Button 
            variant="outline" 
            leftIcon={<SlidersHorizontal size={18} />}
            onClick={toggleFilter}
            className="md:hidden"
          >
            Filters
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className={`hidden md:block w-64 flex-shrink-0`}>
            <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium flex items-center">
                  <Filter size={18} className="mr-2" /> Filters
                </h2>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-purple-500 hover:text-purple-400 transition-colors"
                >
                  Reset
                </button>
              </div>
              
              {/* Media Type */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Type</h3>
                <div className="flex">
                  <button 
                    className={`px-4 py-2 rounded-l-md text-sm ${
                      filters.mediaType === 'all' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    } transition-colors`}
                    onClick={() => handleMediaTypeChange('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm ${
                      filters.mediaType === 'movie' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    } transition-colors`}
                    onClick={() => handleMediaTypeChange('movie')}
                  >
                    Movies
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-r-md text-sm ${
                      filters.mediaType === 'series' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    } transition-colors`}
                    onClick={() => handleMediaTypeChange('series')}
                  >
                    Series
                  </button>
                </div>
              </div>
              
              {/* Sort */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Sort By</h3>
                <select 
                  value={filters.sort}
                  onChange={(e) => handleSortChange(e.target.value as typeof filters.sort)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="latest">Latest</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="most-reviewed">Most Reviewed</option>
                </select>
              </div>
              
              {/* Rating */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Min Rating</h3>
                  <span>{filters.minRating}/10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={filters.minRating}
                  onChange={handleRatingChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
              
              {/* Genres */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Genres</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {genres.map((genre) => (
                    <label key={genre} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.genres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                        className="rounded border-gray-700 text-purple-600 focus:ring-purple-500 mr-2"
                      />
                      <span className="text-sm">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Platforms */}
              <div>
                <h3 className="font-medium mb-2">Platforms</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {platforms.map((platform) => (
                    <label key={platform} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.platforms.includes(platform)}
                        onChange={() => handlePlatformChange(platform)}
                        className="rounded border-gray-700 text-purple-600 focus:ring-purple-500 mr-2"
                      />
                      <span className="text-sm">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Mobile Filters - Slide over */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-72 bg-gray-800 shadow-xl p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium flex items-center">
                    <Filter size={18} className="mr-2" /> Filters
                  </h2>
                  <button 
                    onClick={toggleFilter}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-purple-500 hover:text-purple-400 transition-colors"
                  >
                    Reset All
                  </button>
                </div>
                
                {/* Mobile Filters - same as desktop */}
                {/* Media Type */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Type</h3>
                  <div className="flex">
                    <button 
                      className={`px-4 py-2 rounded-l-md text-sm ${
                        filters.mediaType === 'all' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      } transition-colors`}
                      onClick={() => handleMediaTypeChange('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm ${
                        filters.mediaType === 'movie' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      } transition-colors`}
                      onClick={() => handleMediaTypeChange('movie')}
                    >
                      Movies
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-r-md text-sm ${
                        filters.mediaType === 'series' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      } transition-colors`}
                      onClick={() => handleMediaTypeChange('series')}
                    >
                      Series
                    </button>
                  </div>
                </div>
                
                {/* Sort */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Sort By</h3>
                  <select 
                    value={filters.sort}
                    onChange={(e) => handleSortChange(e.target.value as typeof filters.sort)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="latest">Latest</option>
                    <option value="highest-rated">Highest Rated</option>
                    <option value="most-reviewed">Most Reviewed</option>
                  </select>
                </div>
                
                {/* Rating */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Min Rating</h3>
                    <span>{filters.minRating}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={filters.minRating}
                    onChange={handleRatingChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
                
                {/* Genres */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Genres</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {genres.map((genre) => (
                      <label key={genre} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.genres.includes(genre)}
                          onChange={() => handleGenreChange(genre)}
                          className="rounded border-gray-700 text-purple-600 focus:ring-purple-500 mr-2"
                        />
                        <span className="text-sm">{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Platforms */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Platforms</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {platforms.map((platform) => (
                      <label key={platform} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.platforms.includes(platform)}
                          onChange={() => handlePlatformChange(platform)}
                          className="rounded border-gray-700 text-purple-600 focus:ring-purple-500 mr-2"
                        />
                        <span className="text-sm">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button 
                    fullWidth
                    onClick={toggleFilter}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Results */}
          <div className="flex-1">
            {/* Active filters display */}
            {(filters.search || filters.genres.length > 0 || filters.platforms.length > 0 || filters.minRating > 0 || filters.mediaType !== 'all') && (
              <div className="mb-6 bg-gray-800 rounded-lg p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-400 mr-2">Active Filters:</span>
                  
                  {filters.search && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-100">
                      Search: {filters.search}
                      <button 
                        onClick={() => setFilters({ search: '' })}
                        className="ml-1.5 text-purple-300 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  
                  {filters.mediaType !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-100">
                      Type: {filters.mediaType}
                      <button 
                        onClick={() => setFilters({ mediaType: 'all' })}
                        className="ml-1.5 text-blue-300 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  
                  {filters.minRating > 0 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-100">
                      Rating: ≥{filters.minRating}
                      <button 
                        onClick={() => setFilters({ minRating: 0 })}
                        className="ml-1.5 text-yellow-300 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  
                  {filters.genres.map(genre => (
                    <span 
                      key={genre}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900 text-green-100"
                    >
                      {genre}
                      <button 
                        onClick={() => handleGenreChange(genre)}
                        className="ml-1.5 text-green-300 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  
                  {filters.platforms.map(platform => (
                    <span 
                      key={platform}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-900 text-pink-100"
                    >
                      {platform}
                      <button 
                        onClick={() => handlePlatformChange(platform)}
                        className="ml-1.5 text-pink-300 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-purple-500 hover:text-purple-400 transition-colors ml-auto"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
            
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-400">
                Found <span className="text-white font-medium">{filteredMedia.length}</span> items
              </p>
            </div>
            
            {/* Media grid */}
            <MediaGrid 
              media={filteredMedia} 
              isLoading={isLoading}
              emptyMessage="No media matches your filters. Try adjusting your criteria."
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowsePage;