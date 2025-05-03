import { create } from 'zustand';
import { Media, Genre, StreamingPlatform } from '../types';
import { movies } from '../data/mockData';

interface MediaState {
  allMedia: Media[];
  filteredMedia: Media[];
  selectedMedia: Media | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    search: string;
    genres: Genre[];
    platforms: StreamingPlatform[];
    years: number[];
    minRating: number;
    mediaType: 'all' | 'movie' | 'series';
    sort: 'latest' | 'highest-rated' | 'most-reviewed';
  };
}

interface MediaStore extends MediaState {
  loadAllMedia: () => void;
  getMediaById: (id: string) => void;
  setFilters: (filters: Partial<MediaState['filters']>) => void;
  resetFilters: () => void;
  getFeatured: () => Media[];
  getNewReleases: () => Media[];
  getEditorsPicks: () => Media[];
}

const defaultFilters = {
  search: '',
  genres: [] as Genre[],
  platforms: [] as StreamingPlatform[],
  years: [],
  minRating: 0,
  mediaType: 'all' as const,
  sort: 'latest' as const
};

export const useMediaStore = create<MediaStore>((set, get) => ({
  allMedia: [],
  filteredMedia: [],
  selectedMedia: null,
  isLoading: false,
  error: null,
  filters: defaultFilters,
  
  loadAllMedia: () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd fetch from an API
      set({ 
        allMedia: movies,
        filteredMedia: movies,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load media', 
        isLoading: false 
      });
    }
  },
  
  getMediaById: (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd fetch from an API
      const media = movies.find(m => m.id === id) || null;
      set({ selectedMedia: media, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load media details', 
        isLoading: false 
      });
    }
  },
  
  setFilters: (filters: Partial<MediaState['filters']>) => {
    const newFilters = { ...get().filters, ...filters };
    set({ filters: newFilters });
    
    // Apply filters
    let filtered = [...get().allMedia];
    
    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase();
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchLower) ||
        m.director.toLowerCase().includes(searchLower) ||
        m.cast.some(c => c.toLowerCase().includes(searchLower))
      );
    }
    
    if (newFilters.genres.length > 0) {
      filtered = filtered.filter(m => 
        newFilters.genres.some(g => m.genres.includes(g))
      );
    }
    
    if (newFilters.platforms.length > 0) {
      filtered = filtered.filter(m => 
        newFilters.platforms.some(p => m.streamingPlatforms.includes(p))
      );
    }
    
    if (newFilters.years.length > 0) {
      filtered = filtered.filter(m => 
        newFilters.years.includes(m.releaseYear)
      );
    }
    
    if (newFilters.minRating > 0) {
      filtered = filtered.filter(m => m.rating >= newFilters.minRating);
    }
    
    if (newFilters.mediaType !== 'all') {
      filtered = filtered.filter(m => m.type === newFilters.mediaType);
    }
    
    // Apply sort
    switch (newFilters.sort) {
      case 'latest':
        filtered.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'highest-rated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'most-reviewed':
        // In a real app, we'd count reviews for each media
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    set({ filteredMedia: filtered });
  },
  
  resetFilters: () => {
    set({ filters: defaultFilters });
    set({ filteredMedia: get().allMedia });
  },
  
  getFeatured: () => {
    return get().allMedia.filter(m => m.isFeatured);
  },
  
  getNewReleases: () => {
    return get().allMedia.filter(m => m.isNewRelease);
  },
  
  getEditorsPicks: () => {
    return get().allMedia.filter(m => m.isEditorsPick);
  }
}));