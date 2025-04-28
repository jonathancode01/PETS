import { useEffect, useState } from 'react'
import { FormularioTriagem } from '../components/formularioTriagem'
import { ListaTriagem } from '../components/listaTriagem'

function App() {
  const [triagens, setTriagens] = useState([]);

  async function carregarTriagens() {
    const resposta = await fetch("http://localhost:3002/triagens");
    const dados = await resposta.json();
    setTriagens(dados);
  }

  useEffect(() => {
    carregarTriagens();
  }, []);

  function handleNovaTriagem(triagem) {
    setTriagens([prev => [...prev, triagem]]);
  }

  return (
    <div>
      <h1>UNIPETT - Atendimento</h1>
      <FormularioTriagem onNovaTriagem={handleNovaTriagem} />
      <ListaTriagem triagens={triagens} />
    </div>
  )
}


export default App
