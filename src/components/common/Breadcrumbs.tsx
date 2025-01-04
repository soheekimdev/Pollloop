import { cn } from '@/utils/cn';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: string[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <div className={cn('flex gap-1', className)}>
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-1 text-13">
          <span className="leading-3">{item}</span>
          {index !== items.length - 1 && <ChevronRight size={16} />}
        </div>
      ))}
    </div>
  );
}
