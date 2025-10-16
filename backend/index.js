// ======================
// 📦 Importações
// ======================
const express = require('express');
const Sequelize = require('sequelize');
const axios = require('axios');

// ======================
// 🚀 Inicialização do App
// ======================
const app = express();
const PORT = process.env.PORT || 3000;



// ======================
// 🌐 Middleware CORS manual
// ======================
// Deve estar antes de qualquer rota ou middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // frontend React
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // responde ao preflight imediatamente
  }
  next();
});

// ======================
// ⚙️ Middlewares
// ======================
app.use(express.json());

// ======================
// 🐘 Conexão com PostgreSQL
// ======================
const sequelize = new Sequelize(
  process.env.DB_NAME || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'pgsql',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

// ======================
// 🧱 Modelo da Tabela: Triagem
// ======================
const Triagem = sequelize.define('triagem', {
  nome_tutor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nome_pet: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  porte: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  diagnostico_ia: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

// ======================
// 🔄 Sincronização do Banco
// ======================
sequelize.sync()
  .then(() => console.log('📦 Banco sincronizado com sucesso!'))
  .catch((err) => console.error('❌ Erro ao sincronizar banco:', err));

// ======================
// 📍 Rotas CRUD
// ======================

// ➕ Criar triagem (CREATE) com IA integrada
app.post('/triagens', async (req, res) => {
  try {
    const { nome_tutor, nome_pet, porte, descricao } = req.body;

    // Chamada à IA
    let diagnostico = 'Não definido';
    try {
      const { data } = await axios.post('http://ia_service:8000/analisar', { descricao });
      diagnostico = data.diagnostico || 'Não definido';
    } catch (iaError) {
      console.warn('⚠️ Erro ao consultar IA, usando diagnóstico padrão.');
    }

    const novaTriagem = await Triagem.create({
      nome_tutor,
      nome_pet,
      porte,
      descricao,
      diagnostico_ia: diagnostico,
    });

    res.status(201).json(novaTriagem);
  } catch (error) {
    console.error('Erro ao criar triagem:', error);
    res.status(500).json({ error: 'Erro ao criar triagem' });
  }
});

// 📋 Listar todas as triagens (READ)
app.get('/triagens', async (req, res) => {
  try {
    const triagens = await Triagem.findAll({ order: [['id', 'DESC']] });
    res.json(triagens);
  } catch (error) {
    console.error('Erro ao buscar triagens:', error);
    res.status(500).json({ error: 'Erro ao buscar triagens' });
  }
});

// ✏️ Atualizar triagem (UPDATE)
app.put('/triagens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_tutor, nome_pet, porte, descricao } = req.body;

    const triagem = await Triagem.findByPk(id);
    if (!triagem) return res.status(404).json({ error: 'Triagem não encontrada' });

    await triagem.update({ nome_tutor, nome_pet, porte, descricao });
    res.json(triagem);
  } catch (error) {
    console.error('Erro ao atualizar triagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar triagem' });
  }
});

// ❌ Deletar triagem (DELETE)
app.delete('/triagens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const triagem = await Triagem.findByPk(id);
    if (!triagem) return res.status(404).json({ error: 'Triagem não encontrada' });

    await triagem.destroy();
    res.json({ message: 'Triagem deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar triagem:', error);
    res.status(500).json({ error: 'Erro ao deletar triagem' });
  }
});

// ======================
// 🧭 Rota padrão
// ======================
app.get('/', (req, res) => {
  res.send('🐾 API da Clínica Pet com IA funcionando!');
});

// ======================
// 🔥 Inicialização do Servidor
// ======================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});

