import { useState } from 'react';
import FormsLabel from '@/components/forms/FormsLabel';
import FormsInput from '@/components/forms/FormsInput';
import FormsDescription from '@/components/forms/FormsDescription';
import { Plus, X } from 'lucide-react';
import { Option, Question } from '@/types/forms/forms.types';

interface ImageSelectAnswerProps {
  data: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export default function ImageSelectAnswer({ data, onUpdate }: ImageSelectAnswerProps) {
  const [images, setImages] = useState<Option[]>(
    data.options_of_questions?.map(option => ({
      ...option,
      imageUrl: option.option_context.split('|')[1] || '',
    })) || [],
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ question: e.target.value });
  };

  const MAX_IMAGES = 4;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 개수 제한 확인
    if (images.length >= MAX_IMAGES) {
      alert('이미지는 최대 4개까지만 추가할 수 있습니다.');
      return;
    }

    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 제한 (1MB)
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 1MB 이하여야 합니다.');
      return;
    }

    // 이미지 URL 생성
    // TODO: 실제 서버 통신 시에는 이미지 파일을 FormData로 변환하여 전송
    // TODO: URL.createObjectURL로 생성된 URL은 컴포넌트가 언마운트될 때 해제해야 메모리 누수를 방지할 수 있음
    // TODO: 이미지 업로드 시 추가적인 최적화(압축, 리사이징 등) 진행
    const imageUrl = URL.createObjectURL(file);

    // 새로운 이미지 옵션 추가
    const newImage: Option = {
      option_number: (images.length + 1).toString(),
      option_context: `${file.name}|${imageUrl}`,
      imageUrl,
    };

    const updatedImages = [...images, newImage];
    setImages(updatedImages);

    // Question 데이터 업데이트
    onUpdate({
      options_of_questions: updatedImages.map(img => ({
        option_number: img.option_number,
        option_context: img.option_context,
      })),
    });
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const reorderedImages = updatedImages.map((img, i) => ({
      ...img,
      option_number: (i + 1).toString(),
    }));

    setImages(reorderedImages);
    onUpdate({
      options_of_questions: reorderedImages.map(img => ({
        option_number: img.option_number,
        option_context: img.option_context,
      })),
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormsLabel text="이미지 선택" />
        <FormsInput
          required={data.is_required}
          value={data.question}
          onChange={handleQuestionChange}
        />
        <FormsDescription>
          이미지는 최대 {MAX_IMAGES}개까지, 파일당 1MB 이하로 업로드 가능합니다.
          <br />
          모든 이미지는 정사각형(1:1) 비율로 표시됩니다.
        </FormsDescription>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(144px,1fr))] gap-4 auto-rows-fr w-full">
        {images.map((image, index) => (
          <div key={image.option_number} className="relative group min-w-36 max-w-xs select-none">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={image.imageUrl}
                alt={`${image.option_number}번`}
                className="w-full h-full object-cover cursor-default"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-pollloop-brown-03/70 text-pollloop-light-beige text-xs py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity truncate">
                {image.option_context.split('|')[0]}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleImageDelete(index)}
              className="flex items-center justify-center absolute -top-2 -right-2 w-6 h-6 bg-pollloop-light-beige rounded-full shadow-md hover:bg-tag-secondary-bg transition-colors"
              aria-label="이미지 삭제"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <label className="flex-grow flex items-center justify-center basis-36 min-w-36 max-w-xs aspect-square bg-tag-default-bg rounded-lg cursor-pointer hover:bg-tag-default-bg/90 transition-colors">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
            <div className="flex flex-col items-center gap-1">
              <Plus size={16} />
              <span className="text-xs text-tag-default-text/65">
                {images.length === 0 ? '이미지 추가' : `${images.length}/4`}
              </span>
            </div>
          </label>
        )}
      </div>
    </>
  );
}
