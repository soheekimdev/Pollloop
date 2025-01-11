import { useRef, useState } from 'react';
import Button from '@/components/common/Button';
import { Upload, X } from 'lucide-react';
import { Question } from '@/types/forms/forms.types';
import FormsDescription from '../create/FormsDescription';

const FILE_SIZE_LIMIT = 1 * 1024 * 1024; // 1MB

const ALLOWED_TYPES = {
  image: '.jpg,.jpeg,.png,.gif',
  pdf: '.pdf',
  spreadsheet: '.xlsx,.xls,.csv',
};

interface FileUploadAnswerProps {
  data: Question;
  onChange: (value: File | null) => void;
}

export default function FileUploadAnswer({ data, onChange }: FileUploadAnswerProps) {
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedFileType = data.options_of_questions.find(option => option.option_number === 99)
    ?.option_context as keyof typeof ALLOWED_TYPES;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) {
      setFileName('');
      onChange(null);
      return;
    }

    if (file.size > FILE_SIZE_LIMIT) {
      setError('파일 크기는 1MB를 초과할 수 없습니다.');
      e.target.value = '';
      setFileName('');
      onChange(null);
      return;
    }

    try {
      setFileName(file.name);
      onChange(file);
    } catch (error) {
      setError('파일 업로드 중 오류가 발생했습니다.');
      console.error(error);
      setFileName('');
      onChange(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFileName('');
    setError('');
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Button
          type="button"
          variant="secondary"
          onClick={handleButtonClick}
          className="whitespace-nowrap"
        >
          <Upload size={16} />
          파일 업로드
        </Button>

        {fileName && (
          <div className="flex items-center gap-3 px-4 py-2 pr-3 rounded-lg bg-button-neutral-bg overflow-hidden">
            <span className="flex-1 truncate">{fileName}</span>
            <button
              type="button"
              className="p-px hover:text-tag-default-text/65"
              onClick={handleRemoveFile}
              aria-label="옵션 삭제"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-status-red-text text-sm">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES[allowedFileType]}
        onChange={handleFileSelect}
        required={data.is_required}
        className="hidden"
      />

      <FormsDescription>파일은 최대 1개까지, 파일당 1MB 이하로 업로드 가능합니다.</FormsDescription>
    </div>
  );
}
