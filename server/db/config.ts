import * as dotenv from "dotenv";
import { Pool } from "pg";

// Configura para cargar las variables de entorno
dotenv.config();

// Crear una instancia de la base de datos
const pool = new Pool({
  connectionString : process.env.DB_URL,
  ssl : true
});

// Conecta a la base de datos
try {
  pool.on("connect", () => {
    console.log("Database connected");
  });
} catch (error) {
  console.error("Error connecting to database:", error);
}

export default pool;
