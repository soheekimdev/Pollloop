import { useState, useEffect } from 'react';
import Checkbox from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import { AnswerOption, MultiOptionAnswerProps } from '@/types/forms/forms.types';

type CheckboxAnswerProps = MultiOptionAnswerProps;

export default function CheckboxAnswer({
  data,
  value = [],
  onChange,
  readOnly = false,
  error,
}: CheckboxAnswerProps) {
  const [etcText, setEtcText] = useState('');
  const [showEtcInput, setShowEtcInput] = useState(false);

  const etcOption = data.options_of_questions.find(option => option.option_number === 99);

  useEffect(() => {
    const etcValue = value.find(v => v.optionNumber === 99);
    if (etcValue) {
      setEtcText(etcValue.context);
      setShowEtcInput(true);
    } else {
      setShowEtcInput(false);
      setEtcText('');
    }
  }, [value]);

  const handleChange = (optionNumber: number, context: string) => {
    let newValue: AnswerOption[];

    if (optionNumber === 99) {
      if (value.some(v => v.optionNumber === 99)) {
        // 기타 옵션 제거
        newValue = value.filter(v => v.optionNumber !== 99);
        setShowEtcInput(false);
        setEtcText('');
      } else {
        // 기타 옵션 추가
        newValue = [...value, { optionNumber: 99, context: etcText }];
        setShowEtcInput(true);
      }
    } else {
      const optionExists = value.some(v => v.optionNumber === optionNumber);
      if (optionExists) {
        // 기존 옵션 제거
        newValue = value.filter(v => v.optionNumber !== optionNumber);
      } else {
        // 새 옵션 추가
        newValue = [...value, { optionNumber, context }];
      }
    }

    onChange(data.layout_type, newValue);
  };

  const handleEtcTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setEtcText(newText);

    const newValue = value.map(v => (v.optionNumber === 99 ? { ...v, context: newText } : v));

    onChange(data.layout_type, newValue);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2 w-full">
        {data.options_of_questions.map(option => {
          const isEtcOption = option.option_number === 99;
          const isChecked = value.some(v => v.optionNumber === option.option_number);

          return (
            <label
              key={option.option_number}
              className="flex items-center gap-2 min-w-40 h-10 w-full bg-pollloop-bg-02 p-2 rounded-lg cursor-pointer group"
            >
              <Checkbox
                name={`question-${data.question_order}`}
                id={`option-${data.question_order}-${option.option_number}`}
                value={option.option_context}
                checked={isEtcOption && !readOnly ? showEtcInput : isChecked}
                onChange={() => handleChange(option.option_number, option.option_context)}
                readOnly={readOnly}
              />
              <div>{option.option_context}</div>
            </label>
          );
        })}

        {etcOption && showEtcInput && !readOnly && (
          <Input
            type="text"
            value={etcText}
            onChange={handleEtcTextChange}
            placeholder="기타 내용을 입력하세요"
            className="ml-8 w-[calc(100%-2rem)]"
            readOnly={readOnly}
          />
        )}
      </div>

      {error && <p className="text-xs text-status-red-text mt-1">{error}</p>}
    </div>
  );
}
