import { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem('adminUser'))?.token;

  const fetchOrders = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  const markAsCompleted = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/complete`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setOrders(orders.map((o) => o._id === id ? { ...o, paid: true } : o));
    } else {
      alert('Error al marcar como completada');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div>
      <h2>Pedidos</h2>
      {orders.length === 0 && <p>No hay órdenes aún.</p>}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <strong>{order.customer.name}</strong> — Total: {order.total.toFixed(2)} € — 
            {order.paid ? ' ✅ Pagado' : ' ❌ Pendiente'}
            {' '}
            {!order.paid && (
              <button onClick={() => markAsCompleted(order._id)}>✔️ Marcar como completado</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}