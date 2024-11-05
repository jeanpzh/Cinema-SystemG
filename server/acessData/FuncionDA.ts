import { IRecordSet } from "mssql";
import { pool } from "../db/config";
import Funcion from "../models/Funcion";

export class FuncionDA {
  async añadirFuncionDA(funcion: Funcion): Promise<any> {
    try {
      await pool
        .request()
        .input("p_Codigo_Funcion", funcion.getCodigoFuncion())
        .input("p_Codigo_Pelicula", funcion.getCodigoPelicula())
        .input("p_Codigo_Sala", funcion.getCodigoSala())
        .input("p_Codigo_Horario", funcion.getCodigoHorario())
        .execute("paCrearFuncion");

      const funciones = await this.obtenerFuncionesDA();
      const funcionAnyadida = await funciones.find(
        (f: any) => f.Codigo_Funcion === funcion.getCodigoFuncion()
      );
      return funcionAnyadida;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async obtenerFuncionPorIDDA(id: string): Promise<Funcion> {
    try {
      const result = await pool
        .request()
        .input("p_Codigo_Funcion", id)
        .execute("paObtenerFuncionPorID");
      return result.recordset[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async obtenerFuncionesDA(): Promise<any> {
    try {
      const result = await pool.request().execute("obtenerFunciones");
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  async actualizarFuncionDA(funcion: Funcion): Promise<any> {
    try {
      await pool
        .request()
        .input("p_Codigo_Funcion", funcion.getCodigoFuncion())
        .input("p_Codigo_Pelicula", funcion.getCodigoPelicula())
        .input("p_Codigo_Sala", funcion.getCodigoSala())
        .input("p_Codigo_Horario", funcion.getCodigoHorario())
        .execute("paActualizarFuncion");
      const funciones = await this.obtenerFuncionesDA();
      const funcionActualizada = funciones.find(
        (f: any) => f.Codigo_Funcion === funcion.getCodigoFuncion()
      );

      return funcionActualizada;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async eliminarFuncionDA(id: string): Promise<void> {
    try {
      await pool
        .request()
        .input("p_Codigo_Funcion", id)
        .execute("paEliminarFuncion");
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }
  async obtenerOpcionesFuncionDA(): Promise<any> {
    try {
      const result = await pool.request().execute("ObtenerDetallesFuncion");
      const recordsets = result.recordsets as IRecordSet<any>[];
      const [peliculas, salas, horarios] = recordsets;
      return {
        peliculas,
        salas,
        horarios,
      };
    } catch (error) {
      console.error("Error fetching function options:", error);
      throw new Error("Failed to obtain function options");
    }
  }
}
