import * as dotenv from "dotenv";
import { Pool } from "pg";

// Configura para cargar las variables de entorno
dotenv.config();

// Crear una instancia de la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
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
