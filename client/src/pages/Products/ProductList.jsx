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
    <div className="bg-gray-100 grid gap-3 px-2 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
