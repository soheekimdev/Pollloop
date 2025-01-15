import { useState } from 'react';
import { instance } from '@/api/axios';
import { SubmitFormRequest } from '@/types/forms/forms.types';

export function useSubmitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (params: SubmitFormRequest) => {
    setIsSubmitting(true);
    try {
      const response = await instance.post('/form/submit/', params);
      return response.data;
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
}
