import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';  // Usado para animações de modal
import axios from 'axios';

function PainelEspera() {
  const [triagens, setTriagens] = useState([]);
  const [editingTriagem, setEditingTriagem] = useState(null);  // Estado para o modal de edição
  const [editForm, setEditForm] = useState({});  // Formulário de edição

  useEffect(() => {
    const fetchTriagens = async () => {
      try {
        const response = await axios.get('http://backend:3000/triagens');  // Ajuste para a porta do seu backend
        setTriagens(response.data);
      } catch (error) {
        console.error('Erro ao buscar triagens');
      }
    };
    fetchTriagens();
    const interval = setInterval(fetchTriagens, 5000);  // Atualização automática
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta triagem?')) {
      try {
        await axios.delete(`http://backend:3000/triagens/${id}`);
        setTriagens(triagens.filter(t => t.id !== id));  // Atualiza a lista local
      } catch (error) {
        console.error('Erro ao excluir triagem');
      }
    }
  };

  const handleEdit = (triagem) => {
    setEditingTriagem(triagem);
    setEditForm(triagem);  // Preenche o formulário com os dados atuais
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://backend:3000/triagens/${editingTriagem.id}`, editForm);
      setTriagens(triagens.map(t => t.id === editingTriagem.id ? { ...t, ...editForm } : t));  // Atualiza localmente
      setEditingTriagem(null);  // Fecha o modal
    } catch (error) {
      console.error('Erro ao atualizar triagem');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#F2F2F2] min-h-screen p-6 md:p-8 font-sans"
    >
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#D971AA]">Fila de Atendimento UNIPET</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {triagens.map((triagem) => {
          let statusColor = '';
          if (triagem.status === 'Urgente') statusColor = 'text-red-500 bg-red-100';
          if (triagem.status === 'Moderado') statusColor = 'text-yellow-500 bg-yellow-100';
          if (triagem.status === 'Normal') statusColor = 'text-[#4BBFB4] bg-[#4BBFB4]/10';

          return (
            <motion.div
              key={triagem.id}
              className={`bg-white shadow-md rounded-lg p-4 ${statusColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-[#404759]">{triagem.senha}</h2>
              <p className="text-[#404759]">Nome do Pet: {triagem.nome_pet}</p>
              <p className="font-medium mt-2">{triagem.status}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(triagem)}
                  className="bg-[#D971AA] text-white px-3 py-1 rounded-md shadow hover:shadow-lg"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(triagem.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:shadow-lg"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal para Edição */}
      <AnimatePresence>
        {editingTriagem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-[#D971AA] mb-4">Editar Triagem</h2>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#404759]">Nome do Tutor</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    value={editForm.nome_tutor || ''}
                    onChange={(e) => setEditForm({ ...editForm, nome_tutor: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#404759]">Nome do Pet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    value={editForm.nome_pet || ''}
                    onChange={(e) => setEditForm({ ...editForm, nome_pet: e.target.value })}
                  />
                </div>
                {/* Adicione mais campos se necessário */}
                <button type="submit" className="bg-[#4BBFB4] text-white px-4 py-2 rounded-md shadow">
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTriagem(null)}
                  className="ml-2 bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PainelEspera;