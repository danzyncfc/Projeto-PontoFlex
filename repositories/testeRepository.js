const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function criarTabela() {
    await pool.query(
        "CREATE TABLE IF NOT EXISTS teste (id SERIAL PRIMARY KEY, nome TEXT)"
    );
}

async function inserir(nome) {
    await pool.query(
        "INSERT INTO teste (nome) VALUES ($1)",
        [nome]
    );
}

async function listar() {
    const result = await pool.query("SELECT * FROM teste");
    return result.rows;
}

module.exports = { criarTabela, inserir, listar };