import { useEffect, useState } from "react";
import { API } from "../../utils/api";
import ProductCard from "../Products/ProductCard";

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        // Si tienes una propiedad 'featured' en el producto, puedes usar esto:
        // setFeatured(res.data.filter(p => p.featured));
        
        // O si no, simplemente muestra los 3 primeros
        setFeatured(res.data.slice(0, 4));
      })
      .catch((err) => console.error("Error al obtener productos destacados:", err));
  }, []);

  return (
    <section className="py-12 px-6 bg-gray-100 text-black">
      <h2 className="text-3xl font-bold text-center mb-8">Destacados</h2>
      <div className="grid gap-6 md:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
