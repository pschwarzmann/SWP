require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const Ajv = require("ajv");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(express.json());

let pool = null;

// AJV Setup
const ajv = new Ajv();

// TOKEN_SECRET aus .env
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// --- AJV Schema für Login POST Body ---
const loginSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3 },
    password: { type: "string", minLength: 6 },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

const validateLogin = ajv.compile(loginSchema);

// --- Simple Brute-Force Schutz ---
const loginAttempts = {};
const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 15 * 60 * 1000; // 15 Minuten

function isBlocked(ip) {
  const attempt = loginAttempts[ip];
  if (!attempt) return false;

  if (attempt.blockExpires && Date.now() < attempt.blockExpires) {
    return true;
  }

  if (attempt.blockExpires && Date.now() > attempt.blockExpires) {
    // Blockzeit abgelaufen
    delete loginAttempts[ip];
    return false;
  }
  return false;
}

function recordFailedAttempt(ip) {
  if (!loginAttempts[ip]) {
    loginAttempts[ip] = { count: 1 };
  } else {
    loginAttempts[ip].count++;
    if (loginAttempts[ip].count >= MAX_ATTEMPTS) {
      loginAttempts[ip].blockExpires = Date.now() + BLOCK_TIME;
    }
  }
}

// --- Hilfsfunktion für DB Query ---
async function query(sql, values) {
  const [results] = await pool.execute(sql, values);
  return results;
}

// Middleware: blockiert Anfragen, bis DB verbunden ist
app.use((req, res, next) => {
  if (!pool) {
    return res.status(503).json({ message: "Datenbankverbindung wird noch hergestellt..." });
  }
  next();
});

// Hilfsfunktion für Fehlerantworten
function sendError(res, status, message) {
  return res.status(status).json({ success: false, message });
}

// === LOGIN ===
app.post('/user/login', async (req, res) => {
  const ip = req.ip;

  if (isBlocked(ip)) {
    return res.status(429).json({ status: 429, message: "Zu viele Loginversuche. Bitte später erneut versuchen." });
  }

  const valid = validateLogin(req.body);
  if (!valid) {
    return res.status(400).json({ success: false, errors: validateLogin.errors });
  }

  const { username, password } = req.body;

  try {
    const sql = "SELECT username, password FROM user WHERE username = ? AND password = ?";
    const results = await query(sql, [username, password]);
    if (results.length === 0) {
      recordFailedAttempt(ip);
      return res.status(409).json({ status: 409, message: "Username oder Passwort falsch" });
    }

    const token = generateAccessToken({ username });
    return res.status(201).json({
      token: token,
      status: 201,
      message: "Erfolgreich eingeloggt und Token erstellt"
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ status: 500, message: "Datenbankfehler: " + err.message });
  }
});

// Token für User erstellen
function generateAccessToken(user) {
  return jwt.sign(user, TOKEN_SECRET, { expiresIn: '1800s' }); // 30 Minuten
}

// Token Überprüfung Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Kein Token gefunden", status: 401 });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Falscher Token", status: 403 });
    req.user = user;
    next();
  });
}

// Beispiel: geschützte Route mit Token-Check
app.get('/kunden', authenticateToken, async (req, res) => {
  try {
    // Beispiel-Daten, hier könntest du DB-Operationen machen
    res.json({ success: true, message: "Geschützte Kundendaten", user: req.user });
  } catch (err) {
    sendError(res, 500, "Fehler beim Abrufen der Kundendaten");
  }
});

// --- Ergänzung: Router Import und Mounting ---
const helloRouter = require("./routes/hello");
const personenRouter = require("./routes/personen");
const userRouter = require("./routes/user");

app.use("/hello", helloRouter);
app.use("/personen", personenRouter);
app.use("/user", userRouter);

// Verbindungspool aufbauen und Server starten
(async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("Verbindungspool aufgebaut.");

    app.listen(port, () => {
      console.log(`Server läuft unter http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Fehler beim Aufbau des Verbindungspools:", err);
    process.exit(1);
  }
})();
