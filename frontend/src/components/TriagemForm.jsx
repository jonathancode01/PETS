import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function TriagemForm() {
  const [formData, setFormData] = useState({ nome_tutor: '', nome_pet: '', porte: '', descricao: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome_tutor || !formData.nome_pet || !formData.porte || !formData.descricao) {
      toast.error('Todos os campos são obrigatórios');
      return;
    }
    try {
      await axios.post('http://localhost:3002/triagens', formData);
      toast.success('Triagem registrada com sucesso!');
      setFormData({ nome_tutor: '', nome_pet: '', porte: '', descricao: '' });
    } catch (error) {
      toast.error('Erro ao registrar triagem');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#F2F2F2] min-h-screen p-6 md:p-8 font-sans"  
    >
      <header className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#D971AA] tracking-wide">UNIPET - Hospital Veterinário 24h</h1>  
      </header>
      <form onSubmit={handleSubmit} className="max-w-xs mx-auto md:max-w-md lg:max-w-lg bg-white shadow-md rounded-lg p-6 md:p-8">  
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#404759] mb-2">Nome do Tutor</label> 
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D971AA] focus:border-transparent" 
            placeholder="Ex: João Silva"
            value={formData.nome_tutor}
            onChange={(e) => setFormData({ ...formData, nome_tutor: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#404759] mb-2">Nome do Pet</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D971AA]"
            placeholder="Ex: Rex"
            value={formData.nome_pet}
            onChange={(e) => setFormData({ ...formData, nome_pet: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#404759] mb-2">Porte</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D971AA]"
            value={formData.porte}
            onChange={(e) => setFormData({ ...formData, porte: e.target.value })}
          >
            <option value="">Selecione o Porte</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#404759] mb-2">Descrição</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D971AA] h-32"
            placeholder="Descreva o problema..."
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          className="w-full bg-[#D971AA] text-white py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"  // Botão sofisticado com animação
        >
          Enviar Triagem
        </motion.button>
      </form>
    </motion.div>
  );
}

export default TriagemForm;