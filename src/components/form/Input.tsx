import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  tip?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name, id, placeholder, tip, onChange, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          className={
            'w-full h-10 px-3 rounded-lg bg-input-bg border text-sm placeholder:text-input-placeholder border-input-border'
          }
          {...props}
        />
        {tip && <p className="mt-2 text-xs text-input-tip">{tip}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
