import { useState } from "react";

export default function Formulario() {
  const [nome, setNome] = useState("");
  const [pet, setPet] = useState("");
  const [especie, setEspecie] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, pet, especie });
    alert("Pet adicionado à fila!"); 
    setNome("");
    setPet("");
    setEspecie("");
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}

        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4"
      >

        <h1 className="text-3xl font-bold mb-6 text-center text-unipett-dark">
          Cadastro na Fila de Atendimento
        </h1>


        <div>
          <label htmlFor="tutor" className="block mb-1 text-sm font-medium text-gray-700">Nome do Tutor</label>
          <input
            id="tutor"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}

            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unipett-blue-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="pet" className="block mb-1 text-sm font-medium text-gray-700">Nome do Pet</label>
          <input
            id="pet"
            type="text"
            value={pet}
            onChange={(e) => setPet(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unipett-blue-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="especie" className="block mb-1 text-sm font-medium text-gray-700">Espécie</label>
          <select
            id="especie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unipett-blue-primary"
            required
          >
            <option value="" disabled>Selecione</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Outros">Outros</option>
          </select>
        </div>


        <button
          type="submit"
          className="w-full bg-unipett-blue-primary text-white font-bold p-3 rounded-lg hover:bg-unipett-blue-dark transition-colors duration-300"
        >
          Adicionar à Fila
        </button>
      </form>
    </div>
  );
}