import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  const { user } = useAuth();
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}