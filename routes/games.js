const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");



// GET all games
router.get("/", gamesController.getAll);
//GET checks if one game exists in the database
router.post("/search", gamesController.searchGamesInRawg);
router.post("/check", gamesController.checkGamesInDatabaseC);
router.post("/add", gamesController.addNewGameToUser);


module.exports = router;
