import Button from '../../common/Button';
import AccessCodeButton from './AccessCodeButton';
import { AccessCodeSectionProps } from './AccessCodeSection';

export default function SmallAccessCodeSection(props: AccessCodeSectionProps) {
  const { is_closed, isDisplayed, access_code, onDisplay, buttonText, className } = props;

  if (is_closed === 'CLOSED') return null;

  return isDisplayed ? (
    <AccessCodeButton
      access_code={access_code}
      className={`w-fit md:absolute md:bottom-[-3px] md:left-20 text-nowrap text-sm ${className || ''}`}
    />
  ) : (
    <Button
      size="sm"
      variant="secondary"
      onClick={onDisplay}
      className={`w-fit md:absolute md:bottom-[-3px] md:left-20 text-nowrap text-sm ${className || ''}`}
    >
      {buttonText}
    </Button>
  );
}
