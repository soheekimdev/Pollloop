import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'flex-none flex items-center gap-1 justify-center rounded-lg transition-colors focus-visible:outline-pollloop-brown-01 disabled:bg-button-disabled-bg disabled:text-button-disabled-text disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-[13px]',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
      variant: {
        primary: 'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg/90',
        secondary:
          'bg-button-secondary-bg text-button-secondary-text hover:bg-button-secondary-bg/90',
        neutral: 'bg-button-neutral-bg text-button-neutral-text hover:bg-button-neutral-bg/90',
        danger: 'bg-button-danger-bg text-button-danger-text hover:bg-button-danger-bg/90',
      },
      fullWidth: {
        true: 'w-full',
      },
      flex: {
        true: 'flex-1',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'secondary',
      fullWidth: false,
      flex: false,
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  size,
  variant,
  fullWidth,
  flex,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ size, variant, fullWidth, flex }), className)}
      {...props}
    />
  );
}
