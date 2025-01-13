import FormsLabel from '@/components/forms/create/FormsLabel';
import FormsInput from '@/components/forms/create/FormsInput';
import Input from '@/components/form/Input';
import { Question } from '@/types/forms/forms.types';

interface ShortAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function ShortAnswer({ data, onUpdate }: ShortAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="단답형" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <Input disabled />
    </>
  );
}
