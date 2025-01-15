import PlaceholderImage from '@/components/common/PlaceholderImage';
import { Check } from 'lucide-react';
import { Option, OptionAnswerProps } from '@/types/forms/forms.types';

type ImageSelectAnswerProps = OptionAnswerProps;

export default function ImageSelectAnswer({
  data,
  value,
  onChange,
  error,
}: ImageSelectAnswerProps) {
  const handleImageSelect = (option: Option) => {
    onChange(data.layout_type, {
      optionNumber: option.option_number,
      context: option.option_context, // URL string
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {data.options_of_questions.map(option => (
          <div
            key={option.option_number}
            className="relative group w-full select-none"
            onClick={() => handleImageSelect(option)}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleImageSelect(option);
              }
            }}
          >
            <div
              className={`
              relative aspect-square border-pollloop-orange rounded-lg overflow-hidden cursor-pointer hover:border
              ${value?.optionNumber === option.option_number && 'border-[3px] hover:border-[3px]'}
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
              {value?.optionNumber === option.option_number && (
                <>
                  <div className="absolute inset-0 bg-pollloop-brown-01/10" />
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-pollloop-orange flex items-center justify-center z-10">
                    <Check className="w-4 h-4 text-pollloop-light-beige" />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {error && <p className="text-xs text-status-red-text">{error}</p>}
    </div>
  );
}
