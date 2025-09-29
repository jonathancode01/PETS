import { useState, useEffect } from "react";

// (Mantenha sua lógica de dados aqui, estou usando os dados mocados)
const filaInicial = [
  { id: 1, tutor: "Maria", pet: "Rex", especie: "Cachorro", status: "Aguardando" },
  { id: 2, tutor: "João", pet: "Mimi", especie: "Gato", status: "Em atendimento" },
  { id: 3, tutor: "Ana", pet: "Lola", especie: "Cachorro", status: "Aguardando" },
];

export default function TV() {
  const [fila, setFila] = useState(filaInicial);

  // (Mantenha sua lógica de atualização aqui)

  return (
    <div className="min-h-screen bg-brand-dark text-brand-gray-light p-8">
      {/* Cabeçalho */}
      <header className="text-center mb-10">
        {/* Você pode adicionar seu logo aqui. Ex: <img src="/logo.png" alt="UNIPETT" className="mx-auto h-20" /> */}
        <h1 className="text-5xl font-bold text-white">Painel de Atendimento</h1>
        <p className="text-2xl text-brand-blue-light mt-2">Clínica Veterinária - Fila de Espera</p>
      </header>

      {/* Tabela de Atendimentos */}
      <main className="w-full max-w-7xl mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg bg-gray-800/50">
          <table className="w-full text-left text-2xl">
            <thead className="bg-brand-blue-dark/50 text-white uppercase tracking-wider">
              <tr>
                <th className="p-5">Tutor</th>
                <th className="p-5">Pet</th>
                <th className="p-5">Espécie</th>
                <th className="p-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-blue-dark/30">
              {fila.map((item, index) => (
                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-transparent' : 'bg-brand-blue-dark/20'}`}>
                  <td className="p-5 font-medium">{item.tutor}</td>
                  <td className="p-5">{item.pet}</td>
                  <td className="p-5">{item.especie}</td>
                  <td className="p-5 text-center">
                    <span className={`px-4 py-1 rounded-full font-semibold text-lg ${
                        item.status === 'Aguardando'
                          ? 'bg-brand-green text-brand-dark'
                          : 'bg-brand-pink text-white animate-pulse'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}