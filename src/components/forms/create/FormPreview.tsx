import QuestionCard from '@/components/forms/responses/QuestionCard';
import ShortAnswer from '@/components/forms/responses/ShortAnswer';
import LongAnswer from '@/components/forms/responses/LongAnswer';
import CheckboxAnswer from '@/components/forms/responses/CheckboxAnswer';
import RadioAnswer from '@/components/forms/responses/RadioAnswer';
import DropdownAnswer from '@/components/forms/responses/DropdownAnswer';
import RangeAnswer from '@/components/forms/responses/RangeAnswer';
import StarRatingAnswer from '@/components/forms/responses/StarRatingAnswer';
import ImageSelectAnswer from '@/components/forms/responses/ImageSelectAnswer';
import NumberAnswer from '@/components/forms/responses/NumberAnswer';
import DateAnswer from '@/components/forms/responses/DateAnswer';
import EmailAnswer from '@/components/forms/responses/EmailAnswer';
import FileUploadAnswer from '@/components/forms/responses/FileUploadAnswer';
import { FormInfo } from '@/types/forms/forms.types';

interface FormPreviewProps {
  formInfo: FormInfo;
}

export default function FormPreview({ formInfo }: FormPreviewProps) {
  const getEmptyFields = () => {
    const emptyFields = [];

    if (!formInfo.subtitle?.trim()) {
      emptyFields.push('표지 제목');
    }
    if (!formInfo.form_description?.trim()) {
      emptyFields.push('표지 설명');
    }

    formInfo.questions?.forEach(q => {
      if (!q.question?.trim()) {
        emptyFields.push(`질문 ${q.question_order}`);
      }
    });

    return emptyFields;
  };

  const emptyFields = getEmptyFields();
  const hasEmptyFields = emptyFields.length > 0;

  return (
    <div className="flex flex-col gap-2 w-full max-w-3xl mx-auto py-8 px-10 rounded-lg bg-pollloop-bg-02">
      <div className="p-4 mb-4 rounded-lg bg-pollloop-light-beige border">
        <p className="font-medium">미리보기 화면입니다.</p>
        {hasEmptyFields && <p className="text-sm mt-1">비어있는 항목: {emptyFields.join(', ')}</p>}
      </div>

      <div className="flex flex-col align-center justify-center gap-2 p-8 bg-[#FFC76F] rounded-md">
        {formInfo.subtitle && (
          <h1 className="text-2xl font-bold text-center">{formInfo.subtitle}</h1>
        )}
        {formInfo.form_description && <p className="text-center">{formInfo.form_description}</p>}
      </div>

      <div className="flex flex-col gap-2">
        {formInfo.questions
          ?.sort((a, b) => a.question_order - b.question_order)
          .map(question => (
            <QuestionCard
              key={question.question_order}
              question={question}
              hasDescription={
                question.layout_type === 'FILE_UPLOAD_TYPE'
                  ? '파일은 최대 1개까지, 파일당 10MB 이하로 업로드 가능합니다.'
                  : null
              }
            >
              {question.layout_type === 'SHORT_TYPE' && (
                <ShortAnswer data={question} onChange={() => {}} readOnly={true} />
              )}
              {question.layout_type === 'LONG_TYPE' && (
                <LongAnswer data={question} onChange={() => {}} readOnly={true} />
              )}
              {question.layout_type === 'CHECKBOX_TYPE' && (
                <CheckboxAnswer data={question} value={[]} onChange={() => {}} readOnly={true} />
              )}
              {question.layout_type === 'RADIO_TYPE' && (
                <RadioAnswer
                  data={question}
                  value={{ optionNumber: 0, context: '' }}
                  onChange={() => {}}
                  readOnly={true}
                />
              )}
              {question.layout_type === 'DROPDOWN_TYPE' && (
                <DropdownAnswer
                  data={question}
                  value={{ optionNumber: 0, context: '' }}
                  onChange={() => {}}
                  readOnly={true}
                />
              )}
              {question.layout_type === 'RANGE_TYPE' && (
                <RangeAnswer data={question} value="" onChange={() => {}} readOnly={true} />
              )}
              {question.layout_type === 'STAR_RATING_TYPE' && (
                <StarRatingAnswer data={question} onChange={() => {}} readOnly={true} />
              )}
              {question.layout_type === 'IMAGE_SELECT_TYPE' && (
                <ImageSelectAnswer
                  data={question}
                  value={{ optionNumber: 0, context: '' }}
                  onChange={() => {}}
                />
              )}
              {question.layout_type === 'NUMBER_TYPE' && (
                <NumberAnswer data={question} onChange={() => {}} readOnly={true} />
              )}
              {question.layout_type === 'DATE_TYPE' && (
                <DateAnswer data={question} onChange={() => {}} readOnly={true} />
              )}
              {question.layout_type === 'EMAIL_TYPE' && (
                <EmailAnswer data={question} onChange={() => {}} readOnly={true} />
              )}
              {question.layout_type === 'FILE_UPLOAD_TYPE' && (
                <FileUploadAnswer
                  data={question}
                  onChange={() => {}}
                  formTitle={formInfo.title}
                  readOnly={true}
                />
              )}
            </QuestionCard>
          ))}
      </div>
    </div>
  );
}
