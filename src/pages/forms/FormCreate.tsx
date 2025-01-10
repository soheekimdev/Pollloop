import { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs.tsx';
import FormBasicSection from '@/components/forms/create/FormBasicSection';
import FormContentSection from '@/components/forms/create/FormContentSection';
import FormQuestionSection from '@/components/forms/create/FormQuestionSection';
import { FormInfo, Option, Question, QuestionType } from '@/types/forms/forms.types';
import { NO_OPTIONS_TYPES } from '@/constants/forms.constants';

export default function FormCreate() {
  const breadcrumbsItems = ['홈', '나의 폼', '폼 만들기'];

  const [formInfo, setFormInfo] = useState<FormInfo>({
    title: '',
    tag: '',
    end_at: '',
    target_count: 0,
    is_closed: 'TEMP',
    is_private: false,
    is_bookmark: false,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const selectedQuestion = questions.find(q => q.id === selectedQuestionId);

  const handlePrivateToggle = (isChecked: boolean) => {
    setFormInfo(prev => ({
      ...prev,
      is_private: isChecked,
      access_code: isChecked ? prev.access_code : '',
    }));
  };

  const handleFormInfoUpdate = (updates: Partial<FormInfo>) => {
    setFormInfo(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const handleQuestionTypeChange = (questionType: QuestionType) => {
    if (!selectedQuestionId) return;

    setQuestions(prev =>
      prev.map(q => {
        if (q.id === selectedQuestionId) {
          let defaultOptions: Option[] = [];
          if (!NO_OPTIONS_TYPES.includes(questionType)) {
            defaultOptions = [{ option_number: 1, option_context: '' }];
          }

          return {
            ...q,
            layout_type: questionType,
            options_of_questions: defaultOptions,
          };
        }
        return q;
      }),
    );
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      layout_type: 'SHORT_TYPE',
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

  const handleDeleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    if (selectedQuestionId === id) {
      setSelectedQuestionId(null);
    }
  };

  const handleSubmit = async (isPublishing: boolean) => {
    const formData = {
      ...formInfo,
      is_closed: isPublishing ? ('PUBLISHED' as const) : ('TEMP' as const),
      questions: questions.map((q, index) => ({
        layout_type: q.layout_type,
        question: q.question,
        question_order: index + 1,
        is_required: q.is_required,
        options_of_questions:
          q.options_of_questions?.map(opt => ({
            option_number: opt.option_number,
            option_context: opt.option_context,
          })) || [],
      })),
    };

    try {
      console.log('서버로 전송될 데이터:', formData);
    } catch (error) {
      console.error('폼 저장 실패:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Breadcrumbs items={breadcrumbsItems} className="px-4 md:px-8 lg:px-10" />

      <form className="flex-1 flex md:px-8 lg:px-10 pb-10">
        <div className="flex-1 flex flex-col gap-6 md:flex-row">
          <FormBasicSection
            formInfo={formInfo}
            setFormInfo={setFormInfo}
            onPrivateToggle={handlePrivateToggle}
          />

          <FormContentSection
            formInfo={formInfo}
            questions={questions}
            selectedQuestionId={selectedQuestionId}
            onQuestionSelect={setSelectedQuestionId}
            onQuestionDelete={handleDeleteQuestion}
            onQuestionUpdate={handleUpdateQuestion}
            onSave={() => handleSubmit(false)}
            onPublish={() => handleSubmit(true)}
            onFormInfoUpdate={handleFormInfoUpdate}
          />

          <FormQuestionSection
            selectedQuestion={selectedQuestion}
            onQuestionTypeChange={handleQuestionTypeChange}
            onQuestionUpdate={handleUpdateQuestion}
            onAddQuestion={handleAddQuestion}
          />
        </div>
      </form>
    </div>
  );
}
