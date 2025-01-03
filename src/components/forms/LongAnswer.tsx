import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import Textarea from '@/components/form/Textarea';

interface LongAnswerProps {
  data?: {
    title: string;
    required?: boolean;
  };
  onUpdate?: (updates: { title: string }) => void;
}

export default function LongAnswer({ data, onUpdate }: LongAnswerProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate?.({ title: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="장문형" />
        <FormsInput required={data?.required} value={data?.title} onChange={handleTitleChange} />
      </div>

      <Textarea readOnly />
    </>
  );
}
