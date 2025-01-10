import Button from '@/components/common/Button';
import Input from '@/components/form/Input';
import FormsLabel from '@/components/forms/create/FormsLabel';
import FormsInput from '@/components/forms/create/FormsInput';
import { Plus, X } from 'lucide-react';
import { Question } from '@/types/forms/forms.types';
import { useOptions } from '@/hooks/useOptions';

interface DropdownAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function DropdownAnswer({ data, onUpdate }: DropdownAnswerProps) {
  const { options, handleAddOption, handleChangeOption, handleDeleteOption } = useOptions(
    data.options_of_questions,
    onUpdate,
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="드롭다운" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <div className="flex flex-col gap-4 items-start">
        {options.map((option, index) => (
          <div key={option.option_number} className="flex items-center gap-2 w-full">
            <Input
              placeholder="옵션"
              value={option.option_context}
              onChange={e => handleChangeOption(index, e.target.value)}
              className="w-full"
            />
            <button
              type="button"
              onClick={() => handleDeleteOption(index)}
              className="hover:text-tag-default-text/65"
              aria-label="옵션 삭제"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        <Button type="button" onClick={handleAddOption}>
          <Plus size={16} />
          옵션 추가
        </Button>
      </div>
    </>
  );
}
