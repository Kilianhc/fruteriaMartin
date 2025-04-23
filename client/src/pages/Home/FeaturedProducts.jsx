export default function FeaturedProducts() {
    return (
      <section className="py-12 px-6 bg-gray-100 text-black">
        <h2 className="text-3xl font-bold text-center mb-8">Destacados</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center"
            >
              <img
                src={`https://via.placeholder.com/150?text=Fruta+${i}`}
                alt={`Producto ${i}`}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Fruta {i}</h3>
              <p className="text-[#009929] font-bold mb-2">€ {i * 1.5}</p>
              <button className="bg-[#009929] hover:bg-green-700 text-white px-4 py-2 rounded">
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }
  