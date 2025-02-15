import { useState } from 'react';
import FormsInput from '@/components/forms/create/FormsInput';
import { validateFormSubtitle } from '@/utils/validation';

interface FormCoverProps {
  title?: string;
  description?: string;
  onTitleChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
}

export default function FormCover({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: FormCoverProps) {
  const [titleError, setTitleError] = useState<string | undefined>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onTitleChange?.(newValue);

    setTitleError(undefined);
  };

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const error = validateFormSubtitle(e.target.value);
    setTitleError(error || undefined);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDescriptionChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 bg-pollloop-light-beige rounded-lg p-10">
      <div className="flex flex-col gap-1">
        <FormsInput
          placeholder="표지 제목을 적어주세요."
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          align="center"
          required
        />
        {titleError && (
          <p className="text-xs text-status-red-text text-center mt-1">{titleError}</p>
        )}
      </div>
      <FormsInput
        placeholder="(선택) 상세 설명을 적어주세요."
        value={description}
        onChange={handleDescriptionChange}
        variant="md"
        align="center"
      />
    </div>
  );
}
