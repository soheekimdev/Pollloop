import { Copy } from 'lucide-react';
import { copyToClipboard } from '../../../utils/copyToClipboard';

interface AccessCodeButtonProps {
  access_code: string;
}

export default function AccessCodeButton({ access_code }: AccessCodeButtonProps) {
  const handleCopy = (event: React.MouseEvent) => {
    event.preventDefault();
    copyToClipboard(access_code, '비밀번호가 복사되었습니다.');
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center h-10 gap-2 px-4 py-2 ml-5 rounded-lg w-fit text-15 bg-button-ghost-bg-active/15 "
      type="button"
      aria-label="비밀번호 복사하기"
    >
      {access_code} <Copy size={16} aria-hidden="true" />
    </button>
  );
}
