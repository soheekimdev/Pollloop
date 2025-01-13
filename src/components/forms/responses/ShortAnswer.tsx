import Input from '@/components/form/Input';
import { Question } from '@/types/forms/forms.types';

interface ShortAnswerProps {
  data: Question;
  onChange: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function ShortAnswer({
  data,
  onChange,
  disabled = false,
  readOnly = false,
}: ShortAnswerProps) {
  return (
    <div className="space-y-2">
      <Input
        placeholder="답변을 입력해 주세요"
        onChange={e => onChange(e.target.value)}
        required={data.is_required}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  );
}
