import Button from '@/components/common/Button';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import Switch from '@/components/form/Switch';
import Section from '@/components/forms/create/Section';
import SectionTitle from '@/components/forms/create/SectionTitle';
import { Plus } from 'lucide-react';
import {
  FILE_SIZE_LIMIT,
  FILE_TYPES,
  OPTION_NUMBERS,
  QUESTION_TYPES,
} from '@/constants/forms.constants';
import { FileType, FormQuestionSectionProps, QuestionType } from '@/types/forms/forms.types';
import { formatFileSize } from '@/utils/format';

export default function FormQuestionSection({
  selectedQuestion,
  onQuestionTypeChange,
  onQuestionUpdate,
  onAddQuestion,
}: FormQuestionSectionProps) {
  return (
    <Section className="flex-1 md:max-w-[304px] h-fit">
      <SectionTitle title="질문 설정" />
      {selectedQuestion && (
        <div className="flex flex-col gap-2">
          <InputWithLabel>
            <Label text="질문 유형" />
            <Select
              value={selectedQuestion.layout_type}
              onChange={e => onQuestionTypeChange(e.target.value as QuestionType)}
              options={QUESTION_TYPES}
            />
          </InputWithLabel>

          <InputWithLabel direction="row" className="h-10">
            <Label text="필수" />
            <Switch
              checked={selectedQuestion.is_required}
              onChange={isChecked =>
                onQuestionUpdate(selectedQuestion.id, { is_required: isChecked })
              }
            />
          </InputWithLabel>

          {(selectedQuestion.layout_type === 'CHECKBOX_TYPE' ||
            selectedQuestion.layout_type === 'RADIO_TYPE') && (
            <InputWithLabel direction="row" className="h-10">
              <Label text="기타 옵션" />
              <Switch
                checked={selectedQuestion._frontend?.hasEtcOption ?? false}
                onChange={isChecked =>
                  onQuestionUpdate(selectedQuestion.id, {
                    _frontend: { ...selectedQuestion._frontend, hasEtcOption: isChecked },
                  })
                }
              />
            </InputWithLabel>
          )}

          {selectedQuestion.layout_type === 'FILE_UPLOAD_TYPE' && (
            <InputWithLabel>
              <Label text="허용할 파일 유형" />
              <Select
                value={selectedQuestion._frontend?.fileType ?? 'image'}
                onChange={e => {
                  const fileType = e.target.value as FileType;
                  onQuestionUpdate(selectedQuestion.id, {
                    _frontend: { ...selectedQuestion._frontend, fileType },
                    options_of_questions: [
                      { option_number: 1, option_context: '' },
                      { option_number: OPTION_NUMBERS.ETC, option_context: fileType },
                    ],
                  });
                }}
                options={FILE_TYPES}
              />
              <p className="text-xs text-input-tip">
                첨부파일은 1개, {formatFileSize(FILE_SIZE_LIMIT)}까지 업로드 가능합니다.
              </p>
            </InputWithLabel>
          )}
        </div>
      )}

      <Button type="button" onClick={onAddQuestion}>
        <Plus size={16} /> 질문 추가
      </Button>
    </Section>
  );
}
