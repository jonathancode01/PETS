import { Routes, Route } from 'react-router-dom';
import TriagemForm from './components/TriagemForm';
import PainelEspera from './components/PainelEspera';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TriagemForm />} />
      <Route path="/painel" element={<PainelEspera />} />
    </Routes>
  );
}

export default App;
