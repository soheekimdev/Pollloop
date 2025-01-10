import Radio from '@/components/form/Radio';
import { Question } from '@/types/forms/forms.types';

interface RadioAnswerProps {
  data: Question;
  value?: string;
  onChange: (value: string) => void;
}

export default function RadioAnswer({ data, value, onChange }: RadioAnswerProps) {
  const handleChange = (optionNumber: number, optionContext: string) => {
    onChange(optionContext);
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col items-start gap-2 w-full">
        {data.options_of_questions.map(option => (
          <label
            key={option.option_number}
            className="flex items-center gap-2 min-w-40 h-10 w-full bg-pollloop-bg-02 p-2 rounded-lg cursor-pointer group"
          >
            <Radio
              name={`question-${data.id}`}
              id={`option-${option.option_number}`}
              value={option.option_context}
              checked={value === option.option_context}
              onChange={() => handleChange(option.option_number, option.option_context)}
            />
            <div>{option.option_context}</div>
          </label>
        ))}
      </div>
    </div>
  );
}
