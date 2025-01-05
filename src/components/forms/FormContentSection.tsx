import Button from '@/components/common/Button';
import Section from '@/components/forms/Section';
import SectionTitle from '@/components/forms/SectionTitle';
import FormCover from '@/components/forms/FormCover';
import QuestionCard from '@/components/forms/QuestionCard';
import CheckboxAnswer from '@/components/forms/CheckboxAnswer';
import DateAnswer from '@/components/forms/DateAnswer';
import DropdownAnswer from '@/components/forms/DropdownAnswer';
import EmailAnswer from '@/components/forms/EmailAnswer';
import FileUploadAnswer from '@/components/forms/FileUploadAnswer';
import ImageSelectAnswer from '@/components/forms/ImageSelectAnswer';
import LongAnswer from '@/components/forms/LongAnswer';
import NumberAnswer from '@/components/forms/NumberAnswer';
import RadioAnswer from '@/components/forms/RadioAnswer';
import RangeAnswer from '@/components/forms/RangeAnswer';
import ShortAnswer from '@/components/forms/ShortAnswer';
import StarRatingAnswer from '@/components/forms/StarRatingAnswer';
import { FormContentSectionProps } from '@/types/forms';

export default function FormContentSection({
  formInfo,
  questions,
  selectedQuestionId,
  onQuestionSelect,
  onQuestionDelete,
  onQuestionUpdate,
  onSave,
  onPublish,
}: FormContentSectionProps) {
  return (
    <Section className="flex-1">
      <SectionTitle title={formInfo.title || '새로운 폼'}>
        <Button type="button" variant="secondary">
          미리 보기
        </Button>
        <Button type="button" variant="secondary" onClick={onSave}>
          임시 저장
        </Button>
        <Button type="button" variant="primary" onClick={onPublish}>
          발행하기
        </Button>
      </SectionTitle>
      <FormCover />
      {questions.map(question => (
        <QuestionCard
          key={question.id}
          onClick={() => onQuestionSelect(question.id)}
          onDelete={() => onQuestionDelete(question.id)}
          isSelected={selectedQuestionId === question.id}
        >
          {question.layout_type === '단답형' && (
            <ShortAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '장문형' && (
            <LongAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '체크박스' && (
            <CheckboxAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '라디오' && (
            <RadioAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '드롭다운' && (
            <DropdownAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '범위선택' && (
            <RangeAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '별점' && (
            <StarRatingAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '이미지선택' && (
            <ImageSelectAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '숫자' && (
            <NumberAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '이메일' && (
            <EmailAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '날짜' && (
            <DateAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
          {question.layout_type === '파일업로드' && (
            <FileUploadAnswer
              data={question}
              onUpdate={updates => onQuestionUpdate(question.id, updates)}
            />
          )}
        </QuestionCard>
      ))}
    </Section>
  );
}
