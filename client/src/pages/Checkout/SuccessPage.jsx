import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircleIcon } from '@heroicons/react/outline';

export default function SuccessPage() {
  const [status, setStatus] = useState('Procesando...');
  const { clearCart } = useCart();

  useEffect(() => {
    const finalizeOrder = () => {
      clearCart();
      setStatus('¡Compra realizada con éxito! Gracias por tu pedido.');
    };

    finalizeOrder();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-md rounded-lg text-center">
      <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />

      <h1 className="text-3xl font-bold mb-4 text-green-600">¡Gracias por tu compra!</h1>
      
      <p className="text-lg mb-4">{status}</p>

      <p className="text-gray-700">
        Hemos enviado un correo electrónico con los detalles de tu pedido.  
        Por favor revisa tu bandeja de entrada (y la carpeta de spam).
      </p>

      <a href="/" className="mt-8 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition">
        Volver a la tienda
      </a>
    </div>
  );
}
