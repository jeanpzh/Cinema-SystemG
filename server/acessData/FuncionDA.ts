// src/da/FuncionDA.ts

import pool from "../db/config"; // Asegúrate de que este archivo exporta correctamente el pool de PostgreSQL
import Funcion from "../models/Funcion"; // Asegúrate de que el modelo esté correctamente definido

export class FuncionDA {
  /**
   * Añade una nueva función a la base de datos.
   * @param funcion Objeto Funcion a añadir.
   * @returns La función añadida.
   */
  async añadirFuncionDA(funcion: Funcion): Promise<any> {
    try {
      // Llamar al procedimiento almacenado paCrearFuncion
      await pool.query('SELECT "paCrearFuncion"($1, $2, $3, $4)', [
        funcion.getCodigoFuncion(),
        funcion.getCodigoPelicula(),
        funcion.getCodigoSala(),
        funcion.getCodigoHorario(),
      ]);

      // Obtener todas las funciones
      const funciones = await this.obtenerFuncionesDA();

      // Encontrar la función añadida
      const funcionAgregada = funciones.find(
        (f: any) => f.Codigo_Funcion === funcion.getCodigoFuncion()
      );

      return funcionAgregada;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al añadir la función");
    }
  }

  /**
   * Obtiene una función por su ID.
   * @param id ID de la función.
   * @returns La función encontrada o null si no existe.
   */
  async obtenerFuncionPorIDDA(id: string): Promise<Funcion> {
    try {
      const result = await pool.query(
        "SELECT * FROM paObtenerFuncionPorID($1)",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener la función por ID");
    }
  }

  /**
   * Obtiene todas las funciones.
   * @returns Un array de funciones.
   */
  async obtenerFuncionesDA(): Promise<any[]> {
    try {
      const result = await pool.query('SELECT * FROM "obtenerFunciones"();');
      return result.rows as Funcion[];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener las funciones");
    }
  }

  /**
   * Actualiza una función existente en la base de datos.
   * @param funcion Objeto Funcion con los datos actualizados.
   * @returns La función actualizada o null si no se encontró.
   */
  async actualizarFuncionDA(funcion: Funcion): Promise<any> {
    try {
      // Llamar al procedimiento almacenado paActualizarFuncion
      await pool.query('SELECT "paActualizarFuncion"($1, $2, $3, $4)', [
        funcion.getCodigoFuncion(),
        funcion.getCodigoPelicula(),
        funcion.getCodigoSala(),
        funcion.getCodigoHorario(),
      ]);

      // Obtener todas las funciones
      const funciones = await this.obtenerFuncionesDA();

      // Encontrar la función actualizada
      const funcionActualizada = funciones.find(
        (f: any) => f.Codigo_Funcion === funcion.getCodigoFuncion()
      );

      return funcionActualizada;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al actualizar la función");
    }
  }

  /**
   * Elimina una función de la base de datos por su ID.
   * @param id ID de la función a eliminar.
   */
  async eliminarFuncionDA(id: string): Promise<void> {
    try {
      await pool.query('SELECT "paEliminarFuncion"($1)', [id]);
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al eliminar la función");
    }
  }

  /**
   * Obtiene opciones necesarias para las funciones, como películas, salas y horarios.
   * @returns Un objeto con arrays de películas, salas y horarios.
   */
  async obtenerOpcionesFuncionDA(): Promise<any> {
    try {
      // Realizar consultas separadas para obtener películas, salas y horarios
      const peliculasPromise = pool.query(
        'SELECT * FROM "paObtenerPeliculas"();'
      );
      const salasPromise = pool.query('SELECT * FROM "paObtenerSalas"();');
      const horariosPromise = pool.query(
        'SELECT * FROM "paObtenerHorarios"();'
      );

      // Esperar a que todas las consultas se completen
      const [peliculasResult, salasResult, horariosResult] = await Promise.all([
        peliculasPromise,
        salasPromise,
        horariosPromise,
      ]);

      return {
        peliculas: peliculasResult.rows,
        salas: salasResult.rows,
        horarios: horariosResult.rows,
      };
    } catch (error) {
      console.error("Error fetching function options:", error);
      throw new Error("Failed to obtain function options");
    }
  }
}
