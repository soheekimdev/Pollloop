import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function DashboardLayout() {
  return (
    <div className="flex flex-col gap-4 h-full bg-pollloop-bg-01 overflow-auto">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
