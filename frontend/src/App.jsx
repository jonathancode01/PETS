import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Formulario from "./pages/Formulario";
import TV from "./pages/TV";

function App() {
  return (
    // O BrowserRouter é o componente que ativa o roteamento
    <BrowserRouter>
      {/* Você pode colocar aqui elementos que aparecem em TODAS as páginas,
        como um menu de navegação (header) ou um rodapé (footer).
        Vamos adicionar um menu simples para facilitar o teste.
      */}
      <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>
          📝 Formulário de Cadastro
        </Link>
        <Link to="/tv">
          📺 Tela da Fila (TV)
        </Link>
      </nav>

      {/* O <Routes> é a área onde a mágica acontece.
        O React vai trocar o conteúdo aqui dentro dependendo da rota.
      */}
      <Routes>
        {/* 2. Defina as rotas */}
        <Route path="/" element={<Formulario />} />
        <Route path="/tv" element={<TV />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

