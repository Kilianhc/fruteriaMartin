import { Link } from "react-router-dom";
import bgImage from '../assets/bg.jpeg';

function Home() {
    return (
        <div className="text-white">

            {/* Banner principal */}
            <section
                className="relative bg-cover bg-center py-40 px-6 text-center text-white"
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            >

                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Frutería Martín</h1>
                    <p className="text-lg md:text-xl mb-8">
                        Las frutas más frescas directamente a tu mesa
                    </p>
                    <Link
                        to="/productos"
                        className="bg-[#009929] hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg transition"
                    >
                        Ver productos
                    </Link>
                </div>
            </section>


            {/* Productos destacados (mockup) */}
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
        </div>
    );
}

export default Home;
