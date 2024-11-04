import { configDotenv } from "dotenv";
import { ConnectionOptions, createConnection } from "mysql2";
configDotenv();
const access: ConnectionOptions = {
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "sistemadecine",
};
const conn = createConnection(access);
conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to database");
});

export default conn;
