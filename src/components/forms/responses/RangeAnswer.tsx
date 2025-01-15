import Radio from '@/components/form/Radio';
import { Question, QuestionType } from '@/types/forms/forms.types';

interface RangeAnswerProps {
  data: Question;
  value?: string;
  onChange: (type: QuestionType, value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function RangeAnswer({ data, value, onChange, disabled = false }: RangeAnswerProps) {
  const minLabelOption = data.options_of_questions.find(option => option.option_number === 100);
  const maxLabelOption = data.options_of_questions.find(option => option.option_number === 200);
  const rangeOptions = data.options_of_questions.filter(
    option => option.option_number !== 100 && option.option_number !== 200,
  );

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-end justify-between">
      <p className="text-center">{minLabelOption?.option_context}</p>

      <div className="flex flex-row justify-between gap-1 md:gap-3 mb-1 scrollable">
        {rangeOptions.map(option => (
          <label key={option.option_number} className="flex flex-col items-center">
            <p>{option.option_context}</p>
            <Radio
              name={`question-${data.question_order}`}
              id={`option-${data.question_order}-${option.option_number}`}
              value={option.option_context}
              checked={value === option.option_context}
              onChange={() => onChange(data.layout_type, option.option_context)}
              disabled={disabled}
            />
          </label>
        ))}
      </div>

      <p className="text-center self-end">{maxLabelOption?.option_context}</p>
    </div>
  );
}
