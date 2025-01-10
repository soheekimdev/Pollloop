import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  tip?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', tip, error, className, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full h-10 px-3 rounded-lg bg-input-bg border text-sm placeholder:text-input-placeholder focus-visible:outline-pollloop-brown-01 disabled:bg-button-ghost-bg-active',
            error ? 'border-status-red-text' : 'border-input-border',
          )}
          {...props}
        />
        {(error || tip) && (
          <p className={cn('text-xs', error ? 'text-status-red-text' : 'text-input-tip')}>
            {error || tip}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
