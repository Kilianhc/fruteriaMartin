import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const { id } = useParams(); // "new" o un ID
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    category: '',
  });

  useEffect(() => {
    if (id !== 'new') {
      fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
        .then((res) => res.json())
        .then((data) =>
          setForm({
            title: data.title || '',
            description: data.description || '',
            price: data.price || '',
            image: data.image || '',
            stock: data.stock || '',
            category: data.category || '',
          })
        );
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('adminUser'))?.token;

    const method = id === 'new' ? 'POST' : 'PUT';
    const url = id === 'new'
      ? `${import.meta.env.VITE_API_URL}/products`
      : `${import.meta.env.VITE_API_URL}/products/${id}`;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate('/admin/products');
    } else {
      alert('Error al guardar producto');
    }
  };

  return (
    <div>
      <h2>{id === 'new' ? 'Añadir Producto' : 'Editar Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <input name="price" type="number" step="0.01" placeholder="Precio" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} />
        <input name="image" placeholder="URL de imagen" value={form.image} onChange={handleChange} />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange}></textarea>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}