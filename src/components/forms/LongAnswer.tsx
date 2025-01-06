import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import Textarea from '@/components/form/Textarea';
import { Question } from '@/types/forms';

interface LongAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function LongAnswer({ data, onUpdate }: LongAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate?.({ question: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="장문형" />
        <FormsInput
          required={data?.is_required}
          value={data?.question}
          onChange={handleQuestionChange}
        />
      </div>

      <Textarea readOnly />
    </>
  );
}
