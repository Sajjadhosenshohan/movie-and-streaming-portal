import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, AlertCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MediaGrid from '../components/media/MediaGrid';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';

const WatchlistPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { 
    getWatchlist, 
    removeFromWatchlist, 
    watchlist, 
    getWatchlistMedia, 
    isLoading 
  } = useUserStore();
  
  useEffect(() => {
    if (isAuthenticated && user) {
      getWatchlist(user.id);
    }
  }, [isAuthenticated, user, getWatchlist]);
  
  const watchlistMedia = getWatchlistMedia();
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto p-8 text-center">
            <AlertCircle className="mx-auto mb-4 text-yellow-500" size={48} />
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-gray-300 mb-6">
              You need to be signed in to view and manage your watchlist.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Clock className="mr-3 text-purple-500" size={28} />
          <h1 className="text-3xl font-bold">My Watchlist</h1>
        </div>
        
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500 border-r-2 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your watchlist...</p>
          </div>
        ) : watchlistMedia.length > 0 ? (
          <MediaGrid 
            media={watchlistMedia}
            emptyMessage="Your watchlist is empty. Start browsing and add titles you want to watch later."
          />
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="mb-4">
              <Clock className="mx-auto text-gray-500" size={48} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-gray-400 mb-6">
              Start browsing and add movies or series you want to watch later.
            </p>
            <Link to="/browse">
              <Button>Browse Content</Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default WatchlistPage;