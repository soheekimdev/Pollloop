import { Star } from 'lucide-react';
import { BaseAnswerProps } from '@/types/forms/forms.types';

type StarRatingAnswerProps = BaseAnswerProps;

export default function StarRatingAnswer({
  data,
  value,
  onChange,
  readOnly = false,
  error,
}: StarRatingAnswerProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const handleRatingClick = (rating: number) => {
    onChange(data.layout_type, rating.toString());
  };

  if (readOnly) {
    return (
      <div className="flex gap-2">
        {stars.map(rating => (
          <Star
            key={rating}
            size={24}
            className="text-pollloop-brown-01"
            fill="transparent"
            strokeWidth={1.5}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {stars.map(rating => (
          <Star
            key={rating}
            size={24}
            className="cursor-pointer hover:scale-110 transition-transform"
            fill={Number(value) >= rating ? '#FACC15' : 'transparent'}
            strokeWidth={1.5}
            onClick={() => handleRatingClick(rating)}
          />
        ))}
      </div>

      {error && <p className="text-xs text-status-red-text">{error}</p>}
    </div>
  );
}
