import Input from '@/components/form/Input';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Question } from '@/types/forms';

interface DateAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function DateAnswer({ data, onUpdate }: DateAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="날짜" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <Input type="date" disabled />
    </>
  );
}
