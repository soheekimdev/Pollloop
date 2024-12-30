import { Link } from 'react-router-dom';
import Button from '../common/Button';

type FormActionButtonProps = {
  submitButtonText: string;
  linkButtonText: string;
  path: string;
};

export default function FormActionButton({
  submitButtonText,
  linkButtonText,
  path,
}: FormActionButtonProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button size="md" variant="primary" fullWidth={true} className="text-sm">
        {submitButtonText}
      </Button>
      <p className="text-13 text-pollloop-orange text-center">
        <Link to={path}>{linkButtonText}</Link>
      </p>
    </div>
  );
}
