import Sala from "../models/Sala";
import { pool } from "../db/config";
class SalaDA {
  async obtenerSalasDA(): Promise<Sala[]> {
    try {
      return (await pool.request().execute("paObtenerSalas")).recordset;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
export default SalaDA;
