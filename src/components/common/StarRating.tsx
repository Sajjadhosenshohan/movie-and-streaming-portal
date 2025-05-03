import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
  readonly?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  totalStars = 5,
  size = 'md',
  onChange,
  readonly = false,
  className = '',
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  // Scale the 1-10 rating to a 1-5 star system if needed
  const scaledRating = totalStars === 5 && initialRating > 5 
    ? Math.round((initialRating / 10) * 5) 
    : initialRating;

  const handleClick = (index: number) => {
    if (readonly) return;
    
    const newRating = index;
    setRating(newRating);
    onChange?.(newRating);
  };

  const handleMouseEnter = (index: number) => {
    if (readonly) return;
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  // Size based on prop
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size];

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        const isActive = (hoverRating || rating) >= starValue;
        
        return (
          <span
            key={i}
            className={`cursor-${readonly ? 'default' : 'pointer'} transition-transform duration-100 ${
              isActive ? 'scale-110' : ''
            }`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            <Star
              className={`${sizeClass} ${
                isActive 
                  ? 'text-yellow-400 fill-yellow-400 filter drop-shadow-md' 
                  : 'text-gray-300 dark:text-gray-600'
              } transition-colors duration-200`}
              strokeWidth={1.5}
            />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;