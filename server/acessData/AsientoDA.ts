import pool from "../db/config";

export class AsientoDA {
  async obtenerAsientos(idSala: string) {
    try {
      // Obtenemos los asientos mediante query
      const query = 'SELECT * FROM "paObtenerAsientos"($1)';

      // Ejecutamos la query
      const { rows } = await pool.query(query, [idSala]);

      // Retornamos los asientos
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
