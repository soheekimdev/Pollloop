import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function FormLayout() {
  return (
    <div className="flex flex-col h-full gap-4 overflow-auto bg-pollloop-bg-02">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
