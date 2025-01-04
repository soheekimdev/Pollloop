import { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs.tsx';
import Button from '@/components/common/Button.tsx';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import Switch from '@/components/form/Switch.tsx';
import Select from '@/components/form/Select';
import Section from '@/components/forms/Section';
import SectionTitle from '@/components/forms/SectionTitle';
import QuestionCard from '@/components/forms/QuestionCard';
import FormCover from '@/components/forms/FormCover';
import ShortAnswer from '@/components/forms/ShortAnswer';
import LongAnswer from '@/components/forms/LongAnswer';
import CheckboxAnswer from '@/components/forms/CheckboxAnswer';
import NumberAnswer from '@/components/forms/NumberAnswer';
import EmailAnswer from '@/components/forms/EmailAnswer';
import DateAnswer from '@/components/forms/DateAnswer';
import DropdownAnswer from '@/components/forms/DropdownAnswer';
import RadioAnswer from '@/components/forms/RadioAnswer';
import FileUploadAnswer from '@/components/forms/FileUploadAnswer';
import RangeAnswer from '@/components/forms/RangeAnswer';
import StarRatingAnswer from '@/components/forms/StarRatingAnswer';
import ImageSelectAnswer from '@/components/forms/ImageSelectAnswer';
import { Plus } from 'lucide-react';
import { FileType, FormInfo, Question, QuestionType } from '@/types/forms';
import { FILE_SIZE_LIMIT, FILE_TYPES, QUESTION_TYPES } from '@/constants/forms';
import { formatFileSize } from '@/utils/format';

export default function FormCreate() {
  const breadcrumbsItems = ['홈', '나의 폼', '폼 만들기'];

  const [formInfo, setFormInfo] = useState<FormInfo>({
    title: '',
    tag: '',
    end_at: '',
    is_closed: false,
    access_code: '',
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [isPrivateForm, setIsPrivateForm] = useState(false);
  const selectedQuestion = questions.find(q => q.id === selectedQuestionId);

  const handlePrivateToggle = (isChecked: boolean) => {
    setIsPrivateForm(isChecked);

    if (!isChecked) {
      setFormInfo(prev => ({ ...prev, access_code: '' }));
    }
  };

  const handleQuestionTypeChange = (questionType: QuestionType) => {
    if (!selectedQuestionId) return;

    setQuestions(prev =>
      prev.map(q =>
        q.id === selectedQuestionId
          ? {
              ...q,
              layout_type: questionType,
              options_of_questions:
                questionType === '체크박스' ||
                questionType === '라디오' ||
                questionType === '드롭다운'
                  ? []
                  : undefined,
              hasEtcOption:
                questionType === '체크박스' ||
                questionType === '라디오' ||
                questionType === '드롭다운'
                  ? false
                  : undefined,
              fileTypes: questionType === '파일업로드' ? [] : undefined,
            }
          : q,
      ),
    );
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(), // 임시 ID
      layout_type: '단답형',
      question: '',
      question_order: questions.length + 1,
      is_required: false,
      options_of_questions: [],
    };
    setQuestions(prev => [...prev, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
  };

  const handleUpdateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === id
          ? { ...q, ...updates, question_order: updates.question_order ?? q.question_order }
          : q,
      ),
    );
  };

  const handleSubmit = async (isPublishing: boolean) => {
    const formData = {
      ...formInfo,
      access_code: !isPublishing && isPrivateForm ? formInfo.access_code : '',
      is_closed: !isPublishing,
      questions: questions.map((q, index) => ({
        layout_type: q.layout_type,
        question: q.question,
        question_order: index + 1,
        is_required: q.is_required,
        options_of_questions: q.options_of_questions,
      })),
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
          <Section className="flex-1 md:max-w-[304px]">
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
                  type="date"
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
                  <Switch checked={isPrivateForm} onChange={handlePrivateToggle} />
                </InputWithLabel>

                <p className="text-xs text-input-tip">
                  {isPrivateForm
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
                {question.layout_type === '단답형' && (
                  <ShortAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '장문형' && (
                  <LongAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '체크박스' && (
                  <CheckboxAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '라디오' && (
                  <RadioAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '드롭다운' && (
                  <DropdownAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '범위선택' && (
                  <RangeAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '별점' && (
                  <StarRatingAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '이미지선택' && (
                  <ImageSelectAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '숫자' && (
                  <NumberAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '이메일' && (
                  <EmailAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '날짜' && (
                  <DateAnswer
                    data={question}
                    onUpdate={updates => handleUpdateQuestion(question.id, updates)}
                  />
                )}
                {question.layout_type === '파일업로드' && (
                  <FileUploadAnswer
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
                    value={selectedQuestion.layout_type}
                    onChange={e => handleQuestionTypeChange(e.target.value as QuestionType)}
                    options={QUESTION_TYPES}
                  />
                </InputWithLabel>

                <InputWithLabel direction="row" className="h-10">
                  <Label text="필수" />
                  <Switch
                    checked={selectedQuestion.is_required}
                    onChange={isChecked =>
                      handleUpdateQuestion(selectedQuestion.id, { is_required: isChecked })
                    }
                  />
                </InputWithLabel>

                {(selectedQuestion.layout_type === '체크박스' ||
                  selectedQuestion.layout_type === '라디오') && (
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

                {selectedQuestion.layout_type === '파일업로드' && (
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
