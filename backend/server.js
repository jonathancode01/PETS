const express = require('express');
const Sequelize = require('sequelize');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // Para gerar senhas únicas

const app = express();
app.use(express.json());

// Configuração do Sequelize
// Pega as variáveis de ambiente que o docker-compose está injetando
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST; // No seu caso, será 'pgsql'
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

// Configuração do Sequelize usando as variáveis de ambiente
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
});

const Triagem = sequelize.define('triagem', {
  senha: Sequelize.STRING,
  nome_tutor: Sequelize.STRING,
  nome_pet: Sequelize.STRING,
  porte: Sequelize.STRING,
  descricao: Sequelize.TEXT,
  status: Sequelize.STRING,
  criado_em: Sequelize.DATE,
});

// Sincroniza o modelo com o banco (cria a tabela se não existir)
sequelize.sync();

// Endpoints
app.get('/triagens', async (req, res) => {
  try {
    const triagens = await Triagem.findAll();
    res.json(triagens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar triagens' });
  }
});

app.post('/triagens', async (req, res) => {
  const { nome_tutor, nome_pet, porte, descricao } = req.body;

  // Validação simples
  if (!nome_tutor || !nome_pet || !porte || !descricao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    // Geração automática de senha (ex: T001, T002...)
    const senha = `T${uuidv4().slice(0, 3).toUpperCase()}`; // Exemplo simples

    // Envia descrição para o serviço de IA
    const iaResponse = await axios.post('http://ia_service:8000/predict', { descricao });
    const status = iaResponse.data.status; // "Urgente", "Moderado", or "Normal"

    // Salva no banco
    const triagem = await Triagem.create({
      senha,
      nome_tutor,
      nome_pet,
      porte,
      descricao,
      status,
    });

    res.status(201).json(triagem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar triagem' });
  }
});

app.put('/triagens/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    await Triagem.update(updates, { where: { id } });
    res.json({ message: 'Triagem atualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar' });
  }
});

app.delete('/triagens/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Triagem.destroy({ where: { id } });
    res.json({ message: 'Triagem removida' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));