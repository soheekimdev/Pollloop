import Button from '../../common/Button';
import AccessCodeButton from './AccessCodeButton';

export interface AccessCodeSectionProps {
  buttonText: string;
  is_closed: 'OPEN' | 'CLOSED';
  isDisplayed: boolean;
  access_code: string;
  onDisplay: (event: React.MouseEvent) => void;
  className?: string;
}

export default function AccessCodeSection({
  buttonText,
  is_closed,
  isDisplayed,
  access_code,
  onDisplay,
  className,
}: AccessCodeSectionProps) {
  if (is_closed === 'CLOSED') return null;

  return isDisplayed ? (
    <AccessCodeButton access_code={access_code} className={`${className}`} />
  ) : (
    <Button
      size="md"
      variant="secondary"
      onClick={onDisplay}
      className={`ml-5 w-fit ${className || ''}`}
    >
      {buttonText}
    </Button>
  );
}
