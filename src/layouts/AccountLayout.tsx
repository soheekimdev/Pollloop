import { Outlet } from 'react-router-dom';

export default function AccountLayout() {
  return (
    <div className="h-full bg-pollloop-bg-02">
      {/* Navbar here */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
