import Button from '@/components/common/Button';
import { Upload } from 'lucide-react';
import { Question, QuestionType } from '@/types/forms/forms.types';
import { instance } from '@/api/axios';
import { errorToast } from '@/utils/toast';

interface FileUploadAnswerProps {
  data: Question;
  value?: string;
  onChange: (type: QuestionType, value: string) => void;
  formTitle: string;
}

export default function FileUploadAnswer({
  data,
  value,
  onChange,
  formTitle,
}: FileUploadAnswerProps) {
  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('input_source', 'form_answer');
      formData.append('form_title', formTitle);
      formData.append('question_order', data.question_order.toString());
      formData.append('option_number', '1');
      formData.append('file', file);

      console.log('File upload request:', {
        input_source: 'form_answer',
        form_title: formTitle,
        question_order: data.question_order,
        option_number: 1,
        file: file.name,
      });

      const response = await instance.post('/inputfile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File upload response:', response.data);
      if (response.data.file_url) {
        onChange(data.layout_type, response.data.file_url);
      }
    } catch (error) {
      console.error('File upload error:', error);
      errorToast('이미지 업로드에 실패하였습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(file);
          }
        }}
        className="hidden"
        id={`file-upload-${data.question_order}`}
      />
      <label htmlFor={`file-upload-${data.question_order}`} className="cursor-pointer">
        <Button type="button" className="self-start">
          <Upload size={16} />
          파일 업로드
        </Button>
      </label>
      {value && (
        <div className="text-sm text-gray-600">업로드된 파일: {value.split('/').pop()}</div>
      )}
    </div>
  );
}
