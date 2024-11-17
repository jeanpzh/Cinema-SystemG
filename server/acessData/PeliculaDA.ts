// src/da/PeliculaDA.ts
import Pelicula from "../models/Pelicula";
import pool from "../db/config";

interface DuplicateCheck {
  pelicula: Pelicula;
  Codigo_Pelicula: string;
}

export class PeliculaDA {
  /**
   * Comprueba si ya existe una película con el mismo título normalizado.
   * @param tituloNormalizado Título de la película normalizado.
   * @param peliculaId ID de la película a actualizar.
   */
  async evitarDuplicados(tituloNormalizado: string, peliculaId?: string) {
    const pelicula = await this.obtenerPeliculaPorTituloNormalizado(
      tituloNormalizado
    );
    if (pelicula && pelicula.Codigo_Pelicula !== peliculaId) {
      throw new Error("Ya existe una película con el mismo título");
    }
  }

  /**
   * Obtiene una película por su título normalizado.
   * @param tituloNormalizado Título de la película normalizado.
   * @returns La película encontrada o null si no existe.
   */
  async obtenerPeliculaPorTituloNormalizado(
    tituloNormalizado: string
  ): Promise<DuplicateCheck | null> {
    try {
      const query = 'SELECT * FROM "ObtenerPeliculaPorTituloNormalizado"($1)';
      const values = [tituloNormalizado];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0] as DuplicateCheck;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener la película por título normalizado");
    }
  }

  /**
   * Obtiene una película por su ID.
   * @param id ID de la película.
   * @returns La película encontrada o null si no existe.
   */
  async obtenerPeliculaIDDA(id: string): Promise<Pelicula | null> {
    try {
      const query = 'SELECT * FROM "paObtenerPeliculaPorID"($1)';
      const values = [id];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener la película por ID");
    }
  }

  /**
   * Obtiene todas las películas.
   * @returns Un array de películas.
   */
  async obtenerPeliculasDA(): Promise<Pelicula[]> {
    try {
      const query = 'SELECT * FROM "paObtenerPeliculas"()';
      const result = await pool.query(query);

      return result.rows as Pelicula[];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener las películas");
    }
  }

  /**
   * Añade una nueva película a la base de datos.
   * @param pelicula Objeto Pelicula a añadir.
   * @returns La película añadida.
   */
  async añadirPeliculaDA(pelicula: Pelicula): Promise<Pelicula> {
    try {
      const tituloNormalizado = pelicula
        .getTitulo()
        .toLowerCase()
        .replace(/\s+/g, "");

      await this.evitarDuplicados(tituloNormalizado);

      const insertarPeliculaQuery = `
        SELECT "InsertarPelicula"($1, $2, $3, $4, $5, $6)
      `;
      const insertarValues = [
        pelicula.getPeliculaId(),
        pelicula.getTitulo(),
        pelicula.getClasificacion(),
        pelicula.getDuracion(),
        pelicula.getSinopsis(),
        pelicula.getGenero(),
      ];

      await pool.query(insertarPeliculaQuery, insertarValues);

      const peliculaAnyadida = await this.obtenerPeliculaIDDA(
        pelicula.getPeliculaId()
      );
      if (!peliculaAnyadida) {
        throw new Error("Error al obtener la película recién añadida");
      }

      return peliculaAnyadida;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("Error al añadir la película");
    }
  }

  /**
   * Actualiza una película existente en la base de datos.
   * @param pelicula Objeto Pelicula con los datos actualizados.
   * @returns La película actualizada o null si no se encontró.
   */
  async actualizarPeliculaDA(pelicula: Pelicula): Promise<Pelicula | null> {
    try {
      const tituloNormalizado = pelicula
        .getTitulo()
        .toLowerCase()
        .replace(/\s+/g, "");

      await this.evitarDuplicados(tituloNormalizado, pelicula.getPeliculaId());

      const actualizarPeliculaQuery = `
        SELECT "paActualizarPelicula"($1, $2, $3, $4, $5, $6)
      `;
      const actualizarValues = [
        pelicula.getPeliculaId(),
        pelicula.getTitulo(),
        pelicula.getClasificacion(),
        pelicula.getDuracion(),
        pelicula.getSinopsis(),
        pelicula.getGenero(),
      ];

      await pool.query(actualizarPeliculaQuery, actualizarValues);

      const peliculaActualizada = await this.obtenerPeliculaIDDA(
        pelicula.getPeliculaId()
      );

      return peliculaActualizada;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al actualizar la película");
    }
  }

  /**
   * Elimina una película de la base de datos por su ID.
   * @param id ID de la película a eliminar.
   */
  async eliminarPeliculaDA(id: string): Promise<void> {
    try {
      const eliminarPeliculaQuery = `
        SELECT "paEliminarPelicula"($1)
      `;
      const eliminarValues = [id];

      await pool.query(eliminarPeliculaQuery, eliminarValues);
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al eliminar la película");
    }
  }
}
