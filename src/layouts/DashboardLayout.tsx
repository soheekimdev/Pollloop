import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  return (
    <div className="flex flex-col gap-4 bg-pollloop-bg-01">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
