import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function HomeLayout() {
  return (
    <div className="flex flex-col h-full gap-4 bg-pollloop-bg-03">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
