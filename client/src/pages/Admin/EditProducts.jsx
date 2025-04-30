import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', price: '', image: '', stock: '', category: '' });

  useEffect(() => {
    if (id !== 'new') {
      fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
        .then(res => res.json())
        .then(data => setForm({ ...form, ...data }));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('adminUser'))?.token;
    const method = id === 'new' ? 'POST' : 'PUT';
    const url = id === 'new'
      ? `${import.meta.env.VITE_API_URL}/products`
      : `${import.meta.env.VITE_API_URL}/products/${id}`;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate('/admin/products');
    } else {
      alert('Error al guardar producto');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{id === 'new' ? 'Añadir Producto' : 'Editar Producto'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Título" className="w-full border px-4 py-2 rounded" value={form.title} onChange={handleChange} required />
        <input name="price" type="number" step="0.01" placeholder="Precio" className="w-full border px-4 py-2 rounded" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" className="w-full border px-4 py-2 rounded" value={form.stock} onChange={handleChange} required />
        <input name="category" placeholder="Categoría" className="w-full border px-4 py-2 rounded" value={form.category} onChange={handleChange} />
        <input name="image" placeholder="URL de imagen" className="w-full border px-4 py-2 rounded" value={form.image} onChange={handleChange} />
        <textarea name="description" placeholder="Descripción" className="w-full border px-4 py-2 rounded" rows="4" value={form.description} onChange={handleChange}></textarea>
        <button type="submit" className="bg-[#009929] hover:bg-green-700 text-white px-4 py-2 rounded transition">
          Guardar
        </button>
      </form>
    </div>
  );
}
