import Input from '@/components/form/Input';
import { Question, QuestionType } from '@/types/forms/forms.types';

interface EmailAnswerProps {
  data: Question;
  value?: string;
  onChange: (type: QuestionType, value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function EmailAnswer({
  data,
  value = '',
  onChange,
  disabled = false,
  readOnly = false,
}: EmailAnswerProps) {
  return (
    <div className="space-y-2">
      <Input
        type="email"
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
