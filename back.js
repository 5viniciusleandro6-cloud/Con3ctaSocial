import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quiz_ambiental"
});

app.post("/api/respostas", (req, res) => {
  const { total, dataHora } = req.body;
  db.query(
    "INSERT INTO respostas (pontuacao, dataHora) VALUES (?, ?)",
    [total, dataHora],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.get("/api/contagem", (req, res) => {
  db.query("SELECT COUNT(*) AS totalRespostas FROM respostas", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows[0]);
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
