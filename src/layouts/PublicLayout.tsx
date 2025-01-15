import { Navigate, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('user');
  if (token && userInfo) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
