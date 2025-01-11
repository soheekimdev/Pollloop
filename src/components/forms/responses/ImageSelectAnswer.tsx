import PlaceholderImage from '@/components/common/PlaceholderImage';
import { Check } from 'lucide-react';
import { Question } from '@/types/forms/forms.types';

interface ImageSelectAnswerProps {
  data: Question;
  onChange: (value: string) => void;
  value?: string;
}

export default function ImageSelectAnswer({ data, onChange, value }: ImageSelectAnswerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {data.options_of_questions.map(option => (
        <div
          key={option.option_number}
          className="relative group w-full select-none"
          onClick={() => onChange(option.option_number.toString())}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onChange(option.option_number.toString());
            }
          }}
        >
          <div
            className={`
              relative aspect-square border-pollloop-orange rounded-lg overflow-hidden cursor-pointer hover:border
              ${value === option.option_number.toString() && 'border-[3px] hover:border-[3px]'}
            `}
          >
            {option.option_context ? (
              <img
                src={option.option_context}
                alt={`${option.option_number}번`}
                className="w-full h-full object-cover"
              />
            ) : (
              <PlaceholderImage text={`${option.option_number}번`} />
            )}
            {value === option.option_number.toString() && (
              <>
                <div className="absolute inset-0 bg-pollloop-brown-01/10" />
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-pollloop-orange flex items-center justify-center z-10">
                  <Check className="w-4 h-4 text-pollloop-light-beige" />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
