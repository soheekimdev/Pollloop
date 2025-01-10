import { ChevronDown, CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuModal from './MenuModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);
  const toggleModal = () => setIsModalOpen(prev => !prev);
  return (
    <header className="h-[80px] px-5 xs:px-10 py-5 text-pollloop-brown-01 flex justify-between items-center">
      <div className="flex items-center gap-6 md:gap-[104px] xs:gap-14">
        <h1 className="text-base xs:text-lg md:text-2xl ">
          <Link to="/">Polloop</Link>
        </h1>
        <nav className="text-xs xs:text-sm md:text-lg font-bold flex gap-7 xs:gap-10">
          <Link to="forms">Form</Link>
          <Link to="/">Ask</Link>
        </nav>
      </div>
      <aside className="flex h-8 justify-end items-center gap-2">
        {user?.profileImage ? (
          <img src={user?.profileImage} className="w-8 h-8 rounded-2xl" />
        ) : (
          <CircleUserRound />
        )}
        <p className="text-sm font-bold hidden md:block">{user?.email}</p>
        <button>
          <ChevronDown className="hidden md:block hover:cursor-pointer" onClick={toggleModal} />
        </button>
        {isModalOpen && <MenuModal />}
      </aside>
    </header>
  );
}
