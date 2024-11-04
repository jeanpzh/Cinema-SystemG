import { FieldPacket, RowDataPacket } from "mysql2";
import Horario from "../models/Horario";
import conn from "../config";

class HorarioDA {
  async getHorariosDA(): Promise<Horario[]> {
    try {
      const [rows]: [RowDataPacket[], FieldPacket[]] = await conn
        .promise()
        .execute("CALL paObtenerHorarios");
      return rows as Horario[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
export default HorarioDA;
