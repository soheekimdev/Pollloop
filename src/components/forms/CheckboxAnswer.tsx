import { EditableOptionsAnswer } from '@/components/forms/EditableOptionsAnswer';
import { Question } from '@/types/forms';

interface CheckboxAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function CheckboxAnswer(props: CheckboxAnswerProps) {
  return <EditableOptionsAnswer {...props} type="checkbox" />;
}
