import { useState } from 'react';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
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
import { Copy } from 'lucide-react';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { errorToast } from '@/utils/toast';
import { cn } from '@/utils/cn';
import { FormContentSectionProps } from '@/types/forms/forms.types';
import { validateFormInfo, validateFormSubtitle } from '@/utils/validation';

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
  const [formUrl, setFormUrl] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isCompleteOpen, setCompleteOpen] = useState(false);

  const openPreview = () => setPreviewOpen(true);
  const closePreview = () => setPreviewOpen(false);

  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);

  const openComplete = () => setCompleteOpen(true);
  const closeComplete = () => setCompleteOpen(false);

  const previewFormInfo = {
    ...formInfo,
    questions: questions.sort((a, b) => a.question_order - b.question_order),
  };

  const handlePublish = async () => {
    try {
      const result = await onPublish();

      if (result?.uuid) {
        const participationUrl = `${window.location.origin}/forms/response/${result.uuid}`;
        setFormUrl(participationUrl);
        setFormPassword(result.access_code || '');
        closeConfirm();
        openComplete();
      }
    } catch (error) {
      console.error('폼 발행 실패:', error);
      errorToast('폼 발행에 실패했습니다.');
      closeConfirm();
    }
  };

  return (
    <Section className="flex-1">
      <SectionTitle title={formInfo.title || '새로운 폼'}>
        <Button type="button" variant="secondary" onClick={openPreview}>
          미리 보기
        </Button>
        <Button type="button" variant="secondary" onClick={onSave}>
          임시 저장
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={async () => {
            const formErrors = validateFormInfo(formInfo);
            if (formErrors.length > 0) {
              errorToast(formErrors[0].message);
              return;
            }

            const subtitleError = validateFormSubtitle(formInfo.subtitle || '');
            if (subtitleError) {
              errorToast(subtitleError);
              return;
            }

            if (questions.length === 0) {
              errorToast('최소 1개 이상의 질문을 추가해주세요.');
              return;
            }

            openConfirm();
          }}
        >
          발행하기
        </Button>
      </SectionTitle>

      {/* 미리 보기 모달 */}
      <Modal isOpen={isPreviewOpen} onClose={closePreview} width="2xl">
        <Modal.Header title="미리 보기" onClose={closePreview} />
        <Modal.Content>
          <div className="flex flex-col gap-4">
            <div className="self-end flex gap-2">
              <Button onClick={onSave}>임시 저장</Button>
              <Button
                variant="primary"
                onClick={() => {
                  closePreview();
                  openConfirm();
                }}
              >
                발행하기
              </Button>
            </div>
            <FormPreview formInfo={previewFormInfo} />
          </div>
        </Modal.Content>
      </Modal>

      {/* 발행 확인 모달 */}
      <Modal isOpen={isConfirmOpen} onClose={closeConfirm} width="md">
        <Modal.Header title="⚠️ 꼭 확인해 주세요!" />
        <Modal.Content>
          <p>
            폼 발행 이후에는 수정이 불가능합니다.
            <br />
            정확한 데이터 수집을 위해 아래 사항을 확인해 주세요.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>질문 내용 및 순서</li>
            <li>응답 옵션</li>
            <li>마감 일자</li>
            <li>비밀번호 설정 여부</li>
          </ul>
        </Modal.Content>
        <Modal.Footer>
          <Button flex onClick={closeConfirm}>
            취소
          </Button>
          <Button
            variant="primary"
            flex
            onClick={() => {
              closeConfirm();
              handlePublish();
              openComplete();
            }}
          >
            발행하기
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 발행 완료 모달 */}
      <Modal isOpen={isCompleteOpen} onClose={closeComplete} width="md">
        <Modal.Header title="🎉 폼이 발행되었어요!" />
        <Modal.Content>
          <div className="flex flex-col gap-4">
            <p>참여 링크와 비밀번호를 확인해 주세요.</p>

            <InputWithLabel direction="row" className="gap-4">
              <Label text="참여 링크" className="w-14" />
              <div className="flex-1 relative">
                <Input value={formUrl} disabled hasCopyButton />
                <Copy
                  size={22}
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => copyToClipboard(formUrl, '참여 링크가 복사되었습니다.')}
                />
              </div>
            </InputWithLabel>
            {formPassword && (
              <InputWithLabel direction="row" className="gap-4">
                <Label text="비밀번호" className="w-14" />
                <div className="flex-1 relative">
                  <Input value={formPassword} disabled hasCopyButton />
                  <Copy
                    size={22}
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => copyToClipboard(formPassword, '비밀번호가 복사되었습니다.')}
                  />
                </div>
              </InputWithLabel>
            )}
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button flex onClick={closeComplete}>
            확인
          </Button>
        </Modal.Footer>
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
