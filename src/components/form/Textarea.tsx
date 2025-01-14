import { cn } from '@/utils/cn';
import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.RefObject<HTMLTextAreaElement>;
  error?: boolean;
}

export default function Textarea({
  id,
  name,
  ref,
  placeholder,
  value,
  className,
  onChange,
  ...props
}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      ref={ref}
      placeholder={placeholder}
      value={value}
      className={cn(
        'w-full h-20 p-3 rounded-lg bg-input-bg border border-input-border text-sm placeholder:text-input-placeholder focus-visible:outline-pollloop-brown-01 resize-none scrollable disabled:bg-button-ghost-bg-active',
        className,
      )}
      onChange={onChange}
      {...props}
    />
  );
}
