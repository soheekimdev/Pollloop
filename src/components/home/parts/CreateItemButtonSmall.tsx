import { CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreateItemButtonProps {
  createLink: string;
  buttonText: string;
}

export function CreateItemButtonSm({ createLink, buttonText }: CreateItemButtonProps) {
  return (
    <li className="list-none w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
      <Link to={createLink} className="block w-full">
        <button className="flex items-center justify-center w-full h-[200px] gap-1 bg-pollloop-light-beige/55 rounded-2xl hover:bg-pollloop-light-beige">
          <CirclePlus size={18} />
          <span>{buttonText}</span>
        </button>
      </Link>
    </li>
  );
}
