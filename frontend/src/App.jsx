import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Formulario from "./pages/Formulario";
import TV from "./pages/TV";

function App() {
  return (

    <BrowserRouter>
      <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>
          📝 Formulário de Cadastro
        </Link>
        <Link to="/tv">
          📺 Tela da Fila (TV)
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/tv" element={<TV />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

