import Pelicula from "../models/Pelicula";
import { pool } from "../db/config";

export class PeliculaDA {
  async obtenerPeliculaPorTituloNormalizado(tituloNormalizado: string) {
    try {
      const result = await pool
        .request()
        .input("p_Titulo_Normalizado", tituloNormalizado)
        .execute("ObtenerPeliculaPorTituloNormalizado");

      return result.recordset[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener la película por título normalizado");
    }
  }

  obtenerPeliculaIDDA = async (id: string): Promise<Pelicula> => {
    try {
      const result = await pool
        .request()
        .input("p_Codigo_Pelicula", id)
        .execute("paObtenerPeliculaPorID");
      return result.recordset[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener la película por ID");
    }
  };

  obtenerPeliculasDA = async (): Promise<Pelicula[]> => {
    try {
      const result = await pool.request().execute("paObtenerPeliculas");
      return result.recordset as Pelicula[];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener las películas");
    }
  };

  añadirPeliculaDA = async (pelicula: Pelicula): Promise<any> => {
    try {
      const tituloNormalizado = pelicula
        .getTitulo()
        .toLowerCase()
        .replace(/\s+/g, "");

      const peliculaExistente = await this.obtenerPeliculaPorTituloNormalizado(
        tituloNormalizado
      );
      if (peliculaExistente)
        throw new Error("La película ya existe en la base de datos");

      await pool
        .request()
        .input("p_Codigo_Pelicula", pelicula.getPeliculaId())
        .input("p_Nombre_Pelicula", pelicula.getTitulo())
        .input("p_Clasificacion", pelicula.getClasificacion())
        .input("p_Duracion", pelicula.getDuracion())
        .input("p_Sinopsis", pelicula.getSinopsis())
        .input("p_Genero", pelicula.getGenero())
        .execute("InsertarPelicula");

      const peliculaAnyadida = await this.obtenerPeliculaIDDA(
        pelicula.getPeliculaId()
      );
      return peliculaAnyadida;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("Error al añadir la película");
    }
  };

  actualizarPeliculaDA = async (pelicula: Pelicula): Promise<any> => {
    try {
      await pool
        .request()
        .input("p_Codigo_Pelicula", pelicula.getPeliculaId())
        .input("p_Nombre_Pelicula", pelicula.getTitulo())
        .input("p_Clasificacion", pelicula.getClasificacion())
        .input("p_Duracion", pelicula.getDuracion())
        .input("p_Sinopsis", pelicula.getSinopsis())
        .input("p_Genero", pelicula.getGenero())
        .execute("paActualizarPelicula");

      return await this.obtenerPeliculaIDDA(pelicula.getPeliculaId());
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al actualizar la película");
    }
  };

  eliminarPeliculaDA = async (id: string): Promise<void> => {
    try {
      await pool
        .request()
        .input("p_Codigo_Pelicula", id)
        .execute("paEliminarPelicula");
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al eliminar la película");
    }
  };
}
