import Button from '@/components/common/Button';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Plus, X } from 'lucide-react';
import { Option, Question } from '@/types/forms';
import { useOptions } from '@/hooks/useOptions';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface EditableOptionsAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
  type: 'checkbox' | 'radio';
}

const optionIconVariants = cva(
  'flex items-center justify-center w-5 h-5 bg-pollloop-bg-02 border border-pollloop-brown-01 text-pollloop-light-beige',
  {
    variants: {
      type: {
        checkbox: 'rounded',
        radio: 'rounded-full',
      },
    },
    defaultVariants: {
      type: 'checkbox',
    },
  },
);

export function EditableOptionsAnswer({ data, onUpdate, type }: EditableOptionsAnswerProps) {
  const { options, handleAddOption, handleChangeOption, handleDeleteOption } = useOptions(
    data.options_of_questions,
    onUpdate,
    data.hasEtcOption,
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  const isEtcOption = (option: Option) => option.isEtcOption;

  const getDefaultOptionText = (option: Option) => {
    const nonEtcOptions = options.filter(opt => !opt.isEtcOption);
    const optionIndex = nonEtcOptions.findIndex(opt => opt.option_number === option.option_number);
    return `옵션 ${optionIndex + 1}`;
  };

  const [focusedInputs, setFocusedInputs] = useState<Record<string, boolean>>({});

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>, optionNumber: string) => {
    e.target.select();

    setFocusedInputs(prev => ({
      ...prev,
      [optionNumber]: true,
    }));
  };

  const handleBlur = (index: number, option: Option) => {
    setFocusedInputs(prev => ({
      ...prev,
      [option.option_number]: false,
    }));

    if (!option.option_context.trim() && !option.isEtcOption) {
      handleChangeOption(index, getDefaultOptionText(option));
    }
  };

  const getDisplayValue = (option: Option) => {
    if (isEtcOption(option)) return option.option_context;
    if (focusedInputs[option.option_number]) return option.option_context;
    return option.option_context || getDefaultOptionText(option);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text={type === 'checkbox' ? '체크박스' : '라디오'} />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-col items-start gap-2 w-full">
          {options.map((option, index) => (
            <label
              key={option.option_number}
              className="flex items-center gap-2 min-w-40 w-full bg-pollloop-bg-02 p-2 rounded-lg cursor-pointer group"
            >
              <div className={cn(optionIconVariants({ type }))} />
              <input
                className={cn(
                  'flex-1 bg-transparent text-sm placeholder:text-input-placeholder focus-visible:outline-none',
                  isEtcOption(option) ? 'cursor-default' : 'cursor-pointer',
                )}
                placeholder="옵션"
                value={getDisplayValue(option)}
                onChange={e => handleChangeOption(index, e.target.value)}
                onFocus={e => {
                  handleFocus(e, option.option_number);
                }}
                onBlur={() => {
                  handleBlur(index, option);
                }}
                disabled={isEtcOption(option)}
              />
              {!isEtcOption(option) && (
                <button
                  type="button"
                  onClick={() => handleDeleteOption(index)}
                  className="hover:text-tag-default-text/65"
                  aria-label="옵션 삭제"
                >
                  <X size={16} />
                </button>
              )}
            </label>
          ))}
        </div>

        <Button type="button" onClick={handleAddOption}>
          <Plus size={16} />
          옵션 추가
        </Button>
      </div>
    </>
  );
}
