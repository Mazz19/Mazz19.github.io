const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        db.all('SELECT * FROM appointments', [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ appointments: rows });
        });
    });

    router.post('/', (req, res) => {
        const { name, email, date, time } = req.body;
        db.run('INSERT INTO appointments (name, email, date, time) VALUES (?, ?, ?, ?)', [name, email, date, time], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        });
    });

    router.post('/check', (req, res) => {
        const { date, time } = req.body;
        db.get('SELECT * FROM appointments WHERE date = ? AND time = ?', [date, time], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ isSlotTaken: !!row });
        });
    });

    return router;
};