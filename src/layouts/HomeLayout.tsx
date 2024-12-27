import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HomeLayout() {
  return (
    <div className="flex flex-col gap-4 h-full bg-pollloop-bg-01">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
