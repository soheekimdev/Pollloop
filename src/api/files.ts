import { instance } from './axios';

interface UploadImageParams {
  input_source: 'form';
  form_title: string;
  question_order: number;
  option_number: number;
  file: File;
}

export const uploadImage = async ({
  input_source,
  form_title,
  question_order,
  option_number,
  file,
}: UploadImageParams) => {
  const formData = new FormData();
  formData.append('input_source', input_source);
  formData.append('form_title', form_title);
  formData.append('question_order', String(question_order));
  formData.append('option_number', String(option_number));
  formData.append('file', file);

  const response = await instance.post('/inputfile/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
