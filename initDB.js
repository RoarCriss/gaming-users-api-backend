const db = require("./db");

async function createUsersTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        country TEXT,
        age INTEGER,
        description TEXT
      );
    `);

    console.log("✅ Tabla 'users' creada correctamente.");
    process.exit(); // salimos del script
  } catch (err) {
    console.error("❌ Error creando la tabla:", err.message);
    process.exit(1);
  }
}

createUsersTable();
