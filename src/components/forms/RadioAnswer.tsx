import Button from '@/components/common/Button';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Plus } from 'lucide-react';
import { Question } from '@/types/forms';

interface RadioAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function RadioAnswer({ data, onUpdate }: RadioAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="라디오" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-col items-start gap-2">
          <label className="flex items-center gap-1 min-w-40 bg-pollloop-bg-02 p-2 rounded-lg cursor-pointer">
            <div className="flex items-center justify-center w-5 h-5 p-[3px] bg-pollloop-bg-02 border border-pollloop-brown-01 text-pollloop-light-beige rounded-full" />
            <input
              className="w-full bg-transparent text-sm placeholder:text-input-placeholder focus-visible:outline-none cursor-pointer"
              placeholder="옵션"
            />
          </label>
        </div>

        <Button type="button">
          <Plus size={16} />
          옵션 추가
        </Button>
      </div>
    </>
  );
}
