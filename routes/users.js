const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// GET all users
router.get("/", usersController.getAll);

// POST create user
router.post("/", usersController.create);

// POST get user games
router.post("/userGames", usersController.getUserGames);

// PATCH update user
router.patch("/:id", usersController.update);

// DELETE user
router.delete("/:id", usersController.remove);


module.exports = router;
