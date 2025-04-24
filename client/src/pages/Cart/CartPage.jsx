import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Tu carrito</h2>

            {cart.length === 0 ? (
                <p className="text-center">Tu carrito está vacío. <Link to="/productos" className="text-[#009929] underline">Ver productos</Link></p>
            ) : (
                <>
                    <div className="space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 shadow-md rounded"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-500">Precio: €{item.price}/kg</p>
                                    <p className="text-sm text-gray-500">Stock disponible: {item.stock}kg</p>
                                </div>

                                <input
                                    type="number"
                                    value={item.quantity}
                                    min={1}
                                    max={item.stock}
                                    onChange={(e) =>
                                        updateQuantity(item._id, Number(e.target.value))
                                    }
                                    className="w-20 border rounded px-2 py-1 text-center"
                                />

                                <p className="font-bold">€{(item.price * item.quantity).toFixed(2)}</p>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-600 hover:underline text-sm"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-2xl font-semibold mb-4">
                            Total: €{totalPrice.toFixed(2)}
                        </p>
                        <button
                            onClick={clearCart}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded cursor:pointer"
                        >
                            Vaciar carrito
                        </button>
                        <a href="/comprar">
                            <button className="bg-[#009929] text-white px-6 py-2 rounded hover:bg-green-700 transition ml-4">
                                Realizar compra
                            </button>
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}
