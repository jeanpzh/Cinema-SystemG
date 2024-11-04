import { FieldPacket, RowDataPacket } from "mysql2";
import Sala from "../models/Sala";
import conn from "../config";

class SalaDA {
  async obtenerSalasDA(): Promise<Sala[]> {
    try {
      const [filas]: [RowDataPacket[], FieldPacket[]] = await conn
        .promise()
        .execute("CALL paObtenerSalas");
      return filas as Sala[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
export default SalaDA;
