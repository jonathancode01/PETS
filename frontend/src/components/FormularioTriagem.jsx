// src/components/FormularioTriagem.jsx

import { useState } from 'react';
import BotaoSalvar from './BotaoSalvar'; // Importando nosso botão reutilizável

// O componente recebe uma função 'onSalvar' como prop para enviar os dados para a página pai
export default function FormularioTriagem({ onSalvar }) {
  const [nome, setNome] = useState('');
  const [pet, setPet] = useState('');
  const [especie, setEspecie] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação simples
    if (!nome || !pet || !especie) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    // Chama a função recebida via props, passando os dados do formulário
    onSalvar({ nome, pet, especie });
    // Limpa os campos após o envio
    setNome('');
    setPet('');
    setEspecie('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      <div className="flex justify-end pt-4">
        <BotaoSalvar type="submit">
          Adicionar à Fila
        </BotaoSalvar>
      </div>
    </form>
  );
}