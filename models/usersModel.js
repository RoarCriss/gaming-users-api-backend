const db = require("../db");
// const rawg = require("../controllers/extApiController")
const gamesModel = require("../models/gamesModel")
const utils = require("../utils/utils")

// get all users
const getAll = (cb) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return cb(err);
    cb(null, rows);
  });
};

// create new user
const create = (userData, cb) => {
  const {
    username,
    email,
    password,
    country,
    age,
    description,
    looking_for,
    skill_level,
    play_time,
    preferred_platform,
    games,
  } = userData;

  db.run(
    `INSERT INTO users (
      username, email, password, country, age, description, looking_for, skill_level, play_time, preferred_platform, games) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      username,
      email,
      password,
      country,
      age,
      description,
      looking_for,
      skill_level,
      play_time,
      preferred_platform,
      JSON.stringify(games), //games es array así que lo almacenamos como texto dentro de la db
    ],
    function (err) {
      cb(err, { id: this?.lastID, ...userData });
    }
  );
};

// update user
const update = (id, data, cb) => {
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) return cb(new Error("No data provided"));

  // Si el campo games existe y es un array, lo convertimos a JSON string
  const index = fields.indexOf("games");
  if (index !== -1 && Array.isArray(data.games)) {
    values[index] = JSON.stringify(data.games);
  }

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `UPDATE users SET ${setClause} WHERE id = ?`;

  db.run(sql, [...values, id], function (err) {
    cb(err, { id, changes: this.changes });
  });
};

// delete user
const remove = (id, cb) => {
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    cb(err, { deleted: this.changes });
  });
};



// - userId: el ID del usuario
// - cb: función que se llamará cuando termine la consulta
const getUserGames = (userId, cb) => {

  // Ejecutamos una consulta SQL con db.all (de sqlite3)
  db.all(
    `SELECT games.name 
     FROM user_games 
     INNER JOIN games ON user_games.game_id = games.id 
     WHERE user_games.user_id = ?`, // ← usamos ? como placeholder seguro
     
    [userId], // ← el valor que sustituirá el "?" en la consulta para evitar SQL injection

    // Este es el callback que se ejecuta cuando la base de datos responde
    (err, rows) => {
      
      // Si hay un error (err no es null), lo devolvemos a través del callback con el error como primer parámetro
      // La convención en Node.js es: cb(error, resultado)
      if (err) return cb(err); 

      // El primer parámetro del callback es SIEMPRE el error si lo hay
      // Si no hay error, devolvemos null como primer parámetro (porque no hay error),
      // y el segundo parámetro contiene las filas (rows) que nos devolvió la base de datos
      cb(null, rows); 
    }
  );
}


module.exports = { getAll, create, update, remove, getUserGames };
