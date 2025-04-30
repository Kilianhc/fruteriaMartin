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
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Panel de administración</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </header>

      <nav className="mb-6 space-x-4">
        <Link to="/admin/products" className="text-[#009929] font-semibold hover:underline">Productos</Link>
        <Link to="/admin/orders" className="text-[#009929] font-semibold hover:underline">Pedidos</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
