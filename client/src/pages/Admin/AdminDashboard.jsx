import { Link } from 'react-router-dom';
import { isAdmin } from '../../utils/isAdmin';

export default function AdminDashboard() {
  if (!isAdmin()) return <p>No tienes acceso</p>;

  return (
    <div>
      <h2>Panel de Administración</h2>
      <ul>
        <li><Link to="/admin/products">Gestionar Productos</Link></li>
        <li><Link to="/admin/orders">Ver Órdenes</Link></li>
      </ul>
    </div>
  );
}
