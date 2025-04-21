import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

router.post('/create-session', async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // mover aquí

  const { cartItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.description || '',
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error al crear sesión de Stripe:', error.message);
    res.status(500).json({ message: 'Error al crear sesión de pago' });
  }
});

export default router;
