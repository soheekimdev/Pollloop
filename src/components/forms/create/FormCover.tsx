import FormsInput from '@/components/forms/create/FormsInput';

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
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange?.(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDescriptionChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 bg-pollloop-light-beige rounded-lg p-10">
      <FormsInput
        placeholder="표지 제목을 적어주세요."
        value={title}
        onChange={handleTitleChange}
        align="center"
      />
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
