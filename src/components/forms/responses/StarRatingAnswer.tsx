import { useState } from 'react';
import { Question } from '@/types/forms/forms.types';
import { Star } from 'lucide-react';

interface StarRatingAnswerProps {
  data: Question;
  onChange: (value: string) => void;
}

export default function StarRatingAnswer({ data, onChange }: StarRatingAnswerProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    onChange(rating.toString());
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }, (_, i) => i + 1).map(rating => (
        <Star
          key={rating}
          size={24}
          className="cursor-pointer hover:scale-110 transition-transform"
          fill={rating <= selectedRating ? '#FACC15' : 'transparent'}
          strokeWidth={1.5}
          onClick={() => handleRatingClick(rating)}
        />
      ))}
    </div>
  );
}
