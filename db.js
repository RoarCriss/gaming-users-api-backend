const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./users.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT NOT NULL,
        email TEXT UNIQUE,
        password TEXT,
        country TEXT, 
        age INTEGER,
        description TEXT,
        looking_for TEXT,
        skill_level TEXT,
        play_time TEXT,
        preferred_platform TEXT,
        games TEXT
        );`);
});

module.exports = db;
