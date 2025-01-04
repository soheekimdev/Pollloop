import { cva } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  variant?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
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
    ...props
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="flex gap-1">
      {required && <p>*</p>}
      <input
        ref={ref}
        placeholder={placeholder}
        className={formsInputVariants({ variant, align })}
        {...props}
      />
    </div>
  );
});

FormsInput.displayName = 'FormsInput';

export default FormsInput;
