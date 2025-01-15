import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '@/components/common/Breadcrumbs.tsx';
import MainLoader from '@/components/common/loaders/MainLoader';
import FormBasicSection from '@/components/forms/create/FormBasicSection';
import FormContentSection from '@/components/forms/create/FormContentSection';
import FormQuestionSection from '@/components/forms/create/FormQuestionSection';
import { FormInfo, Question, QuestionType } from '@/types/forms/forms.types';
import { generateAccessCode } from '@/utils/generateAccessCode';
import { validateFormInfo } from '@/utils/validation';
import { errorToast } from '@/utils/toast';
import { useCreateForm } from '@/hooks/useCreateForm';
import { NO_OPTIONS_TYPES } from '@/constants/forms.constants';
import { instance } from '@/api/axios';

export default function FormCreate() {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbsItems = ['홈', '나의 폼', '폼 만들기'];

  const [formInfo, setFormInfo] = useState<FormInfo>({
    title: '',
    tag: '',
    end_at: '',
    target_count: 0,
    is_closed: 'TEMP',
    is_private: false,
    questions: [],
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      layout_type: 'SHORT_TYPE',
      question: '',
      question_order: 1,
      is_required: false,
      options_of_questions: [
        {
          option_number: 1,
          option_context: '',
        },
      ],
    },
  ]);

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>('1');
  const selectedQuestion = questions.find(q => q.id === selectedQuestionId);

  useEffect(() => {
    const loadFormData = async () => {
      if (!formId) return;

      setIsLoading(true);
      try {
        const response = await instance.get(`/form/uuid:${formId}/`);
        const formData = response.data;

        setFormInfo({
          title: formData.title,
          tag: formData.tag || '',
          end_at: formData.end_at,
          target_count: formData.target_count,
          is_closed: formData.is_closed,
          is_private: !!formData.access_code,
          subtitle: formData.subtitle,
          form_description: formData.form_description,
          questions: [],
        });

        setQuestions(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formData.questions.map((q: any) => ({
            ...q,
            id: String(q.question_order), // 임시 id 생성
          })),
        );
      } catch (error) {
        console.error('Form data loading failed:', error);
        errorToast('폼 데이터를 불러오는데 실패했습니다');
        navigate('/forms');
      } finally {
        setIsLoading(false);
      }
    };

    loadFormData();
  }, [formId, navigate]);

  const handlePrivateToggle = (isChecked: boolean) => {
    const newAccessCode = isChecked ? generateAccessCode() : '';
    setFormInfo(prev => ({
      ...prev,
      is_private: isChecked,
      access_code: newAccessCode,
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
          const defaultOptions = [
            {
              option_number: 1,
              option_context: '',
            },
          ];

          if (!NO_OPTIONS_TYPES.includes(questionType)) {
            defaultOptions[0].option_context = '옵션 1';
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
      options_of_questions: [
        {
          option_number: 1,
          option_context: '',
        },
      ],
    };
    setQuestions(prev => [...prev, newQuestion]);
    setSelectedQuestionId(newQuestion.id as string);
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
    if (id === '1') {
      errorToast('첫 번째 질문은 삭제할 수 없습니다.');
      return;
    }

    setQuestions(prev => {
      const filteredQuestions = prev.filter(q => q.id !== id);
      return filteredQuestions.map((question, index) => ({
        ...question,
        question_order: index + 1,
      }));
    });

    if (selectedQuestionId === id) {
      setSelectedQuestionId(null);
    }
  };

  const { createForm } = useCreateForm();

  const handleSubmit = async (isPublishing: boolean) => {
    try {
      const formErrors = validateFormInfo(formInfo);
      if (formErrors.length > 0) {
        errorToast(formErrors[0].message);
        return;
      }

      if (isPublishing) {
        if (questions.length === 0) {
          errorToast('최소 1개 이상의 질문을 추가해주세요.');
          return;
        }
      }

      const formData = {
        ...formInfo,
        questions,
        ...(formId && { uuid: formId }),
      };

      const result = await createForm({
        formInfo: formData,
        questions,
        isPublishing,
      });
      console.log('Form submit result:', result);
      return result;
    } catch (error) {
      console.error('폼 저장 실패:', error);
      throw error;
    }
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="flex flex-col gap-4 h-full md:overflow-hidden">
      <Breadcrumbs items={breadcrumbsItems} className="px-4 md:px-8 lg:px-10" />

      <form className="flex-1 flex px-4 md:px-8 lg:px-10 pb-10 md:overflow-hidden">
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
            onPublish={async () => await handleSubmit(true)}
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
