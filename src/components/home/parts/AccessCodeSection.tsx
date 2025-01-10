import Button from '../../common/Button';
import AccessCodeButton from './AccessCodeButton';

interface AccessCodeSectionProps {
  is_closed: boolean;
  isDisplayed: boolean;
  access_code: string;
  onDisplay: (event: React.MouseEvent) => void;
}

export default function AccessCodeSection({
  is_closed,
  isDisplayed,
  access_code,
  onDisplay,
}: AccessCodeSectionProps) {
  if (is_closed) return null;

  return isDisplayed ? (
    <AccessCodeButton access_code={access_code} />
  ) : (
    <Button size="md" variant="secondary" onClick={onDisplay} className="ml-5 w-fit">
      비밀번호 확인하기
    </Button>
  );
}
