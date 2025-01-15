import Select from '@/components/form/Select';
import { AnswerOption, Question, QuestionType } from '@/types/forms/forms.types';

interface DropdownAnswerProps {
  data: Question;
  value?: AnswerOption;
  onChange: (type: QuestionType, value: AnswerOption) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function DropdownAnswer({
  data,
  value,
  onChange,
  disabled = false,
}: DropdownAnswerProps) {
  const defaultOption = {
    value: 'default',
    label: '선택',
    disabled: true,
    defaultValue: true,
  };

  const convertedOptions = [
    defaultOption,
    ...data.options_of_questions.map(option => ({
      value: option.option_number.toString(),
      label: option.option_context || `옵션 ${option.option_number}`,
      disabled: false,
      defaultValue: false,
    })),
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNumber = Number(e.target.value);
    const selectedOption = data.options_of_questions.find(
      opt => opt.option_number === selectedNumber,
    );

    if (selectedOption) {
      onChange(data.layout_type, {
        optionNumber: selectedOption.option_number,
        context: selectedOption.option_context,
      });
    }
  };

  return (
    <div className="space-y-2">
      <Select
        options={convertedOptions}
        value={value?.optionNumber.toString() || defaultOption.value}
        onChange={handleSelectChange}
        required={data.is_required}
        disabled={disabled}
      />
    </div>
  );
}
