import { useState } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import bananaIcon from '../assets/banana.png';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart(); // <- Esto es lo importante
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-[#bd0003] text-white shadow-md px-8 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={bananaIcon} alt="Banana" className="w-10 h-10" />
          <span className="text-xl font-bold"> <a href="/" className="cursor:pointer">Frutería Martín</a></span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 items-center text-lg">
          <Link to="/" className="cursor-pointer">Inicio</Link>
          <Link to="/productos" className="cursor-pointer">Productos</Link>
          <div className="relative cursor-pointer">
            <Link to="/carrito" className="relative cursor-pointer">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Móvil: Botón menú */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-lg">
          <Link to="/" className="cursor-pointer">Inicio</Link>
          <Link to="/productos" className="cursor-pointer">Productos</Link>
          <div className="relative w-fit cursor-pointer">
            <Link to="/carrito" className="relative w-fit cursor-pointer">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
