import ProductList from "./ProductList";

export default function Products() {
  const handleAddToCart = (product) => {
    console.log("Añadido al carrito:", product);
    // Aquí puedes conectarlo luego con el contexto del carrito
  };

  return (
    <div>
      <h2 className="bg-gray-100 text-3xl font-bold text-center pt-8 text-[#bd0003]">Todos los productos</h2>
      <ProductList addToCart={handleAddToCart} />
    </div>
  );
}
