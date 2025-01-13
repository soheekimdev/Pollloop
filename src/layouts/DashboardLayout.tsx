import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-full gap-4 overflow-auto bg-pollloop-bg-01">
      <Navbar />
      <Outlet />
    </div>
  );
}
