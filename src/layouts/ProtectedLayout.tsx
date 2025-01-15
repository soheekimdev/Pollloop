import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  const token = localStorage.getItem('tokens');
  const userInfo = localStorage.getItem('user');

  if (!token && !userInfo) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
