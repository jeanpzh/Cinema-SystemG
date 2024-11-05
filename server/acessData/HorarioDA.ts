import Horario from "../models/Horario";
import { pool } from "../db/config";

class HorarioDA {
  async getHorariosDA(): Promise<Horario[]> {
    try {
      return (await pool.request().execute("paObtenerHorarios")).recordset;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
export default HorarioDA;
