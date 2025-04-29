import { useEffect, useState } from "react";
import { API } from "../../utils/api";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <div className="grid gap-6 px-6 py-12 md:grid-cols-2 lg:grid-cols-3">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-center col-span-full">No hay productos disponibles.</p>
      )}
    </div>
  );
}

export default ProductList;
