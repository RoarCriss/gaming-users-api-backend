const express = require("express");
const app = express();

// middleware para JSON
app.use(express.json());

// rutas de users
const usersRoutes = require("./routes/users");
const gamesRoutes = require("./routes/games");
app.use("/users", usersRoutes);
app.use("/games", gamesRoutes);

// middleware de error 404 genérico
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


module.exports = app;
