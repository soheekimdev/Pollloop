import { FormInfo } from '@/types/forms/forms.types';
// import axios from '@/api/axios';
import { useEffect, useState } from 'react';

const mockFormData = {
  title: '프론트엔드 6기 만족도 조사 15주차',
  subtitle: '15주차 학습 내용에 대한 만족도 조사입니다.',
  form_description: '여러분의 소중한 의견을 들려주세요.',
  end_at: '2025-02-28',
  target_count: 20,
  is_private: false,
  questions: [
    {
      id: 1,
      layout_type: 'SHORT_TYPE',
      question: '이름을 입력해 주세요',
      question_order: 1,
      is_required: true,
      options_of_questions: [],
    },
    {
      id: 2,
      layout_type: 'LONG_TYPE',
      question: '이번 주 학습 내용 중 가장 기억에 남는 것과 그 이유를 작성해 주세요',
      question_order: 2,
      is_required: true,
      options_of_questions: [],
    },
    {
      id: 3,
      layout_type: 'CHECKBOX_TYPE',
      question: '이번 주에 어려웠던 내용을 모두 선택해주세요',
      question_order: 3,
      is_required: true,
      options_of_questions: [
        {
          option_number: 1,
          option_context: 'TypeScript 타입 정의',
        },
        {
          option_number: 2,
          option_context: 'React 컴포넌트 설계',
        },
      ],
    },
    // ... 다른 타입의 질문들도 추가
  ],
};

export const useFormData = (formId: string) => {
  const [formData, setFormData] = useState<FormInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const fetchFormData = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await axios.get(`/form/uuid:${formId}/`);
    //     console.log('API Response:', response.data);
    //     setFormData(response.data);
    //     setError(null);
    //   } catch (error) {
    //     setError('폼을 불러오는 데 실패했습니다.');
    //     console.error('Error fetching:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // if (formId) {
    //   fetchFormData();
    // }

    // API 대신 목업 데이터 사용
    setFormData(mockFormData);
    setIsLoading(false);
  }, [formId]);

  return { formData, isLoading, error };
};
