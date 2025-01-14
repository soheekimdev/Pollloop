import Textarea from '@/components/form/Textarea';
import { Question } from '@/types/forms/forms.types';

interface LongAnswerProps {
  data: Question;
  onChange: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function LongAnswer({ data, onChange, disabled = false, readOnly = false }: LongAnswerProps) {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder="답변을 입력해 주세요"
        onChange={e => onChange(e.target.value)}
        required={data.is_required}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  );
}
