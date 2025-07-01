const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// GET all users
router.get("/", usersController.getAll);

// GET user by ID
router.get("/:id", usersController.getById);

// POST create user
router.post("/", usersController.create);
router.post("/add", usersController.addGame);

// PATCH update user
router.patch("/:id", usersController.update);

// DELETE user
router.delete("/:id", usersController.remove);

module.exports = router;
