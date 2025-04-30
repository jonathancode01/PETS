import { useState } from "react";
import { handleFormularioSubmit } from "../services/formularioTrIagemService";

export function FormularioTriagem({ onNovaTriagem }) {
    const [petId, setPetId] = useState("");
    const [prioridade, setPrioridade] = useState("Normal");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            // const resposta = await fetch("http://localhost:3001/triagens", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ petId, prioridade }),
            // });

            // if (!resposta.ok) {
            //     throw new Error("Erro ao enviar a triagem");
            // }

            // const dados = await resposta.json();
            // onNovaTriagem(dados); // Chama a função passada como prop para atualizar a lista

            // setPetId(""); // Reseta os campos do formulário
            // setPrioridade("Normal");

            // alert("Triagem enviada com sucesso!");

            const response = await handleFormularioSubmit(e);
        } catch (erro) {
            console.error(erro);
            alert("Houve um erro ao enviar a triagem. Tente novamente.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Id do pet:</label>
                <input
                    type="number"
                    value={petId}
                    onChange={(e) => setPetId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Prioridade:</label>
                <select
                    value={prioridade}
                    onChange={(e) => setPrioridade(e.target.value)}
                    required
                >
                    <option value="Normal">Normal</option>
                    <option value="Urgente">Urgente</option>
                </select>
            </div>
            <div>
                <button type="submit">Enviar</button>
            </div>
        </form>
    );
}
