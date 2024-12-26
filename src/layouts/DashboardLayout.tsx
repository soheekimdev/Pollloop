import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex flex-col gap-4 h-full bg-pollloop-bg-01">
      {/* Navbar here */}
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
