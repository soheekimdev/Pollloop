import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import Input from '@/components/form/Input';

interface ShortAnswerProps {
  data?: {
    title: string;
    required?: boolean;
  };
  onUpdate?: (updates: { title: string }) => void;
}

export default function ShortAnswer({ data, onUpdate }: ShortAnswerProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate?.({ title: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="단답형" />
        <FormsInput required={data?.required} value={data?.title} onChange={handleTitleChange} />
      </div>

      <Input readOnly />
    </>
  );
}
