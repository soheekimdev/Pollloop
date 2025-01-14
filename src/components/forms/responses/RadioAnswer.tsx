import { useState, useEffect } from 'react';
import Radio from '@/components/form/Radio';
import Input from '@/components/form/Input';
import { Question } from '@/types/forms/forms.types';

interface RadioAnswerProps {
  data: Question;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function RadioAnswer({ data, value, onChange, readOnly }: RadioAnswerProps) {
  const [etcText, setEtcText] = useState('');
  const [showEtcInput, setShowEtcInput] = useState(false);

  const etcOption = data.options_of_questions.find(option => option.option_number === 99);

  useEffect(() => {
    if (value?.startsWith('99-')) {
      const etcValue = value.split('-')[2] || '';
      setEtcText(etcValue);
      setShowEtcInput(true);
    } else {
      setShowEtcInput(false);
      setEtcText('');
    }
  }, [value]);

  const handleChange = (optionNumber: number, optionContext: string) => {
    if (optionNumber === 99) {
      onChange(`99-기타-${etcText}`);
      setShowEtcInput(true);
    } else {
      onChange(optionContext);
      setShowEtcInput(false);
    }
  };

  const handleEtcTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setEtcText(newText);
    onChange(`99-기타-${newText}`);
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col items-start gap-2 w-full">
        {data.options_of_questions.map(option => {
          const isEtcOption = option.option_number === 99;

          return (
            <label
              key={option.option_number}
              className="flex items-center gap-2 min-w-40 min-h-10 w-full bg-pollloop-bg-02 p-2 rounded-lg cursor-pointer group"
            >
              <Radio
                name={`question-${data.question_order}`}
                id={`option-${data.question_order}-${option.option_number}`}
                value={option.option_context}
                checked={isEtcOption && !readOnly ? showEtcInput : value === option.option_context}
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
            placeholder="기타 응답을 입력하세요"
            className="ml-8 w-[calc(100%-2rem)]"
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  );
}
