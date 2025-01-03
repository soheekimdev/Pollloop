import clsx from 'clsx';

type Direction = 'row' | 'col';

interface InputWithLabelProps {
  children: React.ReactNode;
  direction?: Direction;
  className?: string;
}

export default function InputWithLabel({
  children,
  direction = 'col',
  className,
}: InputWithLabelProps) {
  return (
    <div
      className={clsx(
        `flex ${direction === 'row' ? 'flex-row items-center justify-between' : 'flex-col'} gap-2`,
        className,
      )}
    >
      {children}
    </div>
  );
}
