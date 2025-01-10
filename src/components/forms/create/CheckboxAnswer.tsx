import { EditableOptionsAnswer } from '@/components/forms/create/EditableOptionsAnswer';
import { Question } from '@/types/forms/forms.types';

interface CheckboxAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function CheckboxAnswer(props: CheckboxAnswerProps) {
  return <EditableOptionsAnswer {...props} type="checkbox" />;
}
