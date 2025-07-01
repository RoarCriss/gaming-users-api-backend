const db = require("../db");

// get all users
const getAll = (cb) => {
  db.all("SELECT * FROM games", [], (err, rows) => {
    if (err) return cb(err);
    cb (null, rows);
  });
};

const addGame = (gameData, cb) => {
  const { name, slug, description, released, background_image} = gameData;

  const query = `
    INSERT INTO games (name, slug, description, released, background_path)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [name, slug, description, released, background_image],
    function (err) {
      if (err) return cb(err);
      // this.lastID contiene el ID del registro insertado en SQLite
      cb(null, this.lastID);
    }
  );
};

const checkGame = (gameName, cb) => {
  
  const query = `SELECT * FROM games WHERE slug = ?`;

  db.get(query, [gameName], (err, row) => {
    if (err) return cb(err);
    cb(null, row);
  });
};

module.exports = { getAll, addGame, checkGame };