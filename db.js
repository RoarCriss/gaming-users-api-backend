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
        );`)

      db.run(`CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT NOT NULL,
        description TEXT NOT NULL,
        released TEXT NOT NULL,
        background_path TEXT NOT NULL,
        background_path_additional TEXT NOT NULL
        
        );`);



});

module.exports = db;
