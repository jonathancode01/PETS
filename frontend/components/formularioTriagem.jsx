import { useState } from "react";

export function FormularioTriagem({ onNovaTriagem }) {
    const [petId, setPetId] = useState("");
    const [prioridade, setPrioridade] = useState("Normal");

    async function handleSubmit(e) {
        e.preventDefault();

        const resposta = await fetch("http://localhost:3001/triagens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ petId, prioridade }),
        });

        const dados = await resposta.json();
        onNovaTriagem(dados); // Chama a função passada como prop

        setPetId("");
        setPrioridade("Normal");
        alert("Triagem enviada com sucesso!");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Id do pet:</label>
            <input
                type="number"
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
            />
            <label>Prioridade:</label>
            <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
            >
                <option value="Normal">Normal</option>
                <option value="Urgente">Urgente</option>
            </select>
            <button type="submit">Enviar</button>
        </form>
    );
}