import { create } from 'zustand';
import { WatchlistItem, Purchase, Media } from '../types';
import { movies } from '../data/mockData';

interface UserState {
  watchlist: WatchlistItem[];
  purchases: Purchase[];
  isLoading: boolean;
  error: string | null;
}

interface UserStore extends UserState {
  getWatchlist: (userId: string) => void;
  getPurchases: (userId: string) => void;
  addToWatchlist: (userId: string, mediaId: string) => void;
  removeFromWatchlist: (itemId: string) => void;
  purchaseMedia: (userId: string, mediaId: string, type: 'buy' | 'rent') => void;
  getWatchlistMedia: () => Media[];
  getPurchasedMedia: () => Media[];
}

// Mock data - in a real app, this would be stored in a database
const mockWatchlist: WatchlistItem[] = [
  {
    id: '1',
    userId: '1',
    mediaId: '1',
    addedAt: '2023-04-10T14:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    mediaId: '4',
    addedAt: '2023-03-25T09:15:00Z'
  }
];

const mockPurchases: Purchase[] = [
  {
    id: '1',
    userId: '1',
    mediaId: '2',
    type: 'buy',
    price: 12.99,
    purchaseDate: '2023-02-15T16:45:00Z',
    streamingLink: 'https://example.com/stream/1'
  },
  {
    id: '2',
    userId: '1',
    mediaId: '7',
    type: 'rent',
    price: 4.99,
    purchaseDate: '2023-04-05T20:30:00Z',
    expiryDate: '2023-04-08T20:30:00Z',
    streamingLink: 'https://example.com/stream/2'
  }
];

export const useUserStore = create<UserStore>((set, get) => ({
  watchlist: [],
  purchases: [],
  isLoading: false,
  error: null,
  
  getWatchlist: (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd fetch from an API
      const watchlist = mockWatchlist.filter(w => w.userId === userId);
      set({ watchlist, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load watchlist', 
        isLoading: false 
      });
    }
  },
  
  getPurchases: (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd fetch from an API
      const purchases = mockPurchases.filter(p => p.userId === userId);
      set({ purchases, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load purchases', 
        isLoading: false 
      });
    }
  },
  
  addToWatchlist: (userId: string, mediaId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Check if already in watchlist
      if (get().watchlist.some(w => w.userId === userId && w.mediaId === mediaId)) {
        throw new Error('This media is already in your watchlist');
      }
      
      // In a real app, we'd send to an API
      const newItem: WatchlistItem = {
        id: `${mockWatchlist.length + 1}`,
        userId,
        mediaId,
        addedAt: new Date().toISOString()
      };
      
      // For demo, we'll just add it to our array
      mockWatchlist.push(newItem);
      
      set({ 
        watchlist: [...get().watchlist, newItem],
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add to watchlist', 
        isLoading: false 
      });
    }
  },
  
  removeFromWatchlist: (itemId: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd send to an API
      const updatedWatchlist = get().watchlist.filter(w => w.id !== itemId);
      
      // Update the mock data
      const itemIndex = mockWatchlist.findIndex(w => w.id === itemId);
      if (itemIndex !== -1) {
        mockWatchlist.splice(itemIndex, 1);
      }
      
      set({ 
        watchlist: updatedWatchlist,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to remove from watchlist', 
        isLoading: false 
      });
    }
  },
  
  purchaseMedia: (userId: string, mediaId: string, type: 'buy' | 'rent') => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd send to an API
      const media = movies.find(m => m.id === mediaId);
      
      if (!media) {
        throw new Error('Media not found');
      }
      
      const price = type === 'buy' ? media.buyPrice : media.rentPrice;
      
      if (!price) {
        throw new Error(`This media is not available for ${type}`);
      }
      
      const newPurchase: Purchase = {
        id: `${mockPurchases.length + 1}`,
        userId,
        mediaId,
        type,
        price,
        purchaseDate: new Date().toISOString(),
        streamingLink: `https://example.com/stream/${mediaId}`
      };
      
      // Add expiry date for rentals
      if (type === 'rent') {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3); // 3-day rental
        newPurchase.expiryDate = expiryDate.toISOString();
      }
      
      // For demo, we'll just add it to our array
      mockPurchases.push(newPurchase);
      
      set({ 
        purchases: [...get().purchases, newPurchase],
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Purchase failed', 
        isLoading: false 
      });
    }
  },
  
  getWatchlistMedia: () => {
    const mediaIds = get().watchlist.map(w => w.mediaId);
    return movies.filter(m => mediaIds.includes(m.id));
  },
  
  getPurchasedMedia: () => {
    const mediaIds = get().purchases.map(p => p.mediaId);
    return movies.filter(m => mediaIds.includes(m.id));
  }
}));