export const handleFormularioSubmit  = async (e) => {
    e.preventDefault();

    try {
        const resposta = await fetch("http://localhost:3001/triagens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ petId, prioridade }),
        });

        if (!resposta.ok) {
            throw new Error("Erro ao enviar a triagem");
        }

        const dados = await resposta.json();
        onNovaTriagem(dados); // Chama a função passada como prop para atualizar a lista

        setPetId(""); // Reseta os campos do formulário
        setPrioridade("Normal");

        alert("Triagem enviada com sucesso!");
    } catch (erro) {
        console.error(erro);
        alert("Houve um erro ao enviar a triagem. Tente novamente.");
    }
};