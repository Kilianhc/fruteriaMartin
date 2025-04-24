import { useEffect, useState } from 'react';
import { createOrder } from '../../services/orderService';
import { useCart } from '../../context/CartContext';

export default function SuccessPage() {
  const [status, setStatus] = useState('Procesando...');
  const { clearCart } = useCart();

  useEffect(() => {
    const finalizeOrder = async () => {
      const stored = localStorage.getItem('pendingOrder');
      if (!stored) return setStatus('No se encontraron datos de la orden.');

      const orderData = JSON.parse(stored);
      try {
        const res = await createOrder({
          ...orderData,
          paid: true,
          paymentId: 'stripe-auto-success', // o session ID real si lo guardás
        });

        setStatus('¡Compra realizada con éxito! Gracias por tu pedido.');
        clearCart();
        localStorage.removeItem('pendingOrder');
      } catch (err) {
        setStatus('Error al registrar la orden. Contacta soporte.');
      }
    };

    finalizeOrder();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Resultado del pago</h1>
      <p>{status}</p>
    </div>
  );
}
