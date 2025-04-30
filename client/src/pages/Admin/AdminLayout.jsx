import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h2>Panel de administración</h2>
      <nav className="my-4">
        <Link to="/admin">Dashboard</Link> |{" "}
        <Link to="/admin/products">Productos</Link> |{" "}
        <Link to="/admin/orders">Pedidos</Link> |{" "}
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Cerrar sesión</button>
      </nav>
      <Outlet />
    </div>
  );
}