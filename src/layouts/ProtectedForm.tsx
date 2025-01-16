import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedForm() {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    localStorage.setItem('redirectPath', location.pathname);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
