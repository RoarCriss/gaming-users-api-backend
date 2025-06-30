const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");



// GET all games
router.get("/", gamesController.getAll);

module.exports = router;
