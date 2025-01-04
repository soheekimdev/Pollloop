import Button from '@/components/common/Button';
import Input from '@/components/form/Input';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Plus } from 'lucide-react';
import { Question } from '@/types/forms';

interface DropdownAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function DropdownAnswer({ data, onUpdate }: DropdownAnswerProps) {
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
        <Input className="w-full" />

        <Button type="button">
          <Plus size={16} />
          옵션 추가
        </Button>
      </div>
    </>
  );
}
