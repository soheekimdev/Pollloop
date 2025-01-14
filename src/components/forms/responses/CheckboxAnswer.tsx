import { useState, useEffect } from 'react';
import Checkbox from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import { Question } from '@/types/forms/forms.types';

interface CheckboxAnswerProps {
  data: Question;
  value?: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function CheckboxAnswer({ data, value = [], onChange }: CheckboxAnswerProps) {
  const [etcText, setEtcText] = useState('');
  const [showEtcInput, setShowEtcInput] = useState(false);

  const etcOption = data.options_of_questions.find(option => option.option_number === 99);

  const getOptionId = (option: { option_number: number; option_context: string }) =>
    `${option.option_number}-${option.option_context}`;

  useEffect(() => {
    const hasEtcValue = value.some(v => v.startsWith('99-'));
    if (hasEtcValue) {
      const etcValue = value.find(v => v.startsWith('99-'))?.split('-')[2] || '';
      setEtcText(etcValue);
      setShowEtcInput(true);
    } else {
      setShowEtcInput(false);
      setEtcText('');
    }
  }, [value]);

  const handleChange = (optionId: string, isEtc = false) => {
    let newValue: string[];

    if (isEtc) {
      if (value.some(v => v.startsWith('99-'))) {
        newValue = value.filter(v => !v.startsWith('99-'));
        setShowEtcInput(false);
        setEtcText('');
      } else {
        newValue = [...value, `99-기타-${etcText}`];
        setShowEtcInput(true);
      }
    } else {
      newValue = value.includes(optionId)
        ? value.filter(v => v !== optionId)
        : [...value, optionId];
    }

    onChange(newValue);
  };

  const handleEtcTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setEtcText(newText);

    const newValue = value.map(v => (v.startsWith('99-') ? `99-기타-${newText}` : v));

    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col items-start gap-2 w-full">
        {data.options_of_questions.map(option => {
          const isEtcOption = option.option_number === 99;
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
                checked={isEtcOption ? showEtcInput : value.includes(optionId)}
                onChange={() => handleChange(optionId, isEtcOption)}
              />
              <div>{option.option_context}</div>
            </label>
          );
        })}

        {etcOption && showEtcInput && (
          <Input
            type="text"
            value={etcText}
            onChange={handleEtcTextChange}
            placeholder="기타 내용을 입력하세요"
            className="ml-8 w-[calc(100%-2rem)]"
          />
        )}
      </div>
    </div>
  );
}
