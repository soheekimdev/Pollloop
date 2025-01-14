import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
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
import { useFormData } from '@/hooks/useFormData';
import { useModal } from '@/hooks/useModal';
import LogoWithTitle from '@/components/common/LogoWithTitle';

type AnswerValue = string | string[];

export default function FormResponse() {
  const navigate = useNavigate();
  const { formId } = useParams<{ formId: string }>();
  const { formData, isLoading, error } = useFormData(formId || '');
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const { isOpen, open, close } = useModal();

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
    <div className="flex flex-col gap-2 max-w-3xl mx-auto pt-10 pb-20 px-4">
      <div className="flex flex-col align-center justify-center gap-2 p-8 bg-[#FFC76F] rounded-md">
        {formData.subtitle && (
          <h1 className="text-2xl font-bold text-center">{formData.subtitle}</h1>
        )}
        {formData.form_description && <p className="text-center">{formData.form_description}</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 flex-1">
        {formData.questions?.map(question => (
          <QuestionCard
            key={question.question_order}
            question={question}
            hasDescription={
              question.layout_type === 'FILE_UPLOAD_TYPE'
                ? '파일은 최대 1개까지, 파일당 1MB 이하로 업로드 가능합니다.'
                : null
            }
          >
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
                value={
                  Array.isArray(answers[question.question_order])
                    ? undefined
                    : (answers[question.question_order] as string)
                }
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
                value={answers[question.question_order] as string}
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
                onChange={async file => {
                  if (!file) {
                    handleAnswerChange(question.question_order, '');
                    return;
                  }

                  try {
                    const formData = new FormData();
                    formData.append('file', file);

                    // TODO: API 호출하여 파일 업로드 (실제 엔드포인트로 수정 필요)
                    const response = await fetch('/file/upload', {
                      method: 'POST',
                      body: formData,
                    });

                    if (!response.ok) {
                      throw new Error('파일 업로드에 실패했습니다.');
                    }

                    const { fileUrl } = await response.json();
                    handleAnswerChange(question.question_order, fileUrl);
                  } catch (error) {
                    console.error('File upload error:', error);
                  }
                }}
              />
            )}
          </QuestionCard>
        ))}

        <Button type="submit" variant="primary" size="lg" className="self-end" onClick={open}>
          제출하기
        </Button>
      </form>

      {/* 폼 제출 완료 모달 */}
      <Modal isOpen={isOpen} onClose={close} width="sm">
        <Modal.Content>
          <div className="mb-4">
            <LogoWithTitle title="🎉 폼이 제출되었어요!" />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button
            variant="primary"
            flex
            onClick={() => {
              close();
              navigate('/');
            }}
          >
            홈으로 가기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
