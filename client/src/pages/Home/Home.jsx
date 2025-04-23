import { Link } from "react-router-dom";
import bgImage from '../../assets/bg.jpeg';
import ContactSection from "./ContactSection";
import FeaturedProducts from "./FeaturedProducts"; // <-- nuevo

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

      {/* Productos destacados */}
      <FeaturedProducts />

      {/* Contacto */}
      <ContactSection />
    </div>
  );
}

export default Home;
