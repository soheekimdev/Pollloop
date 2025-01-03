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
import { FileType, Question, QUESTION_TYPES } from '@/types/forms';
import { formatFileSize } from '@/utils/format';
import { FILE_SIZE_LIMIT, FILE_TYPES } from '@/constants/forms';

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
  const breadcrumbsItems = ['홈', '나의 폼', '폼 만들기'];

  const [formInfo, setFormInfo] = useState({
    title: '',
    tag: '',
    maxParticipants: '',
    dueDate: '',
    isPrivate: false,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const selectedQuestion = questions.find(q => q.id === selectedQuestionId);

  const handleQuestionTypeChange = (questionType: string) => {
    if (!selectedQuestionId) return;

    setQuestions(prev =>
      prev.map(q =>
        q.id === selectedQuestionId
          ? {
              ...q,
              type: questionType as Question['type'],
              options:
                questionType === 'CHECKBOX' ||
                questionType === 'RADIO' ||
                questionType === 'DROPDOWN'
                  ? []
                  : undefined,
              hasEtcOption:
                questionType === 'CHECKBOX' ||
                questionType === 'RADIO' ||
                questionType === 'DROPDOWN'
                  ? false
                  : undefined,
              fileTypes: questionType === 'FILE_UPLOAD' ? [] : undefined,
            }
          : q,
      ),
    );
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(), // 임시 ID
      type: 'SHORT_ANSWER',
      title: '',
      required: false,
    };
    setQuestions(prev => [...prev, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
  };

  const handleUpdateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, ...updates } : q)));
  };

  const handleSubmit = async (isPublishing: boolean) => {
    const formData = {
      ...formInfo,
      questions,
      status: isPublishing ? 'published' : 'draft',
    };

    try {
      console.log('서버로 전송될 데이터:', formData);
    } catch (error) {
      console.error('폼 저장 실패:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={breadcrumbsItems} className="px-4 md:px-8 lg:px-10" />

      <form className="flex flex-col gap-4 px-4 md:px-8 lg:px-10 pb-10">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* 기본 정보 섹션 */}
          <Section title="기본 정보" className="flex-1 md:max-w-[304px]">
            <SectionTitle title="기본 정보" />

            <fieldset className="flex flex-col gap-4">
              <InputWithLabel>
                <Label text="폼 이름" />
                <Input
                  onChange={e =>
                    setFormInfo(prev => ({
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
                  onChange={e =>
                    setFormInfo(prev => ({
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
                  onChange={e =>
                    setFormInfo(prev => ({
                      ...prev,
                      maxParticipants: e.target.value,
                    }))
                  }
                  placeholder="0~50"
                />
              </InputWithLabel>

              <InputWithLabel>
                <Label text="마감 일자" />
                <Input
                  onChange={e =>
                    setFormInfo(prev => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                  placeholder="YYYY-MM-DD"
                />
              </InputWithLabel>

              <div className="flex flex-col gap-2">
                <InputWithLabel direction="row">
                  <Label text="비밀번호 생성" />
                  <Switch
                    checked={formInfo.isPrivate}
                    onChange={isChecked => setFormInfo(prev => ({ ...prev, isPrivate: isChecked }))}
                  />
                </InputWithLabel>

                <p className="text-xs text-input-tip">
                  {formInfo.isPrivate
                    ? '비밀번호는 폼 발행 시 확인할 수 있습니다.'
                    : '비밀번호 생성 시 비공개 폼으로 전환됩니다.'}
                </p>
              </div>
            </fieldset>
          </Section>

          {/* 폼 컨텐츠 섹션 */}
          <Section className="flex-1">
            <SectionTitle title={formInfo.title || '새로운 폼'}>
              <Button type="button" variant="secondary">
                미리 보기
              </Button>
              <Button type="button" variant="secondary" onClick={() => handleSubmit(false)}>
                임시 저장
              </Button>
              <Button type="button" variant="primary" onClick={() => handleSubmit(true)}>
                발행하기
              </Button>
            </SectionTitle>

            <FormCover />

            {questions.map(question => (
              <QuestionCard
                key={question.id}
                onClick={() => setSelectedQuestionId(question.id)}
                isSelected={selectedQuestionId === question.id}
              >
                {question.type === 'SHORT_ANSWER' && (
                  <ShortAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.type === 'LONG_ANSWER' && (
                  <LongAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.type === 'CHECKBOX' && (
                  <CheckboxAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
              </QuestionCard>
            ))}
          </Section>

          {/* 질문 설정 섹션 */}
          <Section className="flex-1 md:max-w-[304px] h-fit">
            <SectionTitle title="질문 설정" />
            {selectedQuestion && (
              <div className="flex flex-col gap-2">
                <InputWithLabel>
                  <Label text="질문 유형" />
                  <Select
                    value={selectedQuestion.type}
                    onChange={e => handleQuestionTypeChange(e.target.value)}
                    options={QUESTION_TYPES.map(type => ({
                      value: type.value,
                      label: type.label,
                    }))}
                  />
                </InputWithLabel>

                <InputWithLabel direction="row" className="h-10">
                  <Label text="필수" />
                  <Switch
                    checked={selectedQuestion.required}
                    onChange={isChecked =>
                      handleUpdateQuestion(selectedQuestion.id, { required: isChecked })
                    }
                  />
                </InputWithLabel>

                {(selectedQuestion.type === 'CHECKBOX' || selectedQuestion.type === 'RADIO') && (
                  <InputWithLabel direction="row" className="h-10">
                    <Label text="기타 옵션" />
                    <Switch
                      checked={selectedQuestion.hasEtcOption ?? false}
                      onChange={isChecked =>
                        handleUpdateQuestion(selectedQuestion.id, { hasEtcOption: isChecked })
                      }
                    />
                  </InputWithLabel>
                )}

                {selectedQuestion.type === 'FILE_UPLOAD' && (
                  <InputWithLabel>
                    <Label text="허용할 파일 유형" />
                    <Select
                      value={selectedQuestion.fileTypes?.[0] ?? 'image'}
                      onChange={e =>
                        handleUpdateQuestion(selectedQuestion.id, {
                          fileTypes: [e.target.value as FileType],
                        })
                      }
                      options={FILE_TYPES}
                    />
                    <p className="text-xs text-input-tip">
                      첨부파일은 1개, {formatFileSize(FILE_SIZE_LIMIT)}까지 업로드 가능합니다.
                    </p>
                  </InputWithLabel>
                )}
              </div>
            )}

            <Button type="button" onClick={handleAddQuestion}>
              <Plus size={16} /> 질문 추가
            </Button>
          </Section>
        </div>
      </form>
    </div>
  );
}
