import { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs.tsx';
import FormBasicSection from '@/components/forms/FormBasicSection';
import FormContentSection from '@/components/forms/FormContentSection';
import FormQuestionSection from '@/components/forms/FormQuestionSection';
import { FormInfo, Question, QuestionType } from '@/types/forms/forms.types';

export default function FormCreate() {
  const breadcrumbsItems = ['홈', '나의 폼', '폼 만들기'];

  const [formInfo, setFormInfo] = useState<FormInfo>({
    title: '',
    tag: '',
    end_at: '',
    is_closed: false,
    access_code: '',
  });

  const [isPrivateForm, setIsPrivateForm] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
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
                questionType === 'CHECKBOX_TYPE' ||
                questionType === 'RADIO_TYPE' ||
                questionType === 'DROPDOWN_TYPE'
                  ? []
                  : undefined,
              hasEtcOption:
                questionType === 'CHECKBOX_TYPE' || questionType === 'RADIO_TYPE' ? false : undefined,
              fileTypes: questionType === 'FILE_UPLOAD_TYPE' ? [] : undefined,
            }
          : q,
      ),
    );
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(), // 임시 ID
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
    <div className="flex flex-col gap-4 h-full">
      <Breadcrumbs items={breadcrumbsItems} className="px-4 md:px-8 lg:px-10" />

      <form className="flex-1 flex md:px-8 lg:px-10 pb-10">
        <div className="flex-1 flex flex-col gap-6 md:flex-row">
          <FormBasicSection
            formInfo={formInfo}
            setFormInfo={setFormInfo}
            isPrivateForm={isPrivateForm}
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
