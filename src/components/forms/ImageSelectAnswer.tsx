import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Question } from '@/types/forms';
import { Plus, X } from 'lucide-react';

interface ImageSelectAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function ImageSelectAnswer({ data, onUpdate }: ImageSelectAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="이미지 선택" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <div className="flex gap-4">
        <div className="relative">
          <div className="w-36 h-40 rounded-lg overflow-hidden cursor-auto">
            <img src="" alt="" className="w-full h-full object-cover" />
          </div>
          <button
            type="button"
            className="absolute -top-2 -right-2 w-6 h-6 bg-pollloop-light-beige rounded-full flex items-center justify-center shadow-md hover:bg-tag-secondary-bg"
          >
            <X size={16} />
          </button>
        </div>

        <button
          type="button"
          className="w-36 h-40 flex items-center justify-center rounded-lg bg-tag-default-bg cursor-pointer hover:bg-tag-default-bg/90"
        >
          <Plus size={16} />
        </button>
      </div>
    </>
  );
}
