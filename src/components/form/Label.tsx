import { cn } from '@/utils/cn';

interface LabelProps {
  text: string;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

export default function Label({ text, htmlFor, required, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn('text-sm font-medium text-13', className)}>
      {text}
      {required && <span className="ml-0.5">*</span>}
    </label>
  );
}
