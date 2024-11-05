import * as dotenv from "dotenv";
import { config, ConnectionPool } from "mssql";

// Configura para cargar las variables de entorno
dotenv.config();

// Crea una configuracion
const dbConfig: config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER as string,
  options: {
    enableArithAbort: true,
    // enable local db connection
    trustedConnection: true,
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Crear una instancia de la base de datos
const pool = new ConnectionPool(dbConfig);

pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

export { pool };
