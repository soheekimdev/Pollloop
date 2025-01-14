import { Question, QuestionType } from '@/types/forms/forms.types';
import { Star } from 'lucide-react';

interface StarRatingAnswerProps {
  data: Question;
  value?: string;
  onChange: (type: QuestionType, value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function StarRatingAnswer({
  data,
  value,
  onChange,
  readOnly = false,
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
  );
}
