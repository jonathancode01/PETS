// ======================
// 📦 Importações
// ======================
const express = require('express');
const Sequelize = require('sequelize');
const axios = require('axios');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ConnectPgSimple = require('connect-pg-simple')(session);

// ======================
// 🚀 Inicialização do App
// ======================
const app = express();
const PORT = process.env.PORT || 3000;

// ======================
// 🌐 Middleware CORS
// ======================
// (Deve vir antes das rotas e da configuração de sessão)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // frontend React
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Permite que cookies (sessão) sejam enviados
  res.header("Access-Control-Allow-Credentials", "true"); 

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ======================
// ⚙️ Middlewares Essenciais
// ======================
// Parser de JSON (para req.body)
app.use(express.json());

// ======================
// 🐘 Conexão com PostgreSQL (Principal)
// ======================
// Variáveis para conexão
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'pgsql';
const dbPort = process.env.DB_PORT || 5432;
const dbName = process.env.DB_NAME || 'postgres';
const dbConString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
  logging: false,
});

// ======================
// 🧱 Modelo da Tabela: Users (Definido antes da autenticação)
// ======================
const User = sequelize.define('user', {
  googleId: { type: Sequelize.STRING, allowNull: true, unique: true },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  name: { type: Sequelize.STRING, allowNull: false },
});

// ======================
// 🧱 Modelo da Tabela: Session (NOVO CÓDIGO AQUI)
// ======================
// Vamos forçar o Sequelize a criar a tabela "session"
// que o connect-pg-simple precisa.
sequelize.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  sess: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  expire: {
    type: Sequelize.DATE(6), // timestamp(6)
    allowNull: false,
  }
}, {
  tableName: 'session', // Garante o nome exato da tabela
  timestamps: false     // A tabela 'session' não usa createdAt/updatedAt
});

// ======================
// 🔑 Configuração de Autenticação (Sessão e Passport)
// ======================

// 1. Configuração de Sessão (armazenada no PostgreSQL)
app.use(session({
  secret: process.env.SESSION_SECRET || 'chave_secreta',
  resave: false,
  saveUninitialized: false,
  store: new ConnectPgSimple({
    conString: dbConString // Reutiliza a string de conexão do DB principal
  }),
  cookie: { 
    secure: false, // Defina true em produção com HTTPS
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 dias
  } 
}));

// 2. Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// 3. Estratégia Google OAuth (Focada no DB)
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const googleId = profile.id;
    const email = profile.emails[0].value;
    const name = profile.displayName;

    // 1. Tenta encontrar o usuário pelo Google ID
    let user = await User.findOne({ where: { googleId: googleId } });
    if (user) {
      console.log('Usuário (Google ID) encontrado:', user.name);
      return done(null, user);
    }

    // 2. Não achou? Tenta encontrar pelo email (para linkar conta)
    user = await User.findOne({ where: { email: email } });
    if (user) {
      // Atualiza o usuário existente com o googleId
      user.googleId = googleId;
      await user.save();
      console.log('Conta (Email) encontrada e linkada ao Google:', user.name);
      return done(null, user);
    }

    // 3. Não existe de forma alguma? Cria um novo.
    const newUser = await User.create({
      googleId: googleId,
      email: email,
      name: name
    });
    console.log('Novo usuário (Google) criado:', newUser.name);
    return done(null, newUser);

  } catch (err) {
    return done(err, null);
  }
}));

// 4. Serialização e Desserialização do Usuário (para sessão)
passport.serializeUser((user, done) => {
  // Salva apenas o ID do usuário (do DB) na sessão
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Busca o usuário completo no banco de dados pelo ID
    const user = await User.findByPk(id); 
    done(null, user); // 'user' (objeto Sequelize) fica disponível em req.user
  } catch (err) {
    done(err, null);
  }
});

// ======================
// 🧱 Modelo da Tabela: Triagem
// ======================
const Triagem = sequelize.define('triagem', {
  nome_tutor: { type: Sequelize.STRING, allowNull: false },
  nome_pet: { type: Sequelize.STRING, allowNull: false },
  porte: { type: Sequelize.STRING, allowNull: false },
  descricao: { type: Sequelize.TEXT, allowNull: false },
  diagnostico_ia: { type: Sequelize.TEXT, allowNull: true },
});

// Relacionamento (Opcional, mas recomendado): Um usuário pode ter várias triagens
User.hasMany(Triagem);
Triagem.belongsTo(User); // <-- Adiciona a chave estrangeira 'userId' em Triagem


// ======================
// 🔄 Sincronização do Banco
// ======================
sequelize.sync( { alter: true } ) // atualizar as tabelas para corresponder aos seus modelos sem apagá-las, o que não quebrará a sua tabela de sessão.
  .then(() => console.log('📦 Banco sincronizado com sucesso!'))
  .catch(err => console.error('❌ Erro ao sincronizar banco:', err));

