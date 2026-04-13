const repo = require("../repositories/testeRepository");

async function salvar(nome) {
    await repo.criarTabela();
    await repo.inserir(nome);
    return { status: "ok", recebido: nome };
}

async function listar() {
    return await repo.listar();
}

module.exports = { salvar, listar };