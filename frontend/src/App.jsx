import { Routes, Route, Link } from 'react-router-dom';
import TV from './pages/TV.jsx';
import Formulario from './pages/formulario.jsx';

function App() {
  return (
    <div>
      {/* Menu de Navegação Simples */}
      <nav className="bg-gray-800 p-4 text-white">
        <Link to="/" className="mr-4 hover:text-gray-300">Lista de Atendimento</Link>
        <Link to="/formulario" className="hover:text-gray-300">Novo Atendimento</Link>
      </nav>

      <main className="p-8">
        {/* Área onde a página da rota atual será renderizada */}
        <Routes>
          <Route path="/" element={<TV />} />
          <Route path="/formulario" element={<Formulario />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;