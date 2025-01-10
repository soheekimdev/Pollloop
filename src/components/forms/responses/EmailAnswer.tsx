import Input from '@/components/form/Input';
import { Question } from '@/types/forms/forms.types';

interface EmailAnswerProps {
  data: Question;
  onChange: (value: string) => void;
}

export default function EmailAnswer({ data, onChange }: EmailAnswerProps) {
  return (
    <div className="space-y-2">
      <Input
        type="email"
        placeholder="답변을 입력해 주세요"
        onChange={e => onChange(e.target.value)}
        required={data.is_required}
      />
    </div>
  );
}
