import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, AlertTriangle } from 'lucide-react';
import { Review, Comment } from '../../types';
import StarRating from '../common/StarRating';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useReviewStore } from '../../store/reviewStore';

interface ReviewCardProps {
  review: Review;
  showComments?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, showComments = false }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showSpoiler, setShowSpoiler] = useState(!review.hasSpoilers);
  
  const { user, isAuthenticated } = useAuthStore();
  const { 
    reviewComments, 
    getCommentsForReview, 
    likeReview, 
    addComment 
  } = useReviewStore();
  
  const handleLike = () => {
    if (isAuthenticated) {
      likeReview(review.id);
    }
  };
  
  const handleShowComments = () => {
    if (!showComments) {
      getCommentsForReview(review.id);
      setIsCommenting(true);
    }
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAuthenticated && user && commentText.trim()) {
      addComment({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        reviewId: review.id,
        content: commentText.trim()
      });
      
      setCommentText('');
    }
  };
  
  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div className="bg-gray-800 rounded-lg p-5 mb-6">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mr-4">
          <img
            src={review.userAvatar || 'https://i.pravatar.cc/150?img=1'}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-white">{review.userName}</h3>
            <span className="text-sm text-gray-400">{formattedDate}</span>
          </div>
          <div className="flex items-center mb-1">
            <StarRating initialRating={review.rating} readonly size="sm" />
            <span className="ml-2 text-yellow-400 font-medium">{review.rating}/10</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {review.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Review content with spoiler protection */}
      <div className="mb-4">
        {review.hasSpoilers && !showSpoiler ? (
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <AlertTriangle className="inline-block text-yellow-500 mb-2" size={24} />
            <p className="text-gray-300 mb-2">This review contains spoilers</p>
            <button
              onClick={() => setShowSpoiler(true)}
              className="text-sm text-purple-500 hover:text-purple-400 transition-colors"
            >
              Show anyway
            </button>
          </div>
        ) : (
          <p className="text-gray-300 mb-2 whitespace-pre-line">{review.content}</p>
        )}
      </div>
      
      {/* Interactions */}
      <div className="flex items-center justify-between text-gray-400">
        <button 
          onClick={handleLike}
          className="flex items-center hover:text-purple-500 transition-colors"
          disabled={!isAuthenticated}
        >
          <ThumbsUp size={18} className="mr-1" />
          <span>{review.likes}</span>
        </button>
        
        <button 
          onClick={handleShowComments}
          className="flex items-center hover:text-purple-500 transition-colors"
        >
          <MessageCircle size={18} className="mr-1" />
          <span>{reviewComments.length}</span>
        </button>
      </div>
      
      {/* Comments section */}
      {showComments || isCommenting ? (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Comments</h4>
          
          {/* Comment form */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="mb-4">
              <div className="flex">
                <img
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={2}
                  />
                  <div className="flex justify-end mt-2">
                    <Button 
                      type="submit" 
                      size="sm" 
                      disabled={!commentText.trim()}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <p className="text-sm text-gray-400 mb-4">
              Please <a href="/login" className="text-purple-500 hover:text-purple-400">login</a> to comment.
            </p>
          )}
          
          {/* Comments list */}
          <div className="space-y-4">
            {reviewComments.map((comment) => (
              <div key={comment.id} className="flex">
                <img
                  src={comment.userAvatar || 'https://i.pravatar.cc/150?img=1'}
                  alt={comment.userName}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <div className="flex-1 bg-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="text-sm font-medium text-white">{comment.userName}</h5>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{comment.content}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <button className="hover:text-purple-500 transition-colors flex items-center">
                      <ThumbsUp size={14} className="mr-1" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {reviewComments.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-2">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewCard;