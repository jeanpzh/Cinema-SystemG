import pool from "../db/config";

export class EntradaDA {
  static async obtenerEntradas() {
    try {
      const query = "SELECT * FROM precios_entradas";
      const entradas = await pool.query(query);
      return entradas.rows;
    } catch (error: any) {
      return { message: error.message };
    }
  }
}
