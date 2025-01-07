import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { cva } from 'class-variance-authority';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  variant?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
  showCharCount?: boolean;
  maxLength?: number;
}

const formsInputVariants = cva(
  'w-full bg-transparent placeholder:text-input-placeholder border-b border-transparent hover:border-input-border focus-visible:outline-none focus-visible:border-pollloop-brown-01',
  {
    variants: {
      variant: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-xl',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      variant: 'lg',
      align: 'left',
    },
  },
);

const FormsInput = forwardRef<HTMLInputElement, InputProps>(function FormsInput(
  {
    placeholder = '여기에 질문을 적어주세요.',
    required = false,
    variant,
    align,
    showCharCount = true,
    maxLength = 255,
    value = '',
    onChange,
    ...props
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [isFocused, setIsFocused] = useState(false);
  const currentLength = String(value).length;
  const isNearLimit = currentLength >= maxLength * 0.9; // 90% 이상 채워졌을 때

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange?.(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      <div className="flex gap-1">
        {required && <p>*</p>}
        <input
          ref={ref}
          placeholder={placeholder}
          className={formsInputVariants({ variant, align })}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>

      {showCharCount && isFocused && (
        <div
          className={`absolute -bottom-5 self-end text-xs ${isNearLimit ? 'text-status-red-text' : 'text-input-tip'}`}
        >
          {currentLength}/{maxLength}
        </div>
      )}
    </div>
  );
});

FormsInput.displayName = 'FormsInput';

export default FormsInput;
