import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setProducts(products.filter((p) => p._id !== id));
    } else {
      alert('Error al eliminar');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h2>Administrar Productos</h2>
      <Link to="/admin/products">➕ Añadir producto</Link>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <strong>{product.title}</strong> — ${product.price.toFixed(2)}
            {' '}
            <Link to={`/admin/products/${product._id}`}>✏️ Editar</Link>
            {' '}
            <button onClick={() => deleteProduct(product._id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}