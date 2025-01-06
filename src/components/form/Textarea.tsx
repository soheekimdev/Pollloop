import clsx from 'clsx';
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
  disabled,
  className,
  onChange,
  // TODO: error case styling 추가
  ...props
}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      ref={ref}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      className={clsx(
        'w-full h-20 p-3 rounded-lg bg-input-bg border border-input-border text-sm placeholder:text-input-placeholder focus-visible:outline-pollloop-brown-01 resize-none',
        className,
      )}
      onChange={onChange}
      {...props}
    />
  );
}
