require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

app.use(express.json());

let Sigma = null;

// Middleware: blockiert Anfragen, bis DB verbunden ist
app.use((req, res, next) => {
  if (!Sigma) {
    return res.status(503).send("Datenbankverbindung wird noch hergestellt...");
  }
  next();
});

// Route: /hello?name=...
app.get("/hello", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).send("Name fehlt");

  try {
    await Sigma.execute("INSERT INTO greetings (name, source) VALUES (?, ?)", [name, "query"]);
    res.send("Hallo mein query ist: " + name);
  } catch (err) {
    res.status(500).send("Fehler beim Einfügen in die DB");
  }
});

// Route: /hello/:name
app.get("/hello/:name", async (req, res) => {
  const { name } = req.params;

  try {
    await Sigma.execute("INSERT INTO greetings (name, source) VALUES (?, ?)", [name, "param"]);
    res.send("Hallo mein Name ist auch " + name);
  } catch (err) {
    res.status(500).send("Fehler beim Einfügen in die DB");
  }
});

// Route: POST /hello/body
app.post("/hello/body", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send("JSON muss ein 'name'-Feld enthalten");

  try {
    await Sigma.execute("INSERT INTO greetings (name, source) VALUES (?, ?)", [name, "body"]);
    res.send({ message: "Name gespeichert", name });
  } catch (err) {
    res.status(500).send("Fehler beim Einfügen in die DB");
  }
});

// Route: POST /personen
app.post("/personen", async (req, res) => {
  const { vorname, nachname, plz, strasse, ort, telefonnummer, email } = req.body;
  if (!vorname || !nachname || !email) {
    return res.status(400).send("Vorname, Nachname und E-Mail sind erforderlich");
  }

  try {
    const [result] = await Sigma.execute(
      `INSERT INTO personen (vorname, nachname, plz, strasse, ort, telefonnummer, email)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [vorname, nachname, plz, strasse, ort, telefonnummer, email]
    );
    res.status(201).send({ message: "Person hinzugefügt", id: result.insertId });
  } catch (err) {
    console.error("Fehler beim Einfügen:", err);
    res.status(500).send("Fehler beim Speichern der Person");
  }
});

// Route: GET /personen
app.get("/personen", async (req, res) => {
  try {
    const [results] = await Sigma.execute("SELECT * FROM personen");
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send("Fehler beim Abrufen der Personen");
  }
});

// Route: GET /personen/:id
app.get("/personen/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await Sigma.execute("SELECT * FROM personen WHERE id = ?", [id]);
    if (result.length === 0) return res.status(404).send("Person nicht gefunden");
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).send("Fehler beim Abrufen der Person");
  }
});

// Route: DELETE /personen/:id
app.delete("/personen/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await Sigma.execute("DELETE FROM personen WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).send("Person nicht gefunden");
    res.status(200).send("Person gelöscht");
  } catch (err) {
    res.status(500).send("Fehler beim Löschen der Person");
  }
});

// Verbindung zur DB aufbauen und Server starten
(async () => {
  try {
    Sigma = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
    console.log("Mit Sigma verbunden!");

    app.listen(port, () => {
      console.log(`Server läuft unter http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Datenbankverbindung fehlgeschlagen:", err);
    process.exit(1);
  }
})();
