type Direction = 'row' | 'col';

interface InputWithLabelProps {
  children: React.ReactNode;
  direction?: Direction;
}

export default function InputWithLabel({ children, direction = 'col' }: InputWithLabelProps) {
  return (
    <div
      className={`flex ${direction === 'row' ? 'flex-row items-center justify-between' : 'flex-col'} gap-2`}
    >
      {children}
    </div>
  );
}
