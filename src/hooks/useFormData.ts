import { FormInfo } from '@/types/forms/forms.types';
import { instance } from '@/api/axios';
import { useEffect, useState } from 'react';

export const useFormData = (formId: string) => {
  const [formData, setFormData] = useState<FormInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setIsLoading(true);
        const response = await instance.get(`/form/uuid:${formId}/`);
        console.log('API Response:', response.data);
        setFormData(response.data);
        setError(null);
      } catch (error) {
        setError('폼을 불러오는 데 실패했습니다.');
        console.error('Error fetching:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (formId) {
      fetchFormData();
    }
  }, [formId]);

  return { formData, isLoading, error };
};
