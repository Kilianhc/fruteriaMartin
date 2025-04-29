import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Generar token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Login solo para usuarios existentes (administradores)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  res.json({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

export default router;
