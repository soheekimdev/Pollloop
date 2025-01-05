import { useState } from 'react';
import Button from '@/components/common/Button';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Plus, X } from 'lucide-react';
import { Option, Question } from '@/types/forms';

interface CheckboxAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function CheckboxAnswer({ data, onUpdate }: CheckboxAnswerProps) {
  const [options, setOptions] = useState<Option[]>(data.options_of_questions || []);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  const handleAddOption = () => {
    const updatedOptions = [
      ...options,
      {
        option_number: (options.length + 1).toString(),
        option_context: '',
      },
    ];
    setOptions(updatedOptions);
    onUpdate({ options_of_questions: updatedOptions });
  };

  const handleChangeOption = (index: number, value: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, option_context: value } : option,
    );
    setOptions(updatedOptions);
    onUpdate({ options_of_questions: updatedOptions });
  };

  const handleDeleteOption = (index: number) => {
    const filteredOptions = options.filter((_, i) => i !== index);
    const updatedOptions = filteredOptions.map((option, i) => ({
      ...option,
      option_number: (i + 1).toString(),
    }));
    setOptions(updatedOptions);
    onUpdate({ options_of_questions: updatedOptions });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="체크박스" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-col items-start gap-2">
          {options.map((option, index) => (
            <label
              key={option.option_number}
              className="flex items-center gap-1 min-w-40 bg-pollloop-bg-02 p-2 rounded-lg cursor-pointer"
            >
              <div className="flex items-center justify-center w-5 h-5 bg-pollloop-bg-02 border border-pollloop-brown-01 text-pollloop-light-beige rounded" />
              <input
                className="w-full bg-transparent text-sm placeholder:text-input-placeholder focus-visible:outline-none cursor-pointer"
                placeholder="옵션"
                value={option.option_context}
                onChange={e => handleChangeOption(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleDeleteOption(index)}
                aria-label="옵션 삭제"
              >
                <X size={16} className="hover:text-body/65" />
              </button>
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
