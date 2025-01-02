import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import Input from '@/components/form/Input';

interface ShortAnswerProps {
  questionIndex: number;
  required?: boolean;
}

export default function ShortAnswer({ required }: ShortAnswerProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="단답형" />
        <FormsInput required={required} />
      </div>

      <Input readOnly />
    </>
  );
}
