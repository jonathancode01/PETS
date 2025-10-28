// Em src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

console.log('Arquivo AuthContext.jsx foi lido'); // 👈 LOG 1

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('Componente AuthProvider foi renderizado'); // 👈 LOG 2

  const checkAuthStatus = async () => {
    console.log('Função checkAuthStatus FOI CHAMADA'); // 👈 LOG 3
    try {
      const response = await axios.get('http://localhost:3002/auth/status');
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Esta é a linha mais importante
    checkAuthStatus(); 
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};