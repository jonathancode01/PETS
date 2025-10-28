// Em src/main.jsx (O JEITO CORRETO)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // 👈 Importa o seu App.jsx
import axios from 'axios';
import { AuthProvider } from './context/AuthContext'; // 👈 Importa o Contexto

// Configura o axios globalmente
axios.defaults.withCredentials = true;

// Renderiza a aplicação
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* O Contexto de Autenticação envolve tudo */}
    <AuthProvider> 
      {/* O Roteador envolve o App */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);