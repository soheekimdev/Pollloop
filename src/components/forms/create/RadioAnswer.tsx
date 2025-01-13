import { EditableOptionsAnswer } from '@/components/forms/create/EditableOptionsAnswer';
import { Question } from '@/types/forms/forms.types';

interface RadioAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function RadioAnswer(props: RadioAnswerProps) {
  return <EditableOptionsAnswer {...props} type="radio" />;
}
