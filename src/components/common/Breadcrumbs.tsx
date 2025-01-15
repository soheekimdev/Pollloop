import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: string[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const renderBreadcrumbItem = (item: string, index: number) => {
    // 첫 번째 항목 (홈)
    if (index === 0) {
      return (
        <Link to="/" className="leading-3 hover:decoration-1 hover:underline underline-offset-4">
          홈
        </Link>
      );
    }

    // 두 번째 항목 (나의 폼)
    if (index === 1) {
      return (
        <Link
          to="/forms"
          className="leading-3 hover:decoration-1 hover:underline underline-offset-4"
        >
          나의 폼
        </Link>
      );
    }

    // 나머지 항목들
    return <span className="leading-3">{item}</span>;
  };

  return (
    <div className={cn('flex gap-1', className)}>
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-1 text-13">
          {renderBreadcrumbItem(item, index)}
          {index !== items.length - 1 && <ChevronRight size={16} />}
        </div>
      ))}
    </div>
  );
}
