import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormData } from '@/hooks/useFormData';
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

type AnswerValue = string | string[];

export default function FormResponse() {
  const { formId } = useParams<{ formId: string }>();
  const { formData, isLoading, error } = useFormData(formId || '');
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});

  const handleAnswerChange = (questionOrder: number, value: AnswerValue) => {
    setAnswers(prev => ({
      ...prev,
      [questionOrder]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form answers:', answers);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!formData) {
    return <div>폼을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{formData.title}</h1>
        {formData.subtitle && <h2 className="text-xl mb-2">{formData.subtitle}</h2>}
        {formData.form_description && <p className="text-gray-600">{formData.form_description}</p>}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-pollloop-bg-02 rounded-2xl flex-1"
      >
        {formData.questions?.map(question => (
          <div
            key={question.question_order}
            className="flex flex-col gap-8 relative bg-pollloop-light-beige rounded-lg p-10 xl:p-20"
          >
            <div className="flex gap-px">
              {question.is_required && <span>*</span>}
              <span className="w-full text-base">{question.question}</span>
            </div>

            {question.layout_type === 'SHORT_TYPE' && (
              <ShortAnswer
                data={question}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'LONG_TYPE' && (
              <LongAnswer
                data={question}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'CHECKBOX_TYPE' && (
              <CheckboxAnswer
                data={question}
                value={(answers[question.question_order] as string[]) || []}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'RADIO_TYPE' && (
              <RadioAnswer
                data={question}
                value={
                  Array.isArray(answers[question.question_order])
                    ? undefined
                    : (answers[question.question_order] as string)
                }
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'DROPDOWN_TYPE' && (
              <DropdownAnswer
                data={question}
                value={
                  Array.isArray(answers[question.question_order])
                    ? ''
                    : (answers[question.question_order] as string) || ''
                }
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'RANGE_TYPE' && (
              <RangeAnswer
                data={question}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'STAR_RATING_TYPE' && (
              <StarRatingAnswer
                data={question}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'IMAGE_SELECT_TYPE' && (
              <ImageSelectAnswer
                data={question}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'NUMBER_TYPE' && (
              <NumberAnswer
                data={question}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'DATE_TYPE' && (
              <DateAnswer
                data={question}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'EMAIL_TYPE' && (
              <EmailAnswer
                data={question}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
            {question.layout_type === 'FILE_UPLOAD_TYPE' && (
              <FileUploadAnswer
                data={question}
                onChange={value => handleAnswerChange(question.question_order, value)}
              />
            )}
          </div>
        ))}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            제출하기
          </button>
        </div>
      </form>
    </div>
  );
}
