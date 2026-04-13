const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.post("/salvar", async (req, res) => {
    console.log(req.body);

    const nome = req.body.nome;

    await pool.query(
        "CREATE TABLE IF NOT EXISTS teste (id SERIAL PRIMARY KEY, nome TEXT)"
    );

    await pool.query(
        "INSERT INTO teste (nome) VALUES ($1)",
        [nome]
    );

    res.send({ status: "ok", recebido: nome });
});

app.get("/listar", async (req, res) => {
    const result = await pool.query("SELECT * FROM teste");
    res.send(result.rows);
});

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.listen(process.env.PORT || 3000);