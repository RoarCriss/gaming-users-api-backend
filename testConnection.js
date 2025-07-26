const pool = require("./db");

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error de conexion", err);
  } else {
    console.log("Conexión exitosa", res.rows[0]);
  }
  pool.end();
});
