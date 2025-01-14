import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import LogoWithTitle from '@/components/common/LogoWithTitle';
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
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { useFormData } from '@/hooks/useFormData';
import { useModal } from '@/hooks/useModal';
import {
  AnswerOption,
  Answers,
  Question,
  QuestionType,
  SubmitOption,
  SubmitQuestion,
} from '@/types/forms/forms.types';

export default function FormResponse() {
  const navigate = useNavigate();
  const { formId } = useParams<{ formId: string }>();
  const { formData, isLoading, error } = useFormData(formId || '');
  const [answers, setAnswers] = useState<Answers>({});
  const { isOpen, open, close } = useModal();
  const { submitForm, isSubmitting } = useSubmitForm();

  const handleAnswerChange = (
    questionOrder: number,
    type: QuestionType,
    value: string | AnswerOption | AnswerOption[],
  ) => {
    setAnswers(prev => ({
      ...prev,
      [questionOrder]: { type, value },
    }));
  };

  const createEmptyQuestionResponse = (question: Question): SubmitQuestion => ({
    layout_type: question.layout_type,
    question: question.question,
    question_order: question.question_order,
    is_required: question.is_required,
    options_of_questions: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const questionsWithAnswers: SubmitQuestion[] = formData.questions.map(question => {
        const answer = answers[question.question_order];
        if (!answer) return createEmptyQuestionResponse(question);

        let optionsOfQuestions: SubmitOption[] = [];

        switch (answer.type) {
          case 'CHECKBOX_TYPE': {
            const options = answer.value as AnswerOption[];
            optionsOfQuestions = options.map(opt => ({
              option_number: opt.optionNumber,
              option_context: opt.context,
            }));
            break;
          }

          case 'RADIO_TYPE':
          case 'DROPDOWN_TYPE': {
            const option = answer.value as AnswerOption;
            optionsOfQuestions = [
              {
                option_number: option.optionNumber,
                option_context: option.context,
              },
            ];
            break;
          }

          case 'IMAGE_SELECT_TYPE': {
            if (answer.value) {
              const answerOption = answer.value as AnswerOption;
              optionsOfQuestions = [{
                option_number: answerOption.optionNumber,
                option_context: answerOption.context // URL string이 들어감
              }];
            }
            break;
          }
          
          case 'RANGE_TYPE':
          case 'STAR_RATING_TYPE': {
            const value = answer.value as string;
            optionsOfQuestions = [
              {
                option_number: Number(value),
                option_context: value,
              },
            ];
            break;
          }

          default: {
            const value = answer.value as string;
            optionsOfQuestions = [
              {
                option_number: 1,
                option_context: value,
              },
            ];
          }
        }

        return {
          layout_type: answer.type,
          question: question.question,
          question_order: question.question_order,
          is_required: question.is_required,
          options_of_questions: optionsOfQuestions,
        };
      });

      await submitForm({
        uuid: formId || '',
        questions: questionsWithAnswers,
      });

      console.log('폼 제출 완료');
      open();
    } catch (error) {
      console.error('Form submission error:', error);
      // toast.error('폼 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleGoHome = () => {
    navigate('/');
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
        {formData?.questions?.map(question => (
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
                value={(answers[question.question_order]?.value as string) || ''}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'LONG_TYPE' && (
              <LongAnswer
                data={question}
                value={(answers[question.question_order]?.value as string) || ''}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'CHECKBOX_TYPE' && (
              <CheckboxAnswer
                data={question}
                value={(answers[question.question_order]?.value as AnswerOption[]) || []}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'RADIO_TYPE' && (
              <RadioAnswer
                data={question}
                value={answers[question.question_order]?.value as AnswerOption}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'DROPDOWN_TYPE' && (
              <DropdownAnswer
                data={question}
                value={answers[question.question_order]?.value as AnswerOption}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'RANGE_TYPE' && (
              <RangeAnswer
                data={question}
                value={(answers[question.question_order]?.value as string) || ''}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'STAR_RATING_TYPE' && (
              <StarRatingAnswer
                data={question}
                value={(answers[question.question_order]?.value as string) || ''}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'IMAGE_SELECT_TYPE' && (
              <ImageSelectAnswer
                data={question}
                value={answers[question.question_order]?.value as AnswerOption}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'NUMBER_TYPE' && (
              <NumberAnswer
                data={question}
                value={(answers[question.question_order]?.value as string) || ''}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'DATE_TYPE' && (
              <DateAnswer
                data={question}
                value={(answers[question.question_order]?.value as string) || ''}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'EMAIL_TYPE' && (
              <EmailAnswer
                data={question}
                value={(answers[question.question_order]?.value as string) || ''}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
              />
            )}
            {question.layout_type === 'FILE_UPLOAD_TYPE' && (
              <FileUploadAnswer
                data={question}
                value={(answers[question.question_order]?.value as string) || ''}
                onChange={(type, value) => handleAnswerChange(question.question_order, type, value)}
                formTitle={formData?.title || ''}
              />
            )}
          </QuestionCard>
        ))}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="self-end"
          disabled={isSubmitting}
        >
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
          <Button variant="primary" flex onClick={handleGoHome}>
            홈으로 가기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
