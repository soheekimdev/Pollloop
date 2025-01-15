import { ChevronDown, CircleUserRound, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MenuDropdown from './MenuDropdown';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  const toggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };
  return (
    <header className="shrink-0 h-20 px-10 py-5 text-pollloop-brown-01 flex justify-between items-center font-iowan font-semibold">
      <div className="flex items-center gap-8 md:gap-[104px]">
        <h1 className="text-2xl">
          <Link to="/">Pollloop</Link>
        </h1>
        <nav className="text-lg">
          <ul className="flex gap-4  md:gap-10">
            <li>
              <Link to="forms">Form</Link>
            </li>
            <li>
              <Link to="/">Ask</Link>
            </li>
          </ul>
        </nav>
      </div>
      <aside className="flex h-8 justify-end items-center gap-2">
        <button onClick={toggleModal} className="relative z-10">
          <Menu className="block md:hidden hover:cursor-pointer" />
        </button>
        <div className="hidden md:flex items-center gap-2">
          {user?.profileImage ? (
            <img src={user?.profileImage} className="w-8 h-8 rounded-2xl" />
          ) : (
            <CircleUserRound />
          )}
          <p className="text-sm font-bold">{user?.email}</p>
          <button onClick={toggleModal} className="relative z-10">
            <ChevronDown className="hover:cursor-pointer" />
          </button>
        </div>
        {isMenuOpen && <MenuDropdown setIsMenuOpen={setIsMenuOpen} />}
      </aside>
    </header>
  );
}
