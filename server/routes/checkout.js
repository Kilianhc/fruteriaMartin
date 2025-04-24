import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

// Cargar Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Usar dominio del frontend desde variable de entorno o fallback a localhost:5173
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

router.post('/create-session', async (req, res) => {
  const { cartItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartItems.map(item => {
        const productData = {
          name: item.name,
        };

        if (item.description && item.description.trim() !== '') {
          productData.description = item.description;
        }

        return {
          price_data: {
            currency: 'eur',
            product_data: productData,
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error al crear sesión de Stripe:', error.message);
    res.status(500).json({ message: 'Error al crear sesión de pago' });
  }
});

export default router;
