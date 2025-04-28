// index.js
const express = require('express');
const triagemRoutes = require('./route/triagemRoutes');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json()); // importante para receber JSON no body das requisições

// Aqui você registra o caminho principal da API
app.use('/api', triagemRoutes);

app.get('/', (req, res) => {
  res.send('API UNIPETT rodando!');
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});