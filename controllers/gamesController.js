const model = require("../models/gamesModel");
const utils = require("../utils/utils");
const rawg = require("../services/rawgService")

require('dotenv').config();


// Busca todos los juegos en nuestra bbdd.
// Method: GET // Route:  /games
exports.getAll = (req, res) => {
  model.getAllGamesFromDatabase((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(users);
  });
};

// Busca un juego en RAWG, añade la info a la bbdd y crea una relación entre ese game_id y el user_id.
// Method: POST // Route: /games/add
exports.addNewGameToUser = async (req, res) => {
  const { id } = req.body;
  const userId = 1  // La idea es pasar esto en el body desde el front también
  
  try {
    // Busca el juego en RAWG mediante su ID.
    const game = await rawg.searchGameInRawgById(id)
    // Añade el juego a nuestra BBDD. addGameToDatabase devuelve la nueva ID del juego al añadirla a la bbdd.
    const gameId = await model.addGameToDatabase(game)
    // Añade la relación entre user y juego a la BBDD
    model.addGameToUser(userId, gameId)
    
    res.status(200).json({message: `${game.name} añadido al usuario ${userId}`});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar la API externa" });
  }
}

// Busca juegos en Rawg mediante nombre.
// Method: POST // Route: /games/search 
exports.searchGamesInRawg = async (req, res) => {
  const { name } = req.body;
  
  try {
    const formatedData = await rawg.searchNameInRawgByName(name)
    
    res.status(200).json(formatedData);
  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Error al consultar la API externa" });
  }
};



// Busca juegos en nuestra database. No se está usando por ahora.
// Method: POST // Route: /games/check
exports.checkGamesInDatabaseC = (req, res) => {
  let {name} = req.body;
  
  // nameToSlug() formatea el nombre del juego en formato slug y quita letras para mayor precisión a la hora de buscar en la db. Hay que mejorarlo.
  const keywords = utils.nameToSlug(name).split("-");                  
  model.checkGamesInDatabase(keywords, (err, gameToCheck) => {
    if (err) return res.status(500).json({error: err.message});
    if (!gameToCheck) {
      return res.status(500).json({error: err, message: "No existe el juego en la base de datos." });
    }
    
    res.status(201).json(gameToCheck)
  })
}