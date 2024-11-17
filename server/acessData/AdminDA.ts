import pool from "../db/config";
import { Admin, AdminLogin } from "../models/Admin";

export class AdminDA {
  async loginAdminDA(admin: AdminLogin) {
    try {
      const { username } = admin;

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
  async crearAdminDA(admin: Admin) {
    try {
      const query = 'SELECT * FROM "paCrearAdmin"($1 , $2 , $3 , $4 , $5 , $6)';
      const { rows } = await pool.query(query, [
        admin.getCodigo_Admin(),
        admin.getNombre(),
        admin.getUsername(),
        admin.getPassword(),
        admin.getTelefono(),
        admin.getCorreo(),
      ]);
      return rows[0];
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear admin:", error.message);
      } else {
        console.error("Error al crear admin:", error);
      }
      throw error;
    }
  }
  async obtenerRolDA(rol: string) {
    try {
      const query = 'SELECT * FROM "paObtenerRol"($1)';
      const { rows } = await pool.query(query, [rol]);
      console.log(rows);
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
}
