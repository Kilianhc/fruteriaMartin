// src/components/NavBar.jsx
import { useState } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import bananaIcon from '../assets/banana.png';

function NavBar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md px-8 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={bananaIcon} alt="Banana" className="w-15 h-10 mr-5" />
          <span className="text-xl font-bold"> <a href="/" className="hover:underline">Frutería Martín</a></span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 items-center text-lg">
          <a href="/" className="hover:underline">Inicio</a>
          <a href="/productos" className="hover:underline">Productos</a>
          <div className="relative cursor-pointer">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
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
          <a href="/" className="hover:underline">Inicio</a>
          <a href="/productos" className="hover:underline">Productos</a>
          <div className="relative w-fit cursor-pointer">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
