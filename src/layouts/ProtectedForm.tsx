import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedForm() {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
