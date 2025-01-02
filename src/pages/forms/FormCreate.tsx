import { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs.tsx';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import Switch from '@/components/form/Switch.tsx';
import Button from '@/components/common/Button.tsx';
import QuestionCard from '@/components/forms/QuestionCard';
import FormCover from '@/components/forms/FormCover';
import ShortAnswer from '@/components/forms/ShortAnswer';
import LongAnswer from '@/components/forms/LongAnswer';
import CheckboxAnswer from '@/components/forms/CheckboxAnswer';
import clsx from 'clsx';
import Select from '@/components/form/Select';
import { Plus } from 'lucide-react';

const dummySelectOptions = [
  {
    id: 'short',
    label: '단답형',
  },
  {
    id: 'long',
    label: '장문형',
  },
  {
    id: 'checkbox',
    label: '체크박스 (복수 선택 가능)',
  },
  {
    id: 'radio',
    label: '라디오',
  },
  {
    id: 'dropdown',
    label: '드롭다운',
  },
  {
    id: 'range',
    label: '범위 선택',
  },
  {
    id: 'rating',
    label: '별점',
  },
  {
    id: 'image_choice',
    label: '이미지 선택',
  },
  {
    id: 'number',
    label: '숫자',
  },
  {
    id: 'date',
    label: '날짜',
  },
  {
    id: 'email',
    label: '이메일',
  },
  {
    id: 'file_upload',
    label: '파일 업로드',
  },
];

interface SectionProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

function Section({ children, className }: SectionProps) {
  return (
    <section className={clsx('flex flex-col gap-4 p-6 bg-pollloop-bg-02 rounded-2xl', className)}>
      {children}
    </section>
  );
}

function SectionTitle({ title, children }: SectionProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap min-h-10">
      <p className="font-medium text-lg">{title}</p>
      {children && <div className="flex gap-2 flex-wrap">{children}</div>}
    </div>
  );
}

export default function FormCreate() {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const breadcrumbsItems = ['홈', '나의 폼', '폼 만들기'];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제출된 데이터:', { title, tag, maxParticipants, dueDate, isPrivate });
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={breadcrumbsItems} className="px-4 md:px-8 lg:px-10" />

      <form onSubmit={onSubmit} className="flex flex-col gap-4 px-4 md:px-8 lg:px-10 pb-10">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* 기본 정보 */}
          <Section title="기본 정보" className="flex-1 md:max-w-[304px]">
            <SectionTitle title="기본 정보" />

            <fieldset className="flex flex-col gap-4">
              <InputWithLabel>
                <Label text="폼 이름" />
                <Input placeholder="나의 멋진 폼" onChange={e => setTitle(e.target.value)} />
              </InputWithLabel>

              <InputWithLabel>
                <Label text="태그" />
                <Input placeholder="태그" onChange={e => setTag(e.target.value)} />
              </InputWithLabel>

              <InputWithLabel>
                <Label text="참여 인원" />
                <Input
                  type="number"
                  placeholder="0~50"
                  onChange={e => setMaxParticipants(e.target.value)}
                />
              </InputWithLabel>

              <InputWithLabel>
                <Label text="마감 일자" />
                <Input placeholder="YYYY-MM-DD" onChange={e => setDueDate(e.target.value)} />
              </InputWithLabel>

              <div className="flex flex-col gap-2">
                <InputWithLabel direction="row">
                  <Label text="비밀번호 생성" />
                  <Switch checked={isPrivate} onChange={checked => setIsPrivate(checked)} />
                </InputWithLabel>

                <p className="text-xs text-input-tip">
                  {isPrivate
                    ? '비밀번호는 폼 발행 시 확인할 수 있습니다.'
                    : '비밀번호 생성 시 비공개 폼으로 전환됩니다.'}
                </p>
              </div>
            </fieldset>
          </Section>

          {/* 폼 컨텐츠 */}
          <Section className="flex-1">
            <SectionTitle title="나의 멋진 폼">
              <Button type="button" variant="secondary">
                미리 보기
              </Button>
              <Button type="submit" variant="secondary">
                임시 저장
              </Button>
              <Button type="submit" variant="primary" onClick={onSubmit}>
                발행하기
              </Button>
            </SectionTitle>

            <FormCover />
            <QuestionCard>
              <ShortAnswer questionIndex={0} required={true} />
            </QuestionCard>
            <QuestionCard>
              <LongAnswer questionIndex={1} required={true} />
            </QuestionCard>
            <QuestionCard>
              <CheckboxAnswer questionIndex={2} required={true} />
            </QuestionCard>
          </Section>

          {/* 질문 설정 */}
          <Section className="flex-1 md:max-w-[304px] h-fit">
            <SectionTitle title="질문 설정" />
            <InputWithLabel>
              <Label text="질문 유형" />
              <Select options={dummySelectOptions} />
            </InputWithLabel>

            <InputWithLabel direction="row">
              <Label text="필수" />
              <Switch checked={isPrivate} onChange={checked => setIsPrivate(checked)} />
            </InputWithLabel>

            <Button type="button">
              <Plus size={16} /> 질문 추가
            </Button>
          </Section>
        </div>
      </form>
    </div>
  );
}
