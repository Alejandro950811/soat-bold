const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const BOLD_SECRET_KEY = 'nP7XOQSiT0QQF-4jMRztVw';

app.post('/crear-checkout', async (req, res) => {
  const { valor } = req.body;

  try {
    const response = await axios.post('https://api.bold.co/v1/checkouts', {
      amount: valor.replace(/[^\d]/g, ''),
      currency: 'COP',
      success_url: 'https://tusitio.com/gracias',
      cancel_url: 'https://tusitio.com/cancelado',
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Bold backend corriendo en http://localhost:${PORT}`);
});