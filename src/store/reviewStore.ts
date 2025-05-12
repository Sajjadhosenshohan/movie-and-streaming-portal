import { create } from 'zustand';
import { Review, Comment } from '../types';
import { reviews, comments } from '../data/mockData';

interface ReviewState {
  mediaReviews: Review[];
  selectedReview: Review | null;
  reviewComments: Comment[];
  isLoading: boolean;
  error: string | null;
}

interface ReviewStore extends ReviewState {
  getReviewsForMedia: (mediaId: string) => void;
  getReviewById: (reviewId: string) => void;
  getCommentsForReview: (reviewId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'likes' | 'isApproved'>) => void;
  likeReview: (reviewId: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => void;
  likeComment: (commentId: string) => void;
}


export const useReviewStore = create<ReviewStore>((set, get) => ({
  mediaReviews: [],
  selectedReview: null,
  reviewComments: [],
  isLoading: false,
  error: null,
  
  getReviewsForMedia: (mediaId: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd fetch from an API
      const mediaReviews = reviews.filter(r => r.mediaId === mediaId && r.isApproved);
      set({ mediaReviews, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load reviews', 
        isLoading: false 
      });
    }
  },
  
  getReviewById: (reviewId: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd fetch from an API
      const review = reviews.find(r => r.id === reviewId) || null;
      set({ selectedReview: review, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load review details', 
        isLoading: false 
      });
    }
  },
  
  getCommentsForReview: (reviewId: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd fetch from an API
      const reviewComments = comments.filter(c => c.reviewId === reviewId);
      set({ reviewComments, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load comments', 
        isLoading: false 
      });
    }
  },
  
  addReview: (review) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd send to an API
      const newReview: Review = {
        ...review,
        id: `${reviews.length + 1}`,
        createdAt: new Date().toISOString(),
        likes: 0,
        isApproved: false // Requires admin approval
      };
      
      // For demo, we'll just add it to our array and pretend it's approved
      const updatedReviews = [...reviews, { ...newReview, isApproved: true }];
      
      // In a real app, this would happen server-side
      reviews.push({ ...newReview, isApproved: true });
      
      set({ 
        mediaReviews: [...get().mediaReviews, { ...newReview, isApproved: true }],
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add review', 
        isLoading: false 
      });
    }
  },
  
  likeReview: (reviewId: string) => {
    try {
      // In a real app, we'd send to an API
      const updatedReviews = get().mediaReviews.map(r => 
        r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
      );
      
      // Update the original data (for demo purposes)
      const reviewIndex = reviews.findIndex(r => r.id === reviewId);
      if (reviewIndex !== -1) {
        reviews[reviewIndex].likes += 1;
      }
      
      set({ mediaReviews: updatedReviews });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to like review'
      });
    }
  },
  
  addComment: (comment) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, we'd send to an API
      const newComment: Comment = {
        ...comment,
        id: `${comments.length + 1}`,
        createdAt: new Date().toISOString(),
        likes: 0
      };
      
      // For demo, we'll just add it to our array
      comments.push(newComment);
      
      set({ 
        reviewComments: [...get().reviewComments, newComment],
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add comment', 
        isLoading: false 
      });
    }
  },
  
  likeComment: (commentId: string) => {
    try {
      // In a real app, we'd send to an API
      const updatedComments = get().reviewComments.map(c => 
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      );
      
      // Update the original data (for demo purposes)
      const commentIndex = comments.findIndex(c => c.id === commentId);
      if (commentIndex !== -1) {
        comments[commentIndex].likes += 1;
      }
      
      set({ reviewComments: updatedComments });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to like comment'
      });
    }
  }
}));
