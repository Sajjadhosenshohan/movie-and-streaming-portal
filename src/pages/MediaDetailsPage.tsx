import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Clock, Star, Plus, Check, Play, Share2, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import StarRating from '../components/common/StarRating';
import ReviewCard from '../components/reviews/ReviewCard';
import MediaGrid from '../components/media/MediaGrid';
import { useMediaStore } from '../store/mediaStore';
import { useReviewStore } from '../store/reviewStore';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';
import { movies } from '../data/mockData';

const MediaDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [hasSpoilers, setHasSpoilers] = useState(false);
  const [reviewTags, setReviewTags] = useState('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  
  const { getMediaById, selectedMedia, isLoading: mediaLoading } = useMediaStore();
  const { getReviewsForMedia, mediaReviews, addReview, isLoading: reviewsLoading } = useReviewStore();
  const { user, isAuthenticated } = useAuthStore();
  const { 
    addToWatchlist, 
    watchlist, 
    purchases, 
    purchaseMedia,
    isLoading: userLoading 
  } = useUserStore();
  
  useEffect(() => {
    if (id) {
      getMediaById(id);
      getReviewsForMedia(id);
    }
  }, [id, getMediaById, getReviewsForMedia]);
  
  const isInWatchlist = watchlist.some(item => item.mediaId === id);
  const hasPurchased = purchases.some(p => p.mediaId === id);
  
  const handleAddToWatchlist = () => {
    if (isAuthenticated && user && selectedMedia) {
      addToWatchlist(user.id, selectedMedia.id);
    }
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAuthenticated && user && selectedMedia && reviewContent && reviewRating > 0) {
      const tagsArray = reviewTags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(Boolean);
      
      addReview({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        mediaId: selectedMedia.id,
        rating: reviewRating,
        content: reviewContent,
        hasSpoilers,
        tags: tagsArray
      });
      
      // Reset form
      setReviewContent('');
      setReviewRating(0);
      setHasSpoilers(false);
      setReviewTags('');
      setShowReviewForm(false);
    }
  };
  
  const handlePurchase = (type: 'buy' | 'rent') => {
    if (isAuthenticated && user && selectedMedia) {
      purchaseMedia(user.id, selectedMedia.id, type);
      setShowPurchaseModal(false);
    }
  };
  
  if (mediaLoading || !selectedMedia) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-48 h-72 bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-8 w-64 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-700 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Banner */}
      <div 
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.6)), url(${selectedMedia.backdrop || selectedMedia.poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      <main className="relative z-10 -mt-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster and Actions */}
            <div className="md:w-1/3 lg:w-1/4 flex flex-col">
              <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-6">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedMedia.poster} 
                    alt={selectedMedia.title}
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="space-y-3">
                  {hasPurchased ? (
                    <Button 
                      fullWidth 
                      leftIcon={<Play size={18} />}
                    >
                      Watch Now
                    </Button>
                  ) : (
                    <Button 
                      fullWidth 
                      leftIcon={<ShoppingCart size={18} />}
                      onClick={() => setShowPurchaseModal(true)}
                    >
                      Buy or Rent
                    </Button>
                  )}
                  
                  {isAuthenticated && !isInWatchlist ? (
                    <Button 
                      variant="outline" 
                      fullWidth 
                      leftIcon={<Plus size={18} />}
                      onClick={handleAddToWatchlist}
                    >
                      Add to Watchlist
                    </Button>
                  ) : isAuthenticated ? (
                    <Button 
                      variant="outline" 
                      fullWidth 
                      leftIcon={<Check size={18} />}
                      disabled
                    >
                      In Watchlist
                    </Button>
                  ) : null}
                  
                  <Button 
                    variant="ghost" 
                    fullWidth 
                    leftIcon={<Share2 size={18} />}
                  >
                    Share
                  </Button>
                </div>
              </div>
              
              {/* Details Box */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Details</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Release Year</span>
                    <span>{selectedMedia.releaseYear}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Director</span>
                    <span>{selectedMedia.director}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span>{selectedMedia.duration}</span>
                  </div>
                  
                  {selectedMedia.type === 'series' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Seasons</span>
                        <span>{selectedMedia.seasons}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">Episodes</span>
                        <span>{selectedMedia.episodes}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="border-t border-gray-700 pt-3">
                    <div className="text-gray-400 mb-2">Genres</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMedia.genres.map((genre, index) => (
                        <Link
                          key={index}
                          to={`/browse?genre=${genre}`}
                          className="text-xs px-2 py-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                          {genre}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-3">
                    <div className="text-gray-400 mb-2">Available On</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMedia.streamingPlatforms.map((platform, index) => (
                        <Link
                          key={index}
                          to={`/browse?platform=${platform}`}
                          className="text-xs px-2 py-1 rounded-full bg-purple-900 hover:bg-purple-800 transition-colors"
                        >
                          {platform}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="md:w-2/3 lg:w-3/4">
              <div className="mb-8">
                <Link to="/browse" className="inline-flex items-center text-purple-500 hover:text-purple-400 mb-4 transition-colors">
                  <ArrowLeft size={16} className="mr-1" /> Back to Browse
                </Link>
                
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mr-2">
                    {selectedMedia.type === 'movie' ? 'Movie' : 'Series'}
                  </span>
                  <span className="text-sm text-gray-400">
                    {selectedMedia.releaseYear}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{selectedMedia.title}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-4">
                    <Star className="text-yellow-400 fill-yellow-400 w-5 h-5 mr-1" strokeWidth={1.5} />
                    <span className="font-medium text-yellow-400">{selectedMedia.rating}/10</span>
                  </div>
                  
                  {selectedMedia.buyPrice && (
                    <div className="mr-4">
                      <span className="text-sm text-gray-400 mr-1">Buy:</span>
                      <span className="font-medium">${selectedMedia.buyPrice}</span>
                    </div>
                  )}
                  
                  {selectedMedia.rentPrice && (
                    <div>
                      <span className="text-sm text-gray-400 mr-1">Rent:</span>
                      <span className="font-medium">${selectedMedia.rentPrice}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {selectedMedia.synopsis}
                </p>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Cast</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedia.cast.map((actor, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-gray-800 rounded-full text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Reviews Section */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Reviews</h2>
                  
                  {isAuthenticated && !showReviewForm && (
                    <Button 
                      size="sm"
                      onClick={() => setShowReviewForm(true)}
                    >
                      Write a Review
                    </Button>
                  )}
                </div>
                
                {/* Review Form */}
                {showReviewForm && (
                  <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium mb-4">Your Review</h3>
                    
                    <form onSubmit={handleSubmitReview}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Rating
                        </label>
                        <div className="flex items-center">
                          <StarRating 
                            totalStars={10} 
                            onChange={setReviewRating} 
                            size="lg"
                          />
                          <span className="ml-3 text-gray-300">
                            {reviewRating > 0 ? `${reviewRating}/10` : 'Select a rating'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Review
                        </label>
                        <textarea
                          value={reviewContent}
                          onChange={(e) => setReviewContent(e.target.value)}
                          rows={5}
                          className="w-full rounded-md bg-gray-800 border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white py-2 px-3"
                          placeholder="Share your thoughts on this title..."
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={reviewTags}
                          onChange={(e) => setReviewTags(e.target.value)}
                          className="w-full rounded-md bg-gray-800 border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 text-white py-2 px-3"
                          placeholder="e.g., masterpiece, action-packed, emotional"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={hasSpoilers}
                            onChange={(e) => setHasSpoilers(e.target.checked)}
                            className="rounded border-gray-600 text-purple-600 focus:ring-purple-500 mr-2"
                          />
                          <span className="text-sm text-gray-300">
                            This review contains spoilers
                          </span>
                        </label>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowReviewForm(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          size="sm"
                          disabled={!reviewContent || reviewRating === 0}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Reviews List */}
                {reviewsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500 border-r-2 mx-auto"></div>
                    <p className="mt-2 text-gray-400">Loading reviews...</p>
                  </div>
                ) : mediaReviews.length > 0 ? (
                  <div>
                    {mediaReviews.map(review => (
                      <ReviewCard key={review.id} review={review} showComments />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No reviews yet. Be the first to review!</p>
                  </div>
                )}
              </div>
              
              {/* Similar Titles */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">You Might Also Like</h2>
                <MediaGrid 
                  media={
                    // Get media with similar genres
                    // In a real app this would be a more sophisticated recommendation
                    [...selectedMedia.genres]
                      .map(genre => 
                        movies.filter(m => 
                          m.id !== selectedMedia.id && 
                          m.genres.includes(genre)
                        )
                      )
                      .flat()
                      .filter((media, index, self) => 
                        index === self.findIndex(m => m.id === media.id)
                      )
                      .slice(0, 4)
                  }
                  variant="compact"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Purchase {selectedMedia.title}</h3>
            
            <div className="space-y-4 mb-6">
              {selectedMedia.buyPrice && (
                <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">Buy</h4>
                    <p className="text-sm text-gray-400">Own it forever</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold mr-3">${selectedMedia.buyPrice}</span>
                    <Button 
                      size="sm"
                      onClick={() => handlePurchase('buy')}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              )}
              
              {selectedMedia.rentPrice && (
                <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium">Rent</h4>
                    <p className="text-sm text-gray-400">Watch for 48 hours</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold mr-3">${selectedMedia.rentPrice}</span>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => handlePurchase('rent')}
                    >
                      Rent
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost"
                onClick={() => setShowPurchaseModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default MediaDetailsPage;