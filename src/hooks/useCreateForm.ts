import { useState } from 'react';
import { instance } from '@/api/axios';
import { FormInfo, Question } from '@/types/forms/forms.types';
import { AxiosError } from 'axios';

interface CreateFormData {
  formInfo: FormInfo;
  questions: Question[];
  isPublishing: boolean;
}

export function useCreateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createForm = async ({ formInfo, questions, isPublishing }: CreateFormData) => {
    setIsLoading(true);
    setError(null);

    const formData = {
      user: 1, // TODO: 실제 사용자 ID로 변경 필요
      ...formInfo,
      is_closed: isPublishing ? 'OPEN' : 'TEMP',
      is_bookmark: false,
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

      // formData 유효성 검사
      if (!formData.title) throw new Error('폼 제목은 필수입니다.');
      if (!formData.end_at) throw new Error('마감 일자는 필수입니다.');
      if (!formData.target_count) throw new Error('참여 인원은 필수입니다.');

      const response = await instance.post('/form/create/', formData);

      if (!response?.data) {
        throw new Error('서버 응답에 데이터가 없습니다.');
      }

      console.log('서버 응답 전체:', response);
      console.log('폼 생성 성공:', response.data);

      // TODO: 실제 URL로 변경 및 모달에 포함 필요
      console.log('참여 폼 URL:', `localhost:5173/forms/response/${response.data.uuid}`);
      return response.data;
    } catch (err) {
      console.log('에러 발생:', err);

      if (err instanceof AxiosError) {
        console.error('에러 객체:', err);
        console.error('서버 응답 상태:', err.response?.status);
        console.error('서버 응답 데이터:', err.response?.data);

        let errorMessage;
        if (err.response?.data) {
          errorMessage =
            typeof err.response.data === 'string'
              ? err.response.data
              : JSON.stringify(err.response.data);
        } else if (err.message) {
          errorMessage = err.message;
        } else {
          errorMessage = '폼 생성 중 오류가 발생했습니다.';
        }

        console.error('폼 생성 실패:', errorMessage);
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createForm,
    isLoading,
    error,
  };
}
