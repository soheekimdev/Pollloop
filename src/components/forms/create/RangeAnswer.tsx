import Select from '@/components/form/Select';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import FormsLabel from '@/components/forms/create/FormsLabel';
import FormsInput from '@/components/forms/create/FormsInput';
import { Question } from '@/types/forms/forms.types';
import { OPTION_NUMBERS } from '@/constants/forms.constants';
import { useEffect, useState } from 'react';

interface RangeAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function RangeAnswer({ data, onUpdate }: RangeAnswerProps) {
  const [minValue, setMinValue] = useState('1');
  const [maxValue, setMaxValue] = useState('5');

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  const minOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
  ];

  const maxOptions = Array.from({ length: 9 }, (_, i) => ({
    value: String(i + 2),
    label: String(i + 2),
  }));

  const updateOptions = () => {
    const min = parseInt(minValue);
    const max = parseInt(maxValue);

    // 숫자 옵션 생성 - option_number를 실제 값과 일치시킴
    const numberOptions = Array.from({ length: max - min + 1 }, (_, i) => ({
      option_number: min + i, // 0부터 시작
      option_context: String(min + i),
    }));

    // 현재 라벨 찾기
    const minLabel =
      data.options_of_questions?.find(opt => opt.option_number === OPTION_NUMBERS.MIN_LABEL)
        ?.option_context || '';
    const maxLabel =
      data.options_of_questions?.find(opt => opt.option_number === OPTION_NUMBERS.MAX_LABEL)
        ?.option_context || '';

    // 전체 옵션 구성 - 라벨에 정확한 option_number 적용
    const allOptions = [
      ...numberOptions,
      {
        option_number: OPTION_NUMBERS.MIN_LABEL,
        option_context: minLabel,
      },
      {
        option_number: OPTION_NUMBERS.MAX_LABEL,
        option_context: maxLabel,
      },
    ];

    onUpdate({ options_of_questions: allOptions });
  };

  const handleRangeChange = (type: 'min' | 'max', value: string) => {
    const newMin = type === 'min' ? value : minValue;
    const newMax = type === 'max' ? value : maxValue;

    if (type === 'min') {
      setMinValue(value);
    } else {
      setMaxValue(value);
    }

    const numberOptions = Array.from(
      { length: parseInt(newMax) - parseInt(newMin) + 1 },
      (_, i) => ({
        option_number: parseInt(newMin) + i,
        option_context: String(parseInt(newMin) + i),
      }),
    );

    const minLabel =
      data.options_of_questions?.find(opt => opt.option_number === OPTION_NUMBERS.MIN_LABEL)
        ?.option_context || '';

    const maxLabel =
      data.options_of_questions?.find(opt => opt.option_number === OPTION_NUMBERS.MAX_LABEL)
        ?.option_context || '';

    onUpdate({
      options_of_questions: [
        ...numberOptions,
        {
          option_number: OPTION_NUMBERS.MIN_LABEL,
          option_context: minLabel,
        },
        {
          option_number: OPTION_NUMBERS.MAX_LABEL,
          option_context: maxLabel,
        },
      ],
    });
  };

  const handleLabelChange = (type: 'min' | 'max', value: string) => {
    const min = parseInt(minValue);
    const max = parseInt(maxValue);

    // 숫자 옵션 생성
    const numberOptions = Array.from({ length: max - min + 1 }, (_, i) => ({
      option_number: min + i,
      option_context: String(min + i),
    }));

    // 현재 다른 라벨 찾기
    const otherLabel =
      data.options_of_questions?.find(
        opt =>
          opt.option_number ===
          (type === 'min' ? OPTION_NUMBERS.MAX_LABEL : OPTION_NUMBERS.MIN_LABEL),
      )?.option_context || '';

    // 전체 옵션 구성
    const allOptions = [
      ...numberOptions,
      {
        option_number: OPTION_NUMBERS.MIN_LABEL,
        option_context: type === 'min' ? value : otherLabel,
      },
      {
        option_number: OPTION_NUMBERS.MAX_LABEL,
        option_context: type === 'max' ? value : otherLabel,
      },
    ];

    onUpdate({ options_of_questions: allOptions });
  };

  useEffect(() => {
    // 초기 옵션 설정
    updateOptions();
  }, []);

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
          <Select
            options={minOptions}
            value={minValue}
            onChange={e => handleRangeChange('min', e.target.value)}
            className="w-20"
          />
          ~
          <Select
            options={maxOptions}
            value={maxValue}
            onChange={e => handleRangeChange('max', e.target.value)}
            className="w-20"
          />
        </div>

        <div className="flex gap-4 w-full">
          <InputWithLabel className="flex-1">
            <Label text="최솟값 라벨" />
            <Input
              onChange={e => handleLabelChange('min', e.target.value)}
              value={
                data.options_of_questions?.find(
                  opt => opt.option_number === OPTION_NUMBERS.MIN_LABEL,
                )?.option_context || ''
              }
            />
          </InputWithLabel>
          <InputWithLabel className="flex-1">
            <Label text="최댓값 라벨" />
            <Input
              onChange={e => handleLabelChange('max', e.target.value)}
              value={
                data.options_of_questions?.find(
                  opt => opt.option_number === OPTION_NUMBERS.MAX_LABEL,
                )?.option_context || ''
              }
            />
          </InputWithLabel>
        </div>
      </div>
    </>
  );
}
