const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../dbPool'); // Wir gehen davon aus, du exportierst den Pool separat, sonst müssen wir das anpassen
const { authenticateToken } = require('../middleware/authenticateToken'); // gleiche Annahme, Middleware separat

// Falls Middleware nicht extern ist, einfach hier definieren (kopiere aus server.js falls nötig)
// const authenticateToken = ... (wie in server.js)

// --- Hilfsfunktion für DB Query ---
async function query(sql, values) {
  const [results] = await pool.execute(sql, values);
  return results;
}

// Alle User abrufen (nur mit Token)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await query('SELECT id, username FROM user');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fehler beim Abrufen der User', error: err.message });
  }
});

// User mit ID abrufen (nur mit Token)
router.get('/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await query('SELECT id, username FROM user WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User nicht gefunden' });
    }
    res.json({ success: true, user: users[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fehler beim Abrufen des Users', error: err.message });
  }
});

// Neuen User erstellen (ohne Token für Demo, könnte man absichern)
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username und Passwort sind erforderlich' });
  }
  try {
    const result = await query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password]);
    res.status(201).json({ success: true, message: 'User erstellt', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fehler beim Erstellen des Users', error: err.message });
  }
});

// User aktualisieren (nur mit Token)
router.put('/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;
  if (!username && !password) {
    return res.status(400).json({ success: false, message: 'Mindestens ein Feld (username oder password) muss angegeben werden' });
  }
  try {
    // Nur die übergebenen Felder updaten
    const fields = [];
    const values = [];
    if (username) {
      fields.push('username = ?');
      values.push(username);
    }
    if (password) {
      fields.push('password = ?');
      values.push(password);
    }
    values.push(userId);
    const sql = `UPDATE user SET ${fields.join(', ')} WHERE id = ?`;
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User nicht gefunden' });
    }
    res.json({ success: true, message: 'User aktualisiert' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fehler beim Aktualisieren des Users', error: err.message });
  }
});

// User löschen (nur mit Token)
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await query('DELETE FROM user WHERE id = ?', [userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User nicht gefunden' });
    }
    res.json({ success: true, message: 'User gelöscht' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fehler beim Löschen des Users', error: err.message });
  }
});

module.exports = router;
