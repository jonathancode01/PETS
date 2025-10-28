// Em src/App.jsx (O JEITO CORRETO)

import { Routes, Route } from 'react-router-dom';
import TriagemForm from './components/TriagemForm';
import PainelEspera from './components/PainelEspera';
import Login from './components/login.jsx'; // Corrigi o nome 'login.jsx' para 'Login'
import ProtectedRoute from './components/ProtectedRoute'; // O "Guarda"

function App() {
  // O App deve ser "burro". Ele só define as rotas.
  // O "Guarda" (ProtectedRoute) é quem decide se o usuário pode entrar.
  return (
    <Routes>
      {/* Rota Pública */}
      <Route path="/login" element={<Login />} />

      {/* Rotas Protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TriagemForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/painel"
        element={
          <ProtectedRoute>
            <PainelEspera />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;