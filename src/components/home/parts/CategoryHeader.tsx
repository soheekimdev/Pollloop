import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryHeaderProps {
  title: string;
  moreLink: string;
}

export function CategoryHeader({ title, moreLink }: CategoryHeaderProps) {
  return (
    <header className="flex items-center justify-between h-7">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Link className="flex items-center text-sm" to={moreLink} aria-label={`${title} 더보기`}>
        <span>더보기</span>
        <ChevronRight size={14} aria-hidden="true" />
      </Link>
    </header>
  );
}
