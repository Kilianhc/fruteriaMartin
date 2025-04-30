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
    const token = JSON.parse(localStorage.getItem('adminUser'))?.token;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Administrar Productos</h2>
        <Link to="/admin/products/new" className="bg-[#009929] text-white px-4 py-2 rounded hover:bg-green-700 transition">
          ➕ Añadir producto
        </Link>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <li key={product._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-700 mb-2">Precio: €{product.price.toFixed(2)}</p>
            <div className="space-x-3">
              <Link to={`/admin/products/${product._id}`} className="text-blue-600 hover:underline">✏️ Editar</Link>
              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-600 hover:underline"
              >
                🗑️ Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
