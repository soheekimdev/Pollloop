import Textarea from '@/components/form/Textarea';
import { Question } from '@/types/forms/forms.types';

interface LongAnswerProps {
  data: Question;
  onChange: (value: string) => void;
}

export default function LongAnswer({ data, onChange }: LongAnswerProps) {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder="답변을 입력해 주세요"
        onChange={e => onChange(e.target.value)}
        required={data.is_required}
      />
    </div>
  );
}
