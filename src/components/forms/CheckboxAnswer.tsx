import Button from '@/components/common/Button';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Plus } from 'lucide-react';
interface CheckboxAnswerProps {
  questionIndex: number; // questions 배열에서의 인덱스
  required?: boolean;
}

export default function CheckboxAnswer({ required }: CheckboxAnswerProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="체크박스" />
        <FormsInput required={required} />
      </div>

      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-col items-start gap-2">
          <label
            className="flex items-center gap-1 min-w-40 bg-pollloop-bg-02 p-2 rounded-lg cursor-pointer"
          >
            <div className="flex items-center justify-center w-5 h-5 bg-pollloop-bg-02 border border-pollloop-brown-01 text-pollloop-light-beige rounded" />
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
