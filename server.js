 const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// ✅ Habilita CORS SOLO para tu dominio de Netlify
app.use(cors({
  origin: 'https://adorable-pudding-3cfac7.netlify.app'
}));

app.use(express.json());

const BOLD_SECRET_KEY = 'nP7XOQSiT0QQF-4jMRztVw';

app.post('/crear-checkout', async (req, res) => {
  const { valor } = req.body;

  try {
    // ✅ Limpia el valor: quita $ y comas
    const valorLimpio = valor.replace(/[^\d]/g, '');

    const response = await axios.post('https://api.bold.co/v1/checkouts', {
      amount: valorLimpio,
      currency: 'COP',
      success_url: 'https://adorable-pudding-3cfac7.netlify.app/gracias',
      cancel_url: 'https://adorable-pudding-3cfac7.netlify.app/cancelado',
    }, {
      headers: {
        Authorization: `Bearer ${BOLD_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.json({ url: response.data.checkout_url });
  } catch (error) {
    console.error('Error al crear checkout:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudo crear el checkout' });
  }
});

// ✅ Render usa el puerto de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Bold backend corriendo en http://localhost:${PORT}`);
});
