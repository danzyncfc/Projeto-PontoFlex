const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const controller = require("./controllers/testeController");

app.post("/salvar", controller.salvar);
app.get("/listar", controller.listar);

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.listen(process.env.PORT || 3000);