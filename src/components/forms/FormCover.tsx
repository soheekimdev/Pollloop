import FormsInput from '@/components/forms/FormsInput';

interface FormCoverProps {
  title?: string;
  description?: string;
}

export default function FormCover({ title, description }: FormCoverProps) {
  return (
    <div className="flex flex-col gap-2 bg-pollloop-light-beige rounded-lg p-10 xl:p-20">
      <FormsInput placeholder="여기에 표지 제목을 적어주세요." value={title} align="center" />
      <FormsInput
        placeholder="(선택) 폼 설명을 적어주세요."
        value={description}
        variant="md"
        align="center"
      />
    </div>
  );
}
