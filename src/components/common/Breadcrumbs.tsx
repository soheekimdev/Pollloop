import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: string[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="flex gap-1">
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-1 text-13">
          <span className="leading-3">{item}</span>
          {index !== items.length - 1 && <ChevronRight size={16} />}
        </div>
      ))}
    </div>
  );
}
