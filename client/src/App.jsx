// src/App.jsx
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar"
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import SuccessPage from "./pages/Checkout/SuccessPage";
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
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/comprar" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            {/* <Route path="/producto/:id" element={<ProductDetail />} /> */}
            {/* <Route path="/carrito" element={<CartPage />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
  );
}

export default App;
