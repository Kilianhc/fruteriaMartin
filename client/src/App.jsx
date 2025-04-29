// src/App.jsx
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar"
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import SuccessPage from "./pages/Checkout/SuccessPage";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import EditProduct from "./pages/Admin/EditProducts";
import AdminDashboard from "./pages/Admin/AdminDashboard";

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
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
