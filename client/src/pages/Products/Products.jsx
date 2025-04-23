import ProductList from "./ProductList";

export default function Products() {
  const handleAddToCart = (product) => {
    console.log("Añadido al carrito:", product);
    // Aquí puedes conectarlo luego con el contexto del carrito
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-8 text-[#bd0003]">Todos los productos</h2>
      <ProductList addToCart={handleAddToCart} />
    </div>
  );
}
