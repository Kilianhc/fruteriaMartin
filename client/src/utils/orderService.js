export async function createOrder(orderData) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la orden');
      }
  
      return data; // Contiene orderId y mensaje
    } catch (error) {
      console.error('❌ Error en createOrder:', error);
      throw error;
    }
  }
  