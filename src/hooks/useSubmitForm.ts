import { useState } from 'react';
import { instance } from '@/api/axios';
import { SubmitFormRequest } from '@/types/forms/forms.types';
import { toast } from 'react-toastify';

export function useSubmitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (params: SubmitFormRequest) => {
    setIsSubmitting(true);
    try {
      const response = await instance.post('/form/submit/', params);
      return response.data;
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('폼 제출에 실패했습니다. 다시 시도해주세요.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
}
