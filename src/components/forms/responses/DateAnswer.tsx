import Input from '@/components/form/Input';
import { Question, QuestionType } from '@/types/forms/forms.types';

interface DateAnswerProps {
  data: Question;
  value?: string;
  onChange: (type: QuestionType, value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
}

export default function DateAnswer({
  data,
  value = '',
  onChange,
  disabled = false,
  readOnly = false,
  error,
}: DateAnswerProps) {
  return (
    <div className="space-y-2">
      <Input
        type="date"
        value={value}
        placeholder="답변을 입력해 주세요"
        onChange={e => onChange(data.layout_type, e.target.value)}
        required={data.is_required}
        disabled={disabled}
        readOnly={readOnly}
        error={error}
      />
    </div>
  );
}
