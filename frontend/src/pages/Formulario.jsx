import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importando Link para o botão de voltar

export default function Formulario() {
  // (Mantenha sua lógica de formulário aqui)
  const [nome, setNome] = useState('');
  const [pet, setPet] = useState('');
  const [especie, setEspecie] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Pet adicionado à fila!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Cabeçalho do Formulário */}
        <header>
          <h1 className="text-3xl font-bold text-brand-blue-dark text-center">Cadastro na Fila de Atendimento</h1>
          <p className="text-center text-gray-500 mt-2">Preencha os dados para iniciar um novo atendimento.</p>
        </header>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Nome do Tutor */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome do Tutor</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-pink focus:border-brand-pink"
              placeholder="Ex: Maria da Silva"
            />
          </div>

          {/* Campos Pet e Espécie na mesma linha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pet" className="block text-sm font-medium text-gray-700 mb-1">Nome do Pet</label>
              <input
                type="text"
                id="pet"
                value={pet}
                onChange={(e) => setPet(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-pink focus:border-brand-pink"
                placeholder="Ex: Rex"
              />
            </div>
            <div>
              <label htmlFor="especie" className="block text-sm font-medium text-gray-700 mb-1">Espécie</label>
              <select
                id="especie"
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-pink focus:border-brand-pink"
              >
                <option value="">Selecione...</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
          
          {/* Botões de Ação */}
          <div className="flex items-center justify-between pt-4">
            <Link to="/" className="text-gray-600 hover:text-brand-blue-dark">
              &larr; Voltar para o Painel
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-brand-pink text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink transition-transform transform hover:scale-105"
            >
              Adicionar à Fila
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}