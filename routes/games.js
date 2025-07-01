const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");



// GET all games
router.get("/", gamesController.getAll);
//GET checks if one game exists in the database
router.get("/check", gamesController.checkGame);
//POST adds a new game
router.post("/", gamesController.addGame);

module.exports = router;
