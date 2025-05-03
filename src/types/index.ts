export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type Genre = 
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'Horror'
  | 'Mystery'
  | 'Romance'
  | 'Sci-Fi'
  | 'Thriller'
  | 'War';

export type StreamingPlatform = 
  | 'Netflix'
  | 'Amazon Prime'
  | 'Disney+'
  | 'HBO Max'
  | 'Hulu'
  | 'Apple TV+'
  | 'CinemateOriginal';

export type Media = {
  id: string;
  title: string;
  poster: string;
  backdrop?: string;
  releaseYear: number;
  genres: Genre[];
  director: string;
  cast: string[];
  synopsis: string;
  rating: number;
  streamingPlatforms: StreamingPlatform[];
  buyPrice?: number;
  rentPrice?: number;
  duration: string;
  type: 'movie' | 'series';
  seasons?: number;
  episodes?: number;
  isFeatured?: boolean;
  isNewRelease?: boolean;
  isEditorsPick?: boolean;
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  mediaId: string;
  rating: number;
  content: string;
  hasSpoilers: boolean;
  tags: string[];
  likes: number;
  createdAt: string;
  isApproved: boolean;
};

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  reviewId: string;
  content: string;
  createdAt: string;
  likes: number;
};

export type WatchlistItem = {
  id: string;
  userId: string;
  mediaId: string;
  addedAt: string;
};

export type Purchase = {
  id: string;
  userId: string;
  mediaId: string;
  type: 'buy' | 'rent';
  price: number;
  purchaseDate: string;
  expiryDate?: string; // For rentals
  streamingLink: string;
};