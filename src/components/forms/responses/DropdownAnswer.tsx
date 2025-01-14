import Select from '@/components/form/Select';
import { Question } from '@/types/forms/forms.types';

interface DropdownAnswerProps {
  data: Question;
  value: string;
  onChange: (value: string) => void;
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
      value: `${option.option_number}:${option.option_context}`,
      label: option.option_context || `옵션 ${option.option_number}`,
      disabled: false,
      defaultValue: false,
    })),
  ];

  return (
    <div className="space-y-2">
      <Select
        options={convertedOptions}
        value={value || defaultOption.value}
        onChange={e => onChange(e.target.value)}
        required={data.is_required}
        disabled={disabled}
      />
    </div>
  );
}
