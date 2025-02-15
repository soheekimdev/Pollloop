import Input from '@/components/form/Input';
import FormsLabel from '@/components/forms/create/FormsLabel';
import FormsInput from '@/components/forms/create/FormsInput';
import { Question } from '@/types/forms/forms.types';

interface NumberAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
  error?: string;
}

export default function NumberAnswer({ data, onUpdate, error }: NumberAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="숫자" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <Input type="number" readOnly error={error} />
    </>
  );
}
