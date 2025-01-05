import { EditableOptionsAnswer } from '@/components/forms/EditableOptionsAnswer';
import { Question } from '@/types/forms';

interface RadioAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function RadioAnswer(props: RadioAnswerProps) {
  return <EditableOptionsAnswer {...props} type="radio" />;
}
