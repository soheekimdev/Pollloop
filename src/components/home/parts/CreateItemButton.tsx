import { CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreateItemButtonProps {
  createLink: string;
  buttonText: string;
}

export function CreateItemButton({ createLink, buttonText }: CreateItemButtonProps) {
  return (
    <Link to={createLink}>
      <button className="flex items-center justify-center w-full h-[200px] gap-1 bg-pollloop-light-beige/55 rounded-2xl hover:bg-pollloop-light-beige">
        <CirclePlus size={18} />
        <span>{buttonText}</span>
      </button>
    </Link>
  );
}
