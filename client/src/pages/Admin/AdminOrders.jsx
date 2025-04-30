import { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem('adminUser'))?.token;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const markAsCompleted = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/complete`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setOrders(orders.map(o => o._id === id ? { ...o, paid: true } : o));
    } else {
      alert('Error al marcar como completado');
    }
  };

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Pedidos</h2>
      {orders.length === 0 && <p>No hay órdenes aún.</p>}
      <ul className="space-y-3">
        {orders.map((order) => (
          <li key={order._id} className="bg-white p-4 rounded shadow">
            <p><strong>{order.customer.name}</strong></p>
            <p>Total: <span className="font-semibold">{order.total.toFixed(2)} €</span></p>
            <p className="mb-2">{order.paid ? '✅ Pagado' : '❌ Pendiente'}</p>
            {!order.paid && (
              <button
                onClick={() => markAsCompleted(order._id)}
                className="bg-[#009929] hover:bg-green-700 text-white px-4 py-1 rounded"
              >
                Marcar como completado
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
