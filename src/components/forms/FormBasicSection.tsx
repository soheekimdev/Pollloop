import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import Switch from '@/components/form/Switch';
import Section from '@/components/forms/Section';
import SectionTitle from '@/components/forms/SectionTitle';
import { FormBasicSectionProps, FormInfo } from '@/types/forms/forms.types';

export default function FormBasicSection({
  formInfo,
  setFormInfo,
  onPrivateToggle,
}: FormBasicSectionProps) {
  return (
    <Section className="flex-1 md:max-w-[304px]">
      <SectionTitle title="기본 정보" />

      <fieldset className="flex flex-col gap-4">
        <InputWithLabel>
          <Label text="폼 이름" />
          <Input
            value={formInfo.title}
            onChange={e =>
              setFormInfo((prev: FormInfo) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="새로운 폼"
          />
        </InputWithLabel>

        <InputWithLabel>
          <Label text="태그" />
          <Input
            value={formInfo.tag}
            onChange={e =>
              setFormInfo((prev: FormInfo) => ({
                ...prev,
                tag: e.target.value,
              }))
            }
            placeholder="태그"
          />
        </InputWithLabel>

        <InputWithLabel>
          <Label text="참여 인원" />
          <Input
            type="number"
            value={formInfo.target_count}
            onChange={e =>
              setFormInfo((prev: FormInfo) => ({
                ...prev,
                target_count: Number(e.target.value),
              }))
            }
            placeholder="0~50"
          />
        </InputWithLabel>

        <InputWithLabel>
          <Label text="마감 일자" />
          <Input
            type="date"
            value={formInfo.end_at}
            onChange={e =>
              setFormInfo((prev: FormInfo) => ({
                ...prev,
                end_at: e.target.value,
              }))
            }
            placeholder="YYYY-MM-DD"
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
