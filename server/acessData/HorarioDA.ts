import Horario from "../models/Horario";
import pool from "../db/config";

class HorarioDA {
  async getHorariosDA(): Promise<Horario[]> {
    try {
      return (await pool.query("CALL ObtenerHorarios()")).rows;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
export default HorarioDA;
