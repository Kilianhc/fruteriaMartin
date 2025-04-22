import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendConfirmationEmail } from '../utils/email.js';

const router = express.Router();


router.post('/', async (req, res) => {
  const { customer, items, total, paymentId } = req.body;

  // Validaciones básicas
  if (!customer?.name || !customer?.email || !Array.isArray(items) || items.length === 0 || total <= 0) {
    return res.status(400).json({ message: 'Datos de orden inválidos' });
  }

  try {
    // Verificar stock antes de guardar la orden
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Producto no encontrado (ID: ${item.productId})` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }
    }

    // Crear y guardar la orden
    const newOrder = new Order({
      customer,
      items,
      total,
      paymentId,
      paid: true,
    });

    await newOrder.save();

    // Actualizar stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // Enviar confirmación
    await sendConfirmationEmail(customer.email, newOrder);

    res.status(201).json({ message: 'Orden creada', orderId: newOrder._id });
  } catch (error) {
    console.error('❌ Error al crear la orden:', error);
    res.status(500).json({ message: 'Error al crear la orden' });
  }
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
