import { Copy } from 'lucide-react';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import Button from '../../common/Button';

interface AccessCodeButtonProps {
  className?: string;
  access_code: string;
}

export default function AccessCodeButton({ access_code, className }: AccessCodeButtonProps) {
  const handleCopy = (event: React.MouseEvent) => {
    event.preventDefault();
    copyToClipboard(access_code, '비밀번호가 복사되었습니다.');
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      onClick={handleCopy}
      className={`w-fit text-sm bg-button-ghost-bg-active/15 text-pollloop-brown-01 hover:text-button-primary-text ${className || ''}`}
      aria-label="비밀번호 복사하기"
    >
      {access_code} <Copy size={16} aria-hidden="true" />
    </Button>
  );
}
