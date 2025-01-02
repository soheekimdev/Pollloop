import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import Textarea from '@/components/form/Textarea';

interface LongAnswerProps {
  questionIndex: number;
  required?: boolean;
}

export default function LongAnswer({ required }: LongAnswerProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="장문형" />
        <FormsInput required={required} />
      </div>

      <Textarea readOnly />
    </>
  );
}
