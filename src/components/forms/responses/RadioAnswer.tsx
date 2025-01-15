import { useState, useEffect } from 'react';
import Radio from '@/components/form/Radio';
import Input from '@/components/form/Input';
import { OptionAnswerProps } from '@/types/forms/forms.types';

type RadioAnswerProps = OptionAnswerProps;

export default function RadioAnswer({
  data,
  value,
  onChange,
  readOnly = false,
  error,
}: RadioAnswerProps) {
  const [etcText, setEtcText] = useState('');
  const [showEtcInput, setShowEtcInput] = useState(false);

  const etcOption = data.options_of_questions.find(option => option.option_number === 99);

  useEffect(() => {
    if (value?.optionNumber === 99) {
      setEtcText(value.context);
      setShowEtcInput(true);
    } else {
      setShowEtcInput(false);
      setEtcText('');
    }
  }, [value]);

  const handleChange = (optionNumber: number, context: string) => {
    if (optionNumber === 99) {
      onChange(data.layout_type, {
        optionNumber: 99,
        context: etcText,
      });
      setShowEtcInput(true);
    } else {
      onChange(data.layout_type, {
        optionNumber,
        context,
      });
      setShowEtcInput(false);
    }
  };

  const handleEtcTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setEtcText(newText);
    onChange(data.layout_type, {
      optionNumber: 99,
      context: newText,
    });
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
                checked={
                  isEtcOption && !readOnly
                    ? showEtcInput
                    : value?.optionNumber === option.option_number
                }
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

      {error && <p className="text-xs text-status-red-text mt-1">{error}</p>}
    </div>
  );
}
