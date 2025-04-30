import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [triagens, setTriagens] = useState([]);
  const [petId, setPetId] = useState(""); // Para armazenar o petId do formulário
  const [prioridade, setPrioridade] = useState("Normal"); // Para armazenar a prioridade
  const [isLoading, setIsLoading] = useState(true); // Para controle de carregamento

  // Carregar triagens ao iniciar
  useEffect(() => {
    fetch("http://localhost:3002/api/triagens")
      .then((res) => res.json())
      .then((data) => {
        setTriagens(data);
        setIsLoading(false);
      });
  }, []);

  // Enviar novo formulário de triagem
  async function handleSubmit(e) {
    e.preventDefault();

    const resposta = await fetch("http://localhost:3002/api/triagens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ petId, prioridade }),
    });

    const novaTriagem = await resposta.json();
    setTriagens([...triagens, novaTriagem]); // Adicionar nova triagem à lista

    setPetId(""); // Resetar o formulário
    setPrioridade("Normal");
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">UNIPETT - Atendimento</h1>

      {/* Formulário de Triagem */}
      <div className="card p-4 mb-4">
        <h4>Formulário de Triagem</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Pet ID</label>
            <input
              type="number"
              className="form-control"
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
              placeholder="Digite o ID do pet"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Prioridade</label>
            <select
              className="form-select"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              required
            >
              <option value="Normal">Normal</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <button className="btn btn-primary">Enviar</button>
        </form>
      </div>

      {/* Painel da Sala de Espera */}
      <div className="card p-4">
        <h4>Sala de Espera</h4>
        {isLoading ? (
          <p>Carregando triagens...</p>
        ) : (
          <ul className="list-group">
            {triagens.map((triagem) => (
              <li key={triagem.id} className="list-group-item d-flex justify-content-between">
                <span>Pet ID: {triagem.petId}</span>
                <span>Prioridade: {triagem.prioridade}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
