import Input from '@/components/form/Input';
import { Question } from '@/types/forms/forms.types';

interface ShortAnswerProps {
  data: Question;
  onChange: (value: string) => void;
}

export default function ShortAnswer({ data, onChange }: ShortAnswerProps) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="답변을 입력해 주세요"
        onChange={e => onChange(e.target.value)}
        required={data.is_required}
      />
    </div>
  );
}
