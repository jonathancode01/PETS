const { criarTriagem, listarTriagens } = require("../Models/triagemModels");
const _ = require('lodash-es');

function criar(req, res) {
    const { petId, prioridade } = req.body;

    if (!petId || !prioridade) {
        return res.status(400).json({ erro: "Os campos petId e prioridade são obrigatórios." });
    }

    const novaTriagem = criarTriagem(petId, prioridade);
    res.status(201).json(novaTriagem);
}

function listar(req, res) {
    const triagens = listarTriagens();
    res.json(triagens);
}

module.exports = { criar, listar };
