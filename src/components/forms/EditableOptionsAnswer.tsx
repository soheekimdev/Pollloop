import { useState } from 'react';
import Button from '@/components/common/Button';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Plus, X } from 'lucide-react';
import { Option, Question } from '@/types/forms/forms.types';
import { useOptions } from '@/hooks/useOptions';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const { options, handleAddOption, handleChangeOption, handleDeleteOption } = useOptions(
    data.options_of_questions,
    onUpdate,
    data._frontend?.hasEtcOption ?? false,
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  const isEtcOption = (option: Option) => option.isEtcOption;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
    setFocusedIndex(index);
    e.target.select();
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
              className="flex items-center gap-2 min-w-40 h-10 w-full bg-pollloop-bg-02 p-2 rounded-lg cursor-pointer group"
            >
              <div className={cn(optionIconVariants({ type }))} />
              <div className="flex-1 flex gap-2 items-center relative">
                <input
                  className={cn(
                    'flex-1 bg-transparent text-sm placeholder:text-input-placeholder focus-visible:outline-none',
                    isEtcOption(option) ? 'cursor-default' : 'cursor-auto',
                  )}
                  placeholder="옵션"
                  value={option.option_context}
                  maxLength={255}
                  onFocus={e => handleFocus(e, index)}
                  onBlur={() => setFocusedIndex(null)}
                  onChange={e => handleChangeOption(index, e.target.value)}
                  disabled={isEtcOption(option)}
                />

                {!isEtcOption(option) && focusedIndex === index && (
                  <div
                    className={cn(
                      'text-xs',
                      option.option_context.length >= 230
                        ? 'text-status-red-text'
                        : 'text-input-tip',
                    )}
                  >
                    {option.option_context.length}/255
                  </div>
                )}
              </div>

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
