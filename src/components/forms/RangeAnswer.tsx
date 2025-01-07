import Select from '@/components/form/Select';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Question } from '@/types/forms/forms.types';
import { OPTION_NUMBERS } from '@/constants/forms.constants';

interface RangeAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function RangeAnswer({ data, onUpdate }: RangeAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  const minOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
  ];
  const maxOptions = [
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ];

  const handleLabelChange = (type: 'min' | 'max', value: string) => {
    const optionNumber = type === 'min' ? OPTION_NUMBERS.MIN_LABEL : OPTION_NUMBERS.MAX_LABEL;
    const newOptions = [...data.options_of_questions];
    const labelIndex = newOptions.findIndex(opt => opt.option_number === optionNumber);

    if (labelIndex === -1) {
      newOptions.push({
        option_number: optionNumber,
        option_context: value,
      });
    } else {
      newOptions[labelIndex].option_context = value;
    }

    onUpdate({ options_of_questions: newOptions });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="범위 선택" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <div className="flex flex-col gap-4 items-start">
        <div className="flex items-center gap-2">
          <Select options={minOptions} className="w-20" />
          ~
          <Select options={maxOptions} defaultValue="5" className="w-20" />
        </div>

        <div className="flex gap-4 w-full">
          <InputWithLabel className="flex-1">
            <Label text="최솟값 라벨" />
            <Input onChange={e => handleLabelChange('min', e.target.value)} />
          </InputWithLabel>
          <InputWithLabel className="flex-1">
            <Label text="최댓값 라벨" />
            <Input onChange={e => handleLabelChange('max', e.target.value)} />
          </InputWithLabel>
        </div>
      </div>
    </>
  );
}
