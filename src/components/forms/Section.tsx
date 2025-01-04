import { cn } from '@/utils/cn';

interface SectionProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={cn('flex flex-col gap-4 p-6 bg-pollloop-bg-02 rounded-2xl', className)}>
      {children}
    </section>
  );
}
