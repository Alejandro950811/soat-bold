const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// CORS para tu Netlify
app.use(cors({
  origin: 'https://earnest-gecko-f01971.netlify.app'
}));

app.use(express.json());

// Ruta para verificar conectividad externa
app.get('/ping', async (req, res) => {
  try {
    const google = await axios.get('https://www.google.com');
    const jsonplaceholder = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const bold = await axios.get('https://api.bold.co');

    res.json({
      google: google.status,
      jsonplaceholder: jsonplaceholder.status,
      bold: bold.status
    });
  } catch (error) {
    console.error('🔴 Error de conectividad externa:', error.message || error);
    res.status(500).json({ error: 'Falló alguna llamada externa', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de prueba corriendo en http://localhost:${PORT}`);
});
