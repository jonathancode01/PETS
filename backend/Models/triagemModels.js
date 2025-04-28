let triagens = [];
let contadorSenhas = 1;


function gerarSenha() {
    return `C${String(contadorSenhas).padStart(3, '0')}`;
}

function criarTriagem(petId, prioridade) {
    const triagem = {
        id: triagens.length + 1,
        petId,
        senha: gerarSenha(),
        prioridade,
        hora_chegada: new Date(),
    };

    triagens.push(triagem);
    return triagem;
}

function listarTriagens() {
    return triagens.sort((a, b) => {
        // Emergencia primeiro, depois ordem de chegada
        if (a.prioridade === 'Emergencia' && b.prioridade !== 'Emergencia') return -1;
        if (a.prioridade !== 'Emergencia' && b.prioridade === 'Emergencia') return 1;
        return new Date(a.hora_chegada) - new Date(b.hora_chegada);
    });
}

// function buscarTriagemPorId(id) {
//     return triagens.find(triagem => triagem.id === id);
// }

module.exports = { criarTriagem, listarTriagens };