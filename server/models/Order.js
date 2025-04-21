import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    address: String,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
  total: Number,
  paid: { type: Boolean, default: false },
  paymentId: String, // ID que devuelve Stripe o MercadoPago
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
