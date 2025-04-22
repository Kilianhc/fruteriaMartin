
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (to, order) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Confirmación de pedido - Frutería Martín`,
    text: `
Gracias por tu compra, ${order.customer.name} 🍇

Detalles del pedido:
- Nº de Pedido: ${order._id}
- Total: ${order.total} EUR

Productos:
${order.items.map(item => `- ${item.quantity} x Producto ID: ${item.productId}`).join('\n')}

Dirección de entrega: ${order.customer.address}

¡Gracias por confiar en Frutería Martín!
`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Correo enviado:', info.response);
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
  }
};

