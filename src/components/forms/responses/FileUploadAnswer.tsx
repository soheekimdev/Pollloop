import Button from '@/components/common/Button';
import { Upload } from 'lucide-react';
import { instance } from '@/api/axios';
import { errorToast } from '@/utils/toast';
import { FileAnswerProps } from '@/types/forms/forms.types';

export default function FileUploadAnswer({
  data,
  value,
  onChange,
  formTitle,
  error,
}: FileAnswerProps) {
  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('input_source', 'form_answer');
      formData.append('form_title', formTitle);
      formData.append('question_order', data.question_order.toString());
      formData.append('option_number', '1');
      formData.append('file', file);

      const response = await instance.post('/inputfile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.file_url) {
        onChange(data.layout_type, response.data.file_url);
      }
    } catch (error) {
      console.error('File upload error:', error);
      errorToast('파일 업로드에 실패했습니다.');
    }
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf,.xlsx,.xls,.csv'; // 허용할 파일 형식 지정
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Button type="button" className="self-start" onClick={handleClick}>
          <Upload size={16} />
          파일 업로드
        </Button>
        {value && (
          <div className="text-sm text-gray-600">업로드된 파일: {value.split('/').pop()}</div>
        )}
      </div>

      {error && <p className="text-xs text-status-red-text">{error}</p>}
    </div>
  );
}
