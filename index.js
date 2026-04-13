const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.post("/salvar", async (req, res) => {
    const { nome } = req.body;

    await pool.query(
        "CREATE TABLE IF NOT EXISTS teste (id SERIAL PRIMARY KEY, nome TEXT)"
    );

    await pool.query(
        "INSERT INTO teste (nome) VALUES ($1)",
        [nome]
    );

    res.send({ status: "ok" });
});

app.get("/listar", async (req, res) => {
    const result = await pool.query("SELECT * FROM teste");
    res.send(result.rows);
});

app.listen(process.env.PORT || 3000);