const db = require("../db");

// get all users
const getAll = (cb) => {
  db.all("SELECT * FROM games", [], (err, rows) => {
    if (err) return cb(err);
    cb (null, rows);
  });
};

module.exports = { getAll };