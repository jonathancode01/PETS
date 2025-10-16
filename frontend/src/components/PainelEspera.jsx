import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function PainelEspera() {
  const [triagens, setTriagens] = useState([]);

  useEffect(() => {
    const fetchTriagens = async () => {
      try {
        const response = await axios.get('http://backend:5000/triagens');
        setTriagens(response.data);
      } catch (error) {
        console.error('Erro ao buscar triagens');
      }
    };
    fetchTriagens();
    const interval = setInterval(fetchTriagens, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#F2F2F2] min-h-screen p-6 md:p-8 font-sans"  // Fundo claro e padding responsivo
    >
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#D971AA] tracking-wide">Fila de Atendimento UNIPET</h1>  
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">  
        {triagens.map((triagem) => {
          let statusColor = '';
          if (triagem.status === 'Urgente') statusColor = 'text-red-500 bg-red-100';
          if (triagem.status === 'Moderado') statusColor = 'text-yellow-500 bg-yellow-100';
          if (triagem.status === 'Normal') statusColor = 'text-[#4BBFB4] bg-[#4BBFB4]/10';  // Verde-água para normal

          return (
            <motion.div
              key={triagem.id}
              className={`bg-white shadow-md rounded-lg p-4 ${statusColor}`}  // Sombra e cor de status
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-[#404759]">{triagem.senha}</h2>  // Texto em cinza escuro
              <p className="text-[#404759]">Nome do Pet: {triagem.nome_pet}</p>
              <p className="font-medium mt-2">{triagem.status}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default PainelEspera;