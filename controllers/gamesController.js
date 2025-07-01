const model = require("../models/gamesModel");
const rawgApi = require("../rawg/api");

// GET /users
exports.getAll = (req, res) => {
  model.getAll((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(users);
  });
};

exports.addGame = (req, res) => {
  const gameData = req.body;

  model.addGame(gameData, (err, newGame) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(newGame);
  });
};

exports.checkGame = (req, res) => {
  let {name} = req.body;
  // Convierto nombre a slug para minimizar errores a la hora de buscar por nombre (espacio, mayus, etc)
  const slug = name.toLowerCase()
                   .normalize("NFD")                // elimina tildes
                   .replace(/[\u0300-\u036f]/g, "") // elimina diacríticos
                   .replace(/ñ/g, "n")              // reemplaza ñ 
                   .replace(/[^a-z0-9\s-]/g, "")    // elimina caracteres especiales
                   .trim()                          
                   .replace(/\s+/g, "-");  

  model.checkGame(slug, (err, gameToCheck) => {
    if (err) return res.status(500).json({error: err.message});
    if (!gameToCheck) {
      return res.status(500).json({error: err, message: "No existe el juego en la base de datos." });
    }

    res.status(201).json(gameToCheck)
  })
}