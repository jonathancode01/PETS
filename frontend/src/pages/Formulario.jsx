// src/pages/Formulario.jsx

import { Link } from 'react-router-dom';
import FormularioTriagem from '../components/FormularioTriagem'; // 1. Importe o componente

export default function Formulario() {

  // 2. Crie uma função para lidar com os dados que vêm do formulário
  const handleSalvarTriagem = (dadosDoFormulario) => {
    console.log('Dados recebidos da triagem:', dadosDoFormulario);
    // Aqui você adicionaria a lógica para enviar os dados para o backend
    alert(`O pet ${dadosDoFormulario.pet} foi adicionado à fila!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-brand-blue-dark text-center">Cadastro na Fila de Atendimento</h1>
          <p className="text-center text-gray-500 mt-2">Preencha os dados para iniciar um novo atendimento.</p>
        </header>

        {/* 3. Use o componente, passando a função de salvar como prop */}
        <FormularioTriagem onSalvar={handleSalvarTriagem} />
        
        <div className="text-center mt-4">
            <Link to="/" className="text-gray-600 hover:text-brand-blue-dark">
              &larr; Voltar para o Painel
            </Link>
        </div>
      </div>
    </div>
  );
}