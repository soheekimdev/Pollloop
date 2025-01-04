import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Star } from 'lucide-react';
import { Question } from '@/types/forms';

interface StarRatingAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function StarRatingAnswer({ data, onUpdate }: StarRatingAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="별점" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <div className="flex gap-2">
        {stars.map(rating => (
          <Star
            key={rating}
            size={24}
            className="text-pollloop-brown-01 cursor-pointer"
            fill="transparent"
            strokeWidth={1.5}
          />
        ))}
      </div>
    </>
  );
}
