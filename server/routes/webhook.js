import express from 'express';
import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendConfirmationEmail } from '../utils/email.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Necesitamos raw body para verificar la firma del webhook
router.post(
  '/',
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('❌ Error de verificación de firma:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      try {
        const customer = {
          name: session.customer_details.name,
          email: session.customer_details.email,
          address: `${session.customer_details.address.line1}, ${session.customer_details.address.city}`,
        };

        const items = JSON.parse(session.metadata.items);
        const total = session.amount_total / 100;

        // Verificar stock antes de guardar
        for (const item of items) {
          const product = await Product.findById(item.productId);
          if (!product || product.stock < item.quantity) {
            console.warn(`Producto no válido o stock insuficiente: ${item.productId}`);
            return;
          }
        }

        const newOrder = new Order({
          customer,
          items,
          total,
          paymentId: session.id,
          paid: true,
        });

        await newOrder.save();

        // Actualizar stock
        for (const item of items) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: -item.quantity },
          });
        }

        // Enviar email de confirmación
        await sendConfirmationEmail(customer.email, newOrder);

        console.log('✅ Orden creada desde Webhook con éxito');
      } catch (error) {
        console.error('❌ Error al crear la orden desde webhook:', error);
      }
    }

    res.status(200).json({ received: true });
  }
);

export default router;
