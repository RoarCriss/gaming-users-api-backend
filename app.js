const express = require("express");
const app = express();

// middleware para JSON
app.use(express.json());

// rutas de users
const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

// middleware de error 404 genérico
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
