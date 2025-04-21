import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Crear una orden (sin login)
router.post('/', async (req, res) => {
  const { customer, items, total, paymentId } = req.body;

  if (!customer || !items || !total) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const newOrder = new Order({
    customer,
    items,
    total,
    paymentId,
    paid: true, // ya pagado si viene desde Stripe
  });

  await newOrder.save();
  res.status(201).json({ message: 'Orden creada', orderId: newOrder._id });
});

// Obtener una orden por ID (sin auth)
router.get('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
  
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error del servidor' });
    }
  });
  

export default router;
