const model = require("../models/gamesModel");

// GET /users
exports.getAll = (req, res) => {
  model.getAll((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(users);
  });
};