import { Outlet } from 'react-router-dom';

export default function AccountLayout() {
  return (
    <div className="h-full bg-pollloop-bg-03">
      <main className="w-full h-full flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
