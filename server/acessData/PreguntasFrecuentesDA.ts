import pool from "../db/config";

export class PreguntasFrecuentesDA {
  async obtenerPreguntasFrecuentesDAL() {
    try {
      const query = `SELECT * FROM "paObtenerPFs"()`;

      const { rows } = await pool.query(query);

      return rows;
    } catch (error) {
      throw error;
    }
  }
  async crearPreguntaFrecuenteDA(
    id: string,
    pregunta: string,
    respuesta: string
  ) {
    try {
      const query = `SELECT * FROM "paCrearPF"($1, $2, $3)`;

      return await pool.query(query, [id, pregunta, respuesta]);
    } catch (error) {
      throw error;
    }
  }
  async eliminarPreguntaFrecuenteDA(id: string) {
    try {
      const query = 'SELECT * FROM "paEliminarPFPorID"($1)';

      await pool.query(query, [id]);
    } catch (error) {
      console.error("Error al eliminar pregunta frecuente:", error);
    }
  }
}
