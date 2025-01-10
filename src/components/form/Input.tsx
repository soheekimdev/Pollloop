import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  tip?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', tip, className, ...props }, ref) => {
    return (
      <div className={className}>
        <input
          ref={ref}
          type={type}
          className="w-full h-10 px-3 rounded-lg bg-input-bg border border-input-border text-sm placeholder:text-input-placeholder focus-visible:outline-pollloop-brown-01 disabled:bg-button-ghost-bg-active"
          {...props}
        />
        {tip && <p className="mt-2 text-xs text-input-tip">{tip}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
