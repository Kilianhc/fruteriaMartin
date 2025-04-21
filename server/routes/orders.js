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

// Obtener todas las órdenes (solo para el admin, en el futuro se puede proteger)
router.get('/', async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (err) {
      console.error('Error al obtener órdenes:', err);
      res.status(500).json({ message: 'Error del servidor' });
    }
  });
  
  // Obtener estadísticas generales de órdenes
router.get('/stats/general', async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments();
      const totalRevenueResult = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$total' },
          },
        },
      ]);
  
      const lastOrder = await Order.findOne().sort({ createdAt: -1 });
  
      res.json({
        totalOrders,
        totalRevenue: totalRevenueResult[0]?.totalRevenue || 0,
        lastOrderDate: lastOrder?.createdAt || null,
      });
    } catch (err) {
      console.error('Error al obtener estadísticas:', err);
      res.status(500).json({ message: 'Error del servidor' });
    }
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
