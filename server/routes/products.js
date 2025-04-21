import express from 'express';
import Product from '../models/Product.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET todos los productos
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar producto' });
  }
});

// POST crear nuevo producto
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear producto' });
  }
});

// PUT actualizar producto por ID
router.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar producto' });
  }
});

// DELETE eliminar producto por ID
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar producto' });
  }
});

export default router;
