import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo y Nombre */}
        <div className="flex items-center">
          <img
            src="https://img.icons8.com/ios/452/banana.png" // Icono de plátano
            alt="Plátano"
            className="w-8 h-8 mr-2"
          />
          <Link to="/" className="text-xl font-semibold text-gray-800">
            Frutería Martín
          </Link>
        </div>

        {/* Menú */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-yellow-500">Inicio</Link>
          <Link to="/productos" className="text-gray-700 hover:text-yellow-500">Productos</Link>
          <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Login
          </Link>
        </div>

        {/* Menú en móviles */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menú desplegable en móviles */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-2 space-y-2">
          <Link to="/" className="block text-gray-700 py-2 px-4 hover:bg-yellow-100">Inicio</Link>
          <Link to="/productos" className="block text-gray-700 py-2 px-4 hover:bg-yellow-100">Productos</Link>
          <Link to="/login" className="block text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
