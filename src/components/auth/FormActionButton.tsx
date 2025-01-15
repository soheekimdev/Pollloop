import { Link } from 'react-router-dom';
import Button from '../common/Button';
import CircleLoader from '../common/loaders/CircleLoader';

type FormActionButtonProps = {
  submitButtonText: string;
  linkButtonText: string;
  path: string;
  disabled?: boolean;
};

export default function FormActionButton({
  submitButtonText,
  linkButtonText,
  path,
  disabled,
}: FormActionButtonProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        type="submit"
        size="md"
        variant="primary"
        fullWidth={true}
        disabled={disabled}
        className="text-sm"
      >
        {submitButtonText}
        {disabled && <CircleLoader size={16} />}
      </Button>
      <p className="text-13 text-pollloop-orange text-center">
        <Link to={path}>{linkButtonText}</Link>
      </p>
    </div>
  );
}
