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

module.exports = { getAll, create, update, remove };
