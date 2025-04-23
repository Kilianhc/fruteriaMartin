import { useState } from "react";
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAdd = () => {
        if (quantity > 0 && quantity <= product.stock) {
            addToCart({ ...product, quantity });
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
            <p className="text-[#009929] font-semibold mb-1">€ {product.price}/kg</p>
            <p className="text-sm text-gray-500 mb-2">Stock: {product.stock} kg</p>

            <div className="flex items-center justify-center gap-2 mb-4">
                <input
                    type="number"
                    value={quantity}
                    min={1}
                    max={product.stock}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-center"
                />
                <span>kg</span>
            </div>

            <button
                onClick={handleAdd}
                disabled={quantity < 0.1 || quantity > product.stock}
                className={`px-4 py-2 rounded text-white transition ${quantity < 0.1 || quantity > product.stock
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#009929] hover:bg-green-700'
                    }`}
            >
                Añadir al carrito
            </button>

        </div>
    );
}
