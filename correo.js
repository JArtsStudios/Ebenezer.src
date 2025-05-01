const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Configurar nodemailer (usando Gmail como ejemplo)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu-correo@gmail.com', // Reemplaza con tu correo
    pass: 'tu-contraseña-app', // Contraseña de aplicación
  },
});

// Contraseña fija
const PASSWORD = 'escuela@ebenezer';

// Ruta para manejar el envío de la contraseña
app.post('/send-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Correo es requerido' });
  }

  try {
    // Enviar correo
    await transporter.sendMail({
      from: '"Sistema de Contraseñas" <tu-correo@gmail.com>',
      to: email,
      subject: 'Tu contraseña de acceso',
      text: `Hola, tu contraseña de acceso es: ${PASSWORD}`,
    });

    res.json({ message: 'Contraseña enviada exitosamente al correo.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
