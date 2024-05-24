const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

const dbPath = path.join(__dirname, 'db', 'appointments.db');
const db = new sqlite3.Database(dbPath);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        date TEXT,
        time TEXT
    )`);
});

const appointmentsRouter = require('./routes/appointments')(db);
app.use('/api/appointments', appointmentsRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});