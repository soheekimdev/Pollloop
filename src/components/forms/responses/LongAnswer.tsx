import Textarea from '@/components/form/Textarea';
import { Question, QuestionType } from '@/types/forms/forms.types';

interface LongAnswerProps {
  data: Question;
  value?: string;
  onChange: (type: QuestionType, value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function LongAnswer({
  data,
  value = '',
  onChange,
  disabled = false,
  readOnly = false,
}: LongAnswerProps) {
  return (
    <div className="space-y-2">
      <Textarea
        value={value}
        placeholder="답변을 입력해 주세요"
        onChange={e => onChange(data.layout_type, e.target.value)}
        required={data.is_required}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  );
}
