import Input from '@/components/form/Input';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Question } from '@/types/forms/forms.types';

interface EmailAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function EmailAnswer({ data, onUpdate }: EmailAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="이메일" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <Input type="email" disabled />
    </>
  );
}