// ======================
// 📍 Rotas de Autenticação
// ======================

// Rota para iniciar login com Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Rota de callback do Google
app.get('/auth/google/callback', passport.authenticate('google', { 
    failureRedirect: 'http://localhost:3001/login' // Redireciona para o frontend em caso de falha
  }), (req, res) => {
    // Redireciona para a página principal do frontend após login
    res.redirect('http://localhost:3001/'); 
});

// Rota de Logout
app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    // Destrói a sessão e redireciona
    req.session.destroy(() => {
        res.clearCookie('connect.sid'); // Limpa o cookie de sessão
        res.json({ message: 'Logout bem-sucedido' });
    });
  });
});

// Rota para verificar status de autenticação // <-- MUDANÇA APLICADA AQUI
app.get('/auth/status', (req, res) => {
    if (req.isAuthenticated()) {
        // Limpa o objeto de usuário antes de enviar (remove dados do Sequelize)
        const userResponse = {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            googleId: req.user.googleId
        };
        res.json({ authenticated: true, user: userResponse });
    } else {
        // Retorna 401 (Não Autorizado) se não estiver autenticado
        res.status(401).json({ authenticated: false });
    }
});

// ======================
// 🛡️ Middleware de Proteção de Rota
// ======================
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // Usuário está logado, pode prosseguir
  }
  // Usuário não está logado
  res.status(401).json({ error: 'Não autorizado. Faça login para continuar.' });
};

// ======================
// 📍 Rotas CRUD (Protegidas)
// ======================

// Aplicar o middleware de autenticação a TODAS as rotas /triagens
app.use('/triagens', requireAuth);

// ➕ Criar triagem (CREATE) // <-- MUDANÇA AQUI (Usa req.user.id)
app.post('/triagens', async (req, res) => {
  try {
    const { nome_tutor, nome_pet, porte, descricao } = req.body;
    const userId = req.user.id; // <-- Pega o ID do usuário logado

    // Chamada à IA opcional
    let diagnostico = 'Não definido';
    try {
      // NOTA: O serviço 'ia_service' deve estar acessível dentro da rede Docker
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
        userId: userId // <-- Salva quem criou a triagem
    });
    res.status(201).json(novaTriagem);
  } catch (error) {
    console.error('Erro ao criar triagem:', error);
    res.status(500).json({ error: 'Erro ao criar triagem' });
  }
});

// 📋 Listar todas as triagens (READ) // <-- MUDANÇA AQUI (Filtra por usuário)
app.get('/triagens', async (req, res) => {
  try {
    // Lista apenas as triagens que pertencem ao usuário logado
    const triagens = await Triagem.findAll({ 
        where: { userId: req.user.id }, 
        order: [['id', 'DESC']] 
    });
    res.json(triagens);
  } catch (error) {
    console.error('Erro ao buscar triagens:', error);
    res.status(500).json({ error: 'Erro ao buscar triagens' });
  }
});

// ✏️ Atualizar triagem (UPDATE) // <-- MUDANÇA AQUI (Checa propriedade)
app.put('/triagens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_tutor, nome_pet, porte, descricao } = req.body;

    const triagem = await Triagem.findByPk(id);
    if (!triagem) return res.status(404).json({ error: 'Triagem não encontrada' });
    
    // Checa se a triagem pertence ao usuário logado
    if (triagem.userId !== req.user.id) {
        return res.status(403).json({ error: 'Acesso negado. Esta triagem não é sua.' });
    }

    await triagem.update({ nome_tutor, nome_pet, porte, descricao });
    res.json(triagem);
  } catch (error) {
    console.error('Erro ao atualizar triagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar triagem' });
  }
});

// ❌ Deletar triagem (DELETE) // <-- MUDANÇA AQUI (Checa propriedade)
app.delete('/triagens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const triagem = await Triagem.findByPk(id);
    if (!triagem) return res.status(404).json({ error: 'Triagem não encontrada' });

    // Checa se a triagem pertence ao usuário logado
    if (triagem.userId !== req.user.id) {
        return res.status(403).json({ error: 'Acesso negado. Esta triagem não é sua.' });
    }

    await triagem.destroy();
    res.json({ message: 'Triagem deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar triagem:', error);
    res.status(500).json({ error: 'Erro ao deletar triagem' });
  }
});

// ======================
// 📍 Rota Padrão
// ======================
app.get('/', (req, res) => {
  res.send('🐾 API da Clínica Pet com IA e Autenticação (Google) funcionando!');
});

// ======================
// 🔥 Inicialização do Servidor
// ======================
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Backend rodando na porta ${PORT}`));