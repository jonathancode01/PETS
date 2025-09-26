import { useEffect, useState } from "react";

export default function TV() {
  const [fila, setFila] = useState([]);

  useEffect(() => {
    // 🔹 Simulação: em produção você faria GET no backend (ex: GET /fila)
    const mockFila = [
      { id: 1, tutor: "Maria", pet: "Rex", especie: "Cachorro", status: "Aguardando" },
      { id: 2, tutor: "João", pet: "Mimi", especie: "Gato", status: "Aguardando" },
      { id: 3, tutor: "Ana", pet: "Lola", especie: "Cachorro", status: "Em atendimento" },
    ];
    setFila(mockFila);

    // Atualiza a cada 5s (simulação de polling)
    const interval = setInterval(() => {
      console.log("🔄 Atualizando fila...");
      setFila(mockFila);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-blue-600 p-4 text-center text-3xl font-bold">
        🐾 Clínica Veterinária - Fila de Espera
      </header>

      <main className="flex-1 p-6">
        <table className="w-full text-lg border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-left">Tutor</th>
              <th className="p-3 text-left">Pet</th>
              <th className="p-3 text-left">Espécie</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {fila.map((item) => (
              <tr key={item.id} className="border-b border-gray-600">
                <td className="p-3">{item.tutor}</td>
                <td className="p-3">{item.pet}</td>
                <td className="p-3">{item.especie}</td>
                <td
                  className={`p-3 font-bold ${
                    item.status === "Em atendimento" ? "text-yellow-400" : "text-green-400"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className="bg-gray-800 text-center p-3">
        <p>Obrigado por aguardar! 🐶🐱</p>
      </footer>
    </div>
  );
}
