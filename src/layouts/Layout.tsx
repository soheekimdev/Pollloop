import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      {/* Navbar here */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
