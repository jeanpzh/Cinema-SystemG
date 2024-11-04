import { FieldPacket, RowDataPacket } from "mysql2";
import conn from "../config";
import Pelicula from "../models/Pelicula";

export class PeliculaDA {
  verificarPelicula = async (
    titulo: string,
    año_lanzamiento: Date
  ): Promise<boolean> => {
    try {
      const [filas]: [RowDataPacket[], FieldPacket[]] = await conn
        .promise()
        .execute("CALL verificarPelicula(? , ?)", [titulo, año_lanzamiento]);
      return filas.length > 0;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  };

  obtenerPeliculaIDDA = async (id: string): Promise<Pelicula> => {
    try {
      const [filas]: [RowDataPacket[], FieldPacket[]] = await conn
        .promise()
        .execute("CALL paObtenerPeliculaPorID(?)", [id]);
      return filas[0] as Pelicula;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  };

  obtenerPeliculasDA = async (): Promise<Pelicula[]> => {
    try {
      const [filas]: [RowDataPacket[], FieldPacket[]] = await conn
        .promise()
        .execute("CALL paObtenerPeliculas()");
      return filas as Pelicula[];
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  };

  añadirPeliculaDA = async (pelicula: Pelicula): Promise<Pelicula> => {
    try {
      const [fila]: [RowDataPacket[], FieldPacket[]] = await conn
        .promise()
        .execute("CALL InsertarPelicula(?, ?, ?, ?, ?, ?)", [
          pelicula.getPeliculaId(),
          pelicula.getTitulo(),
          pelicula.getClasificacion(),
          pelicula.getDuracion(),
          pelicula.getSinopsis(),
          pelicula.getGenero(),
        ]);
      return fila[0] as Pelicula;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  };

  actualizarPeliculaDA = async (pelicula: Pelicula): Promise<void> => {
    try {
      await conn
        .promise()
        .execute("CALL paActualizarPelicula(?, ?, ?, ?, ?, ?)", [
          pelicula.getPeliculaId(),
          pelicula.getTitulo(),
          pelicula.getClasificacion(),
          pelicula.getDuracion(),
          pelicula.getSinopsis(),
          pelicula.getGenero(),
        ]);
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  };

  eliminarPeliculaDA = async (id: string): Promise<void> => {
    try {
      await conn.promise().execute("CALL paEliminarPelicula(?)", [id]);
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  };
}
