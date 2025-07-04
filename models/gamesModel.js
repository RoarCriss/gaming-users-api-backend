const db = require("../db");


const getAllGamesFromDatabase = (cb) => {
  db.all("SELECT * FROM games", [], (err, rows) => {
    if (err) return cb(err);
    cb (null, rows);
  });
};



// Añade un juego a la bbdd y devuelve el ID asignado.  TENGO QUE CONVERTIRLO A FUNCION CON CALLBACK
const addGameToDatabase = async (gameData) => {
  const query = `
    INSERT INTO games (name, slug)
    VALUES (?, ?)
  `;

  const values = [
    gameData.name,
    gameData.slug
  ];

  return new Promise((resolve, reject) => {
    db.run(query, values, function (err) {
      if (err) {
        console.error("Error al insertar en DB:", err.message);
        return reject(err);
      }
      resolve(this.lastID);
    });
  });
};

const addGameToUser = async (userId, gameId) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO user_games (user_id, game_id) VALUES (?, ?)`;
    db.run(query, [userId, gameId], function (err) {
      if (err) return reject(err);
      resolve({ message: "Juego añadido correctamente" });
    });
  });
};

const checkGamesInDatabase = (keywords, cb) => {
  const conditions = keywords.map(() => `slug LIKE ?`).join(" OR ");
  const values = keywords.map(word => `%${word}%`);

  const query = `SELECT * FROM games WHERE ${conditions}`;
  db.all(query, values, (err, row) => {
    if (err) return cb(err);
    cb(null, row);
  });
};


module.exports = { getAllGamesFromDatabase, addGameToDatabase, checkGamesInDatabase, addGameToUser };

































// const checkSimilarGames = (gameName, cb) => {

//   const query = `SELECT * FROM games WHERE slug LIKE ?`

//    db.get(query, [`%${gameName}%`], (err, row) => {
//     if (err) return cb(err);
//     cb(null, row);
//   });
// }