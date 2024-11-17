import pool from "../db/config";
import { UserLogin } from "../models/UserLogin";

export class AuthDA {
  async loginDA(user: UserLogin) {
    try {
      const { username } = user;

      const query = 'SELECT * FROM "paObtenerPasswordHash"($1)';

      const { rows } = await pool.query(query, [username]);

      if (rows.length == 0) return null;

      return rows[0];
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al loguear admin:", error.message);
      } else {
        console.error("Error al loguear admin:", error);
      }
      throw error;
    }
  }

  async obtenerRolDA(rol: string) {
    try {
      const query = 'SELECT * FROM "paObtenerRol"($1)';
      const { rows } = await pool.query(query, [rol]);
      return rows[0].rol;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al obtener rol:", error.message);
      } else {
        console.error("Error al obtener rol:", error);
      }
      throw error;
    }
  }
  async obtenerDatosUserDA(user_id: string) {
    try {
      const query = 'SELECT * FROM "paObtenerDatosUsuario"($1)';
      const { rows } = await pool.query(query, [user_id]);
      return rows[0];
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al obtener datos del usuario:", error.message);
      } else {
        console.error("Error al obtener datos del usuario:", error);
      }
      throw error;
    }
  }
}
