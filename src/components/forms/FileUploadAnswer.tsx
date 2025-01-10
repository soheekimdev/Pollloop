import Button from '@/components/common/Button';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import { Question } from '@/types/forms/forms.types';

interface FileUploadAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function FileUploadAnswer({ data, onUpdate }: FileUploadAnswerProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="파일 업로드" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      <Button type="button" className="self-start">
        파일 업로드
      </Button>
    </>
  );
}
