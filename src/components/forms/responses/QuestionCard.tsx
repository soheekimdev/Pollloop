import FormsDescription from '../create/FormsDescription';
import { Question } from '@/types/forms/forms.types';

interface QuestionCardProps {
  question: Question;
  children: React.ReactNode;
  hasDescription?: string | null;
}

export default function QuestionCard({ question, children, hasDescription }: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-8 relative bg-pollloop-light-beige rounded-lg p-6 md:p-10">
      <div className="flex flex-col gap-2">
        <div className="flex gap-px">
          {question.is_required && <span>*</span>}
          <span className="w-full text-base font-semibold">{question.question}</span>
        </div>
        {hasDescription && <FormsDescription>{hasDescription}</FormsDescription>}
      </div>

      {children}
    </div>
  );
}
