// const db = require("../db");
// const rawgApi = require("../rawg/api")
// const gamesModel = require("../models/gamesModel")

// // get all users
// const getAll = (cb) => {
//   db.all("SELECT * FROM users", [], (err, rows) => {
//     if (err) return cb(err);
//     cb(null, rows);
//   });
// };

// // get user by id
// const getById = (id, cb) => {
//   db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
//     if (err) return cb(err);

//     if (user.games && typeof user.games === "string") {
//       try {
//         user.games = JSON.parse(user.games);
//       } catch (e) {
//         user.games = [];
//       }
//     } else {
//       user.games = [];
//     }

//     cb(null, user);
//   });
// };

// // create new user
// const create = (userData, cb) => {
//   const {
//     username,
//     email,
//     password,
//     country,
//     age,
//     description,
//     looking_for,
//     skill_level,
//     play_time,
//     preferred_platform,
//     games,
//   } = userData;

//   db.run(
//     `INSERT INTO users (
//       username, email, password, country, age, description, looking_for, skill_level, play_time, preferred_platform, games) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
//     [
//       username,
//       email,
//       password,
//       country,
//       age,
//       description,
//       looking_for,
//       skill_level,
//       play_time,
//       preferred_platform,
//       JSON.stringify(games), //games es array así que lo almacenamos como texto dentro de la db
//     ],
//     function (err) {
//       cb(err, { id: this?.lastID, ...userData });
//     }
//   );
// };

// // update user
// const update = (id, data, cb) => {
//   const fields = Object.keys(data);
//   const values = Object.values(data);

//   if (fields.length === 0) return cb(new Error("No data provided"));

//   // Si el campo games existe y es un array, lo convertimos a JSON string
//   const index = fields.indexOf("games");
//   if (index !== -1 && Array.isArray(data.games)) {
//     values[index] = JSON.stringify(data.games);
//   }

//   const setClause = fields.map((field) => `${field} = ?`).join(", ");
//   const sql = `UPDATE users SET ${setClause} WHERE id = ?`;

//   db.run(sql, [...values, id], function (err) {
//     cb(err, { id, changes: this.changes });
//   });
// };

// const addGame = (user, game, cb) => {

//   // Busca en la tabla "users" si existe el usuario que le pasamos en el body.
//   db.get("SELECT id FROM users WHERE username = ?", [user], (err, userRow) => {
//     if (err) return cb(err);
//     if (!userRow) return cb(new Error("Usuario no encontrado"));

//     // Busca en la tabla "games" si existe el juego que le pasamos en el body
//     db.get("SELECT id FROM games WHERE name = ?", [game], async (err, gameRow) => {
//       if (err) return cb(err);

//       // Si no está el juego en la tabla, lo va a buscar a la API de Rawg
//       if (!gameRow) {
//         try {
//           // Esta función está en "../rawg/api.js"
//           const gameData = await rawgApi.getRelatedGames(game);

//           if (!gameData) {
//             return cb(new Error("Juego no encontrado ni en la BBDD ni en la API"));
//           }

//           // Si encuentra el juego en la API de Rawg, lo añade a nuestra bbdd.
//           // Esta función está en "../models/gamesModel"
//           gamesModel.addGame(gameData, (err, insertedGameId) => {
//             if (err) return cb(err);

//             // Inserta la relación entre user y game por sus IDs en la tabla "user_games"
//             db.run(
//               "INSERT INTO user_games (user_id, game_id) VALUES (?, ?)",
//               [userRow.id, insertedGameId],
//               (err) => {
//                 if (err) return cb(err);
//                 cb(null, { message: "Juego añadido correctamente desde la API" });
//               }
//             );
//           });

//         } catch (error) {
//           return cb(error);
//         }

//         return;
//       }

//       // Si el juego ya existe en la tabla, se asigna directamente
//       db.run(
//         "INSERT INTO user_games (user_id, game_id) VALUES (?, ?)",
//         [userRow.id, gameRow.id],
//         (err) => {
//           if (err) return cb(err);
//           cb(null, { message: "Juego añadido correctamente" });
//         }
//       );
//     });
//   });
// };

// // delete user
// const remove = (id, cb) => {
//   db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
//     cb(err, { deleted: this.changes });
//   });
// };

// module.exports = { getAll, getById, create, update, remove, addGame };

const db = require("../db");

//GET ALL USERS

const getAll = (cb) => {
  db.query("SELECT * FROM users", [], (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
  });
};

//GET USERS BY ID

const getById = (id, cb) => {
  db.query("SELECT * FROM users WHERE id = $1", [id], (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows[0] || null);
  });
};

//CREATE NEW USER

const create = (userData, cb) => {
  const { username, email, password, country, age, description } = userData;

  const query = `INSERT INTO users (username, email, password, country, age, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  const values = [username, email, password, country, age, description];

  db.query(query, values, (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows[0]);
  });
};

//UPDATE USER

const update = (id, data, cb) => {
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) return cb(new Error("No data provided"));

  const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(", ");
  const query = `UPDATE users SET ${setClause} WHERE id = $${
    fields.length + 1
  } RETURNING *`;

  db.query(query, [...values, id], (err, res) => {
    if (err) return cb(err);
    cb(null, { id, changes: res.rowCount });
  });
};

//DELETE USER

const remove = (id, cb) => {
  db.query("DELETE FROM users WHERE id = $1", [id], (err, res) => {
    if (err) return cb(err);
    cb(null, { deleted: res.rowCount });
  });
};

module.exports = { getAll, getById, create, update, remove };
