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
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL,
        description TEXT NOT NULL,
        released TEXT NOT NULL,
        background_path TEXT NOT NULL
        );`);

      db.run(`CREATE TABLE IF NOT EXISTS user_games (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        game_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (game_id) REFERENCES games(id),
        UNIQUE(user_id, game_id)
        );`);

});

module.exports = db;
