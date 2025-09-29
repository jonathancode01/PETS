// src/pages/TV.jsx

import { useState } from "react";
import ListaDePacientes from "../components/ListaDePacientes"; // 1. Importe o componente

const filaInicial = [
  { id: 1, tutor: "Maria", pet: "Rex", especie: "Cachorro", status: "Aguardando" },
  { id: 2, tutor: "João", pet: "Mimi", especie: "Gato", status: "Em atendimento" },
  { id: 3, tutor: "Ana", pet: "Lola", especie: "Cachorro", status: "Aguardando" },
];

export default function TV() {
  const [fila, setFila] = useState(filaInicial);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-gray-light p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white">Painel de Atendimento</h1>
        <p className="text-2xl text-brand-blue-light mt-2">Clínica Veterinária - Fila de Espera</p>
      </header>
      <main className="w-full max-w-7xl mx-auto">
        {/* 2. Use o componente, passando a lista de pacientes */}
        <ListaDePacientes pacientes={fila} />
      </main>
    </div>
  );
}