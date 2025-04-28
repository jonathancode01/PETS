const express = require('express');
const cors = require('cors');
const triagemRoutes = require('./routes/triagemRoutes');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Aqui chamando as rotas
app.use(triagemRoutes);

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});
