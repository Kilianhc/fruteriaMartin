// src/App.jsx
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
// import CartPage from "./pages/Cart/CartPage"; // <-- cuando lo tengas
// import ProductDetail from "./pages/Products/ProductDetail"; // <-- si luego haces esto

function App() {
  return (
      <div className="flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            {/* <Route path="/producto/:id" element={<ProductDetail />} /> */}
            {/* <Route path="/carrito" element={<CartPage />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
  );
}

export default App;
