import { useState } from 'react';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import Switch from '@/components/form/Switch';
import Section from '@/components/forms/create/Section';
import SectionTitle from '@/components/forms/create/SectionTitle';
import { FormBasicSectionProps, FormInfo } from '@/types/forms/forms.types';
import {
  validateFormTitle,
  validateFormTag,
  validateTargetCount,
  validateEndDate,
} from '@/utils/validation';

type FormErrors = {
  [key in 'title' | 'tag' | 'target_count' | 'end_at' | 'subtitle']?: string;
};

export default function FormBasicSection({
  formInfo,
  setFormInfo,
  onPrivateToggle,
}: FormBasicSectionProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (field: keyof FormErrors, value: string | number) => {
    let error: string | null = null;

    switch (field) {
      case 'title':
        error = validateFormTitle(value.toString());
        break;
      case 'tag':
        error = validateFormTag(value.toString());
        break;
      case 'target_count':
        error = validateTargetCount(Number(value));
        break;
      case 'end_at':
        error = validateEndDate(value.toString());
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error || undefined,
    }));

    return !error;
  };

  return (
    <Section className="flex-1 md:max-w-[304px]">
      <SectionTitle title="기본 정보" />

      <fieldset className="flex flex-col gap-4 scrollable">
        <InputWithLabel>
          <Label text="*폼 이름" />
          <Input
            value={formInfo.title}
            onChange={e => {
              setFormInfo((prev: FormInfo) => ({
                ...prev,
                title: e.target.value,
              }));
              validateField('title', e.target.value);
            }}
            onBlur={() => validateField('title', formInfo.title)}
            placeholder="새로운 폼"
            error={errors.title}
          />
        </InputWithLabel>

        <InputWithLabel>
          <Label text="태그" />
          <Input
            value={formInfo.tag}
            onChange={e => {
              setFormInfo((prev: FormInfo) => ({
                ...prev,
                tag: e.target.value,
              }));
              validateField('tag', e.target.value);
            }}
            onBlur={() => validateField('tag', formInfo.tag || '')}
            placeholder="태그"
            error={errors.tag}
          />
        </InputWithLabel>

        <InputWithLabel>
          <Label text="*참여 인원" />
          <Input
            type="number"
            value={formInfo.target_count}
            onChange={e => {
              setFormInfo((prev: FormInfo) => ({
                ...prev,
                target_count: Number(e.target.value),
              }));
              validateField('target_count', Number(e.target.value));
            }}
            onBlur={() => validateField('target_count', formInfo.target_count)}
            placeholder="1~50"
            error={errors.target_count}
          />
        </InputWithLabel>

        <InputWithLabel>
          <Label text="*마감 일자" />
          <Input
            type="date"
            value={formInfo.end_at}
            onChange={e => {
              setFormInfo((prev: FormInfo) => ({
                ...prev,
                end_at: e.target.value,
              }));
              validateField('end_at', e.target.value);
            }}
            onBlur={() => validateField('end_at', formInfo.end_at)}
            placeholder="YYYY-MM-DD"
            error={errors.end_at}
          />
        </InputWithLabel>

        <div className="flex flex-col gap-2">
          <InputWithLabel direction="row">
            <Label text="비밀번호 생성" />
            <Switch checked={formInfo.is_private} onChange={onPrivateToggle} />
          </InputWithLabel>

          <p className="text-xs text-input-tip">
            {formInfo.is_private
              ? '비밀번호는 폼 발행 시 확인할 수 있습니다.'
              : '비밀번호 생성 시 비공개 폼으로 전환됩니다.'}
          </p>
        </div>
      </fieldset>
    </Section>
  );
}
