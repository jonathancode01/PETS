// Em src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 👈 Importe o hook

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // 1. Se estiver carregando, mostre uma mensagem
  if (isLoading) {
    return <div>Carregando...</div>; 
  }

  // 2. Se não estiver autenticado (e já terminou de carregar), redireciona
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se estiver autenticado, mostra a página
  return children;
}

export default ProtectedRoute;