import { useEffect, useState } from 'react';
import { API } from '../api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <img src={product.image} />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
