const service = require("../services/testeService");

async function salvar(req, res) {
    const nome = req.body.nome;
    const result = await service.salvar(nome);
    res.send(result);
}

async function listar(req, res) {
    const result = await service.listar();
    res.send(result);
}

module.exports = { salvar, listar };