import express from "express";
import db from "../db/db.js";

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { id, type, description, amount, category, date } = req.body;

  const query = `
    INSERT INTO transactions (id, type, description, amount, category, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [id, type, description, amount, category, date], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Transaction added' });
  });
});

router.delete('/', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Transaction deleted' });
  });
});

router.put('/', (req, res) => {
  const { id, type, description, amount, category, date } = req.body;

  const query = `
    UPDATE transactions
    SET type = ?, description = ?, amount = ?, category = ?, date = ?
    WHERE id = ?
  `;

  db.run(query, [type, description, amount, category, date, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Transaction updated' });
  });
});

export default router;
