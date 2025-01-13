import Checkbox from '@/components/form/Checkbox';
import { Question } from '@/types/forms/forms.types';

interface CheckboxAnswerProps {
  data: Question;
  value?: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function CheckboxAnswer({
  data,
  value = [],
  onChange,
  disabled = false,
  readOnly = false,
}: CheckboxAnswerProps) {
  const getOptionId = (option: { option_number: number; option_context: string }) =>
    `${option.option_number}-${option.option_context}`;

  const handleChange = (optionId: string) => {
    const newValue = value.includes(optionId)
      ? value.filter(v => v !== optionId)
      : [...value, optionId];

    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col items-start gap-2 w-full">
        {data.options_of_questions.map(option => {
          const optionId = getOptionId(option);

          return (
            <label
              key={option.option_number}
              className="flex items-center gap-2 min-w-40 h-10 w-full bg-pollloop-bg-02 p-2 rounded-lg cursor-pointer group"
            >
              <Checkbox
                name={`question-${data.question_order}`}
                id={`option-${data.question_order}-${option.option_number}`}
                value={option.option_context}
                checked={value.includes(optionId)}
                onChange={() => handleChange(optionId)}
                disabled={disabled}
                readOnly={readOnly}
              />
              <div>{option.option_context}</div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
