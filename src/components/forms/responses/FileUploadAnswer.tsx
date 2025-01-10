import { Question } from '@/types/forms/forms.types';

interface FileUploadAnswerProps {
  data: Question;
  onChange: (value: string) => void;
}

export default function FileUploadAnswer({ data, onChange }: FileUploadAnswerProps) {
  return (
    <div className="space-y-2">
      <input type="file" onChange={e => onChange(e.target.value)} required={data.is_required} />
    </div>
  );
}
