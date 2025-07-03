const express = require("express");
const cors = require("cors");

const app = express();

// middleware para JSON
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());

// rutas de users
const usersRoutes = require("./routes/users");
const gamesRoutes = require("./routes/games");
// const extApiRoutes = require("./routes/extApi");
app.use("/users", usersRoutes);
app.use("/games", gamesRoutes);
// app.use("/extApi", extApiRoutes);

// middleware de error 404 genérico
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
