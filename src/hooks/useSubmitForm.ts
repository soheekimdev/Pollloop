import { useState } from 'react';
import { instance } from '@/api/axios';
import { Question } from '@/types/forms/forms.types';

interface SubmitFormData {
  uuid: string;
  questions: Question[];
}

export function useSubmitForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (data: SubmitFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('API request URL:', '/form/submit/');
      console.log('API request data:', data);

      const response = await instance.post('/form/submit/', {
        user: 5, // TODO: 실제 사용자 ID로 변경 필요
        uuid: data.uuid,
        questions: data.questions,
      });

      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '폼 제출 중 오류가 발생했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitForm,
    isLoading,
    error,
  };
}
