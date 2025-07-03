const model = require("../models/usersModel");
const gamesModel = require("../models/gamesModel");

// GET /users
exports.getAll = (req, res) => {
  model.getAll((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(users);
  });
};

// GET /users/:id
exports.getById = (req, res) => {
  model.getById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  });
};

// POST /users
exports.create = (req, res) => {
  const userData = req.body;

  if (!userData.username || !userData.email || !userData.password) {
    return res
      .status(400)
      .json({ error: "Username, email and password are required" });
  }

  model.create(userData, (err, newUser) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(newUser);
  });
};


// PATCH /users/:id
exports.update = (req, res) => {
  const userData = req.body;

  if (Object.keys(userData).length === 0) {
    return res.status(400).json({ error: "No data provided to update" });
  }

  model.update(req.params.id, userData, (err, updatedUser) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!updatedUser.changes)
      return res.status(404).json({ error: "User not found or no changes" });
    res.json(updatedUser);
  });
};

// DELETE /users/:id
exports.remove = (req, res) => {
  model.remove(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result.deleted)
      return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  });
};


