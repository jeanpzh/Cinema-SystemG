import { FieldPacket, RowDataPacket } from "mysql2";
import conn from "../config";
import Funcion from "../models/Funcion";
import Pelicula from "../models/Pelicula";
import OpcionesFuncion from "../models/OpcionesFuncion";
import Sala from "../models/Sala";
import Horario from "../models/Horario";
export class FuncionDA {
  async añadirFuncionDA(funcion: Funcion): Promise<Funcion> {
    try {
      const [fila]: [RowDataPacket[], FieldPacket[]] = await conn
        .promise()
        .execute("CALL paCrearFuncion(?, ?, ?, ?)", [
          funcion.getCodigoFuncion(),
          funcion.getCodigoPelicula(),
          funcion.getCodigoSala(),
          funcion.getCodigoHorario(),
        ]);
      return fila[0] as Funcion;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async obtenerFuncionPorIDDA(id: string): Promise<Funcion> {
    try {
      const [filas]: [RowDataPacket[], FieldPacket[]] = await conn
        .promise()
        .execute("CALL paObtenerFuncionPorID(?)", [id]);
      return filas[0] as Funcion;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async obtenerFuncionesDA(): Promise<Funcion[]> {
    try {
      const [filas]: [RowDataPacket[], FieldPacket[]] = await conn
        .promise()
        .execute("CALL ObtenerFunciones");
      return filas[0] as Funcion[];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async actualizarFuncionDA(funcion: Funcion): Promise<void> {
    try {
      await conn
        .promise()
        .execute("CALL paActualizarFuncion(?, ?, ?, ?, ?)", [
          funcion.getCodigoFuncion(),
          funcion.getCodigoPelicula(),
          funcion.getCodigoSala(),
          funcion.getCodigoHorario(),
        ]);
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async eliminarFuncionDA(id: string): Promise<void> {
    try {
      await conn.promise().execute("CALL paEliminarFuncion(?)", [id]);
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }
  async obtenerOpcionesFuncionDA(): Promise<any> {
    try {
      const [result]: [RowDataPacket[][], FieldPacket[]] = await conn
        .promise()
        .execute("CALL obtenerDetallesFuncion()");

      console.log("Resultados del procedimiento almacenado:", result);

      return new OpcionesFuncion(
        result[0] as Pelicula[],
        result[1] as Sala[],
        result[2] as Horario[]
      );
    } catch (error) {
      console.error("Error ejecutando el procedimiento almacenado:", error);
      throw error;
    }
  }
}
