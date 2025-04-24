import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.address) {
      setError('Por favor, completa todos los campos.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('El correo electrónico no es válido.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!validateForm()) return;
  
    try {
      // 1. Preparar datos
      const orderData = {
        customer: form,
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        total,
      };
  
      // 2. Guardar temporalmente
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));
  
      // 3. Llamar a Stripe session
      const res = await fetch('http://localhost:5000/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cart.map((item) => ({
            name: item.title,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });
  
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No se pudo generar la sesión de Stripe');
      }
  
    } catch (err) {
      setError(err.message || 'Error al procesar el pago');
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Finalizar compra</h2>

      {cart.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            name="address"
            placeholder="Dirección de envío"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />

          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Resumen:</h3>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm mb-1">
                <span>{item.title} x {item.quantity}kg</span>
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-2 font-bold text-right">Total: €{total.toFixed(2)}</div>
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <button
            type="submit"
            className="bg-[#009929] text-white w-full py-2 rounded hover:bg-green-700 transition"
          >
            Confirmar compra
          </button>
        </form>
      )}
    </div>
  );
}
