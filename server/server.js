import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/user.js';
import checkoutRoutes from './routes/checkout.js';
import webhookRoute from './routes/webhook.js';

dotenv.config();

const app = express();
app.use(cors());

// ⚠️ Para Stripe Webhook: NO PARSEAMOS JSON en esta ruta
app.use('/webhook', express.raw({ type: 'application/json' }), webhookRoute);

// 🛡️ Para el resto de rutas: Sí usamos express.json()
app.use(express.json());

// Rutas normales
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/checkout', checkoutRoutes);

// Conexión Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(5000, () => console.log('Servidor en puerto 5000'));
  })
  .catch(err => console.error(err));
