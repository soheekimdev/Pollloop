import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Section from '@/components/forms/create/Section';
import SectionTitle from '@/components/forms/create/SectionTitle';
import FormCover from '@/components/forms/create/FormCover';
import QuestionCard from '@/components/forms/create/QuestionCard';
import CheckboxAnswer from '@/components/forms/create/CheckboxAnswer';
import DateAnswer from '@/components/forms/create/DateAnswer';
import DropdownAnswer from '@/components/forms/create/DropdownAnswer';
import EmailAnswer from '@/components/forms/create/EmailAnswer';
import FileUploadAnswer from '@/components/forms/create/FileUploadAnswer';
import ImageSelectAnswer from '@/components/forms/create/ImageSelectAnswer';
import LongAnswer from '@/components/forms/create/LongAnswer';
import NumberAnswer from '@/components/forms/create/NumberAnswer';
import RadioAnswer from '@/components/forms/create/RadioAnswer';
import RangeAnswer from '@/components/forms/create/RangeAnswer';
import ShortAnswer from '@/components/forms/create/ShortAnswer';
import StarRatingAnswer from '@/components/forms/create/StarRatingAnswer';
import FormPreview from '@/components/forms/create/FormPreview';
import { FormContentSectionProps } from '@/types/forms/forms.types';
import { useModal } from '@/hooks/useModal';
import { cn } from '@/utils/cn';

export default function FormContentSection({
  formInfo,
  questions,
  selectedQuestionId,
  onQuestionSelect,
  onQuestionDelete,
  onQuestionUpdate,
  onFormInfoUpdate,
  onSave,
  onPublish,
}: FormContentSectionProps) {
  const { isOpen, open, close } = useModal();

  const previewFormInfo = {
    ...formInfo,
    questions: questions.sort((a, b) => a.question_order - b.question_order),
  };

  return (
    <Section className="flex-1">
      <SectionTitle title={formInfo.title || '새로운 폼'}>
        <Button type="button" variant="secondary" onClick={open}>
          미리 보기
        </Button>
        <Button type="button" variant="secondary" onClick={onSave}>
          임시 저장
        </Button>
        <Button type="button" variant="primary" onClick={onPublish}>
          발행하기
        </Button>
      </SectionTitle>

      <Modal isOpen={isOpen} onClose={close} width="2xl">
        <Modal.Header title="미리 보기" onClose={close} />
        <Modal.Content>
          <FormPreview formInfo={previewFormInfo} />
        </Modal.Content>
      </Modal>

      <div className="flex flex-col gap-4 p-2 scrollable">
        <FormCover
          title={formInfo.subtitle}
          description={formInfo.form_description}
          onTitleChange={value => onFormInfoUpdate({ subtitle: value })}
          onDescriptionChange={value => onFormInfoUpdate({ form_description: value })}
        />
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            onClick={() => onQuestionSelect(question.id)}
            onDelete={() => onQuestionDelete(question.id)}
            isSelected={selectedQuestionId === question.id}
          >
            <p
              className={cn(
                'absolute top-8 xl:top-[56px] left-8 xl:left-14 p-2 text-sm text-tag-secondary-text',
                selectedQuestionId === question.id && 'font-bold',
              )}
            >
              {question.question_order}
            </p>

            {question.layout_type === 'SHORT_TYPE' && (
              <ShortAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'LONG_TYPE' && (
              <LongAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'CHECKBOX_TYPE' && (
              <CheckboxAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'RADIO_TYPE' && (
              <RadioAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'DROPDOWN_TYPE' && (
              <DropdownAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'RANGE_TYPE' && (
              <RangeAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'STAR_RATING_TYPE' && (
              <StarRatingAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'IMAGE_SELECT_TYPE' && (
              <ImageSelectAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'NUMBER_TYPE' && (
              <NumberAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'DATE_TYPE' && (
              <DateAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'EMAIL_TYPE' && (
              <EmailAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
            {question.layout_type === 'FILE_UPLOAD_TYPE' && (
              <FileUploadAnswer
                data={question}
                onUpdate={updates => onQuestionUpdate(question.id, updates)}
              />
            )}
          </QuestionCard>
        ))}
      </div>
    </Section>
  );
}
