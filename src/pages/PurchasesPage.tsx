import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Play, AlertCircle, ExternalLink } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';

const PurchasesPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { 
    getPurchases, 
    purchases, 
    getPurchasedMedia, 
    isLoading 
  } = useUserStore();
  
  useEffect(() => {
    if (isAuthenticated && user) {
      getPurchases(user.id);
    }
  }, [isAuthenticated, user, getPurchases]);
  
  const purchasedMedia = getPurchasedMedia();
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto p-8 text-center">
            <AlertCircle className="mx-auto mb-4 text-yellow-500" size={48} />
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-gray-300 mb-6">
              You need to be signed in to view your purchases.
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
          <ShoppingBag className="mr-3 text-purple-500" size={28} />
          <h1 className="text-3xl font-bold">My Purchases</h1>
        </div>
        
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500 border-r-2 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your purchases...</p>
          </div>
        ) : purchases.length > 0 ? (
          <div className="space-y-6">
            {purchases.map((purchase) => {
              const media = purchasedMedia.find(m => m.id === purchase.mediaId);
              
              if (!media) return null;
              
              return (
                <div key={purchase.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 lg:w-1/5 shrink-0">
                      <img 
                        src={media.poster} 
                        alt={media.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap justify-between items-start mb-3">
                        <div>
                          <h2 className="text-xl font-bold mb-1">{media.title}</h2>
                          <div className="flex items-center text-sm text-gray-400 mb-4">
                            <span className="mr-3">{media.releaseYear}</span>
                            <span className="mr-3">{media.duration}</span>
                            <span>{media.type === 'movie' ? 'Movie' : 'Series'}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            purchase.type === 'buy' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          }`}>
                            {purchase.type === 'buy' ? 'Purchased' : 'Rental'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4 flex-1">
                        <p className="text-gray-300 line-clamp-2 mb-4">{media.synopsis}</p>
                        <div className="flex flex-wrap gap-1">
                          {media.genres.slice(0, 3).map((genre, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-300"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-700">
                        <div className="text-sm">
                          <div>
                            <span className="text-gray-400 mr-1">Purchased:</span>
                            {new Date(purchase.purchaseDate).toLocaleDateString()}
                          </div>
                          {purchase.type === 'rent' && purchase.expiryDate && (
                            <div>
                              <span className="text-gray-400 mr-1">Expires:</span>
                              {new Date(purchase.expiryDate).toLocaleDateString()}
                            </div>
                          )}
                          <div>
                            <span className="text-gray-400 mr-1">Price:</span>
                            ${purchase.price}
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <a 
                            href={purchase.streamingLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Button 
                              size="sm" 
                              variant="outline"
                              leftIcon={<ExternalLink size={16} />}
                            >
                              Stream Link
                            </Button>
                          </a>
                          <Button 
                            size="sm" 
                            leftIcon={<Play size={16} className="ml-0.5" />}
                          >
                            Watch Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="mb-4">
              <ShoppingBag className="mx-auto text-gray-500" size={48} />
            </div>
            <h2 className="text-xl font-semibold mb-2">No purchases yet</h2>
            <p className="text-gray-400 mb-6">
              Explore our collection and buy or rent your favorite movies and series.
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

export default PurchasesPage;