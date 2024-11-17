// src/dataAccess/trabajadorDA.ts
import pool from "../db/config";
import { Trabajador } from "../models/Trabajador";

export class TrabajadorDA {
  async createTrabajador(trabajador: Trabajador): Promise<any> {
    try {
      const trabajadorAniadido = {
        Codigo_Trabajador: trabajador.codigo_trabajador,
        Correo: trabajador.correo,
        Nombre: trabajador.nombre,
        Username: trabajador.username,
        Password: trabajador.password,
        Telefono: trabajador.telefono,
        Rol: trabajador.rol,
      };

      await pool.query(
        `SELECT "paRegistrarTrabajador"($1, $2, $3, $4, $5, $6, $7)`,
        [
          trabajador.codigo_trabajador,
          trabajador.correo,
          trabajador.nombre,
          trabajador.username,
          trabajador.password,
          trabajador.telefono,
          trabajador.rol,
        ]
      );
      return trabajadorAniadido;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async obtenerTrabajadores(): Promise<Trabajador[] | null> {
    try {
      const result = await pool.query("SELECT * FROM obtener_trabajadores()");
      return result.rows;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async actualizarTrabajador(trabajador: Trabajador): Promise<any> {
    const {
      codigo_trabajador,
      correo,
      nombre,
      username,
      password,
      telefono,
      rol,
    } = trabajador;

    try {
      await pool.query(
        `SELECT "paActualizarTrabajador"($1, $2, $3, $4, $5, $6, $7)`,
        [codigo_trabajador, correo, nombre, username, password, telefono, rol]
      );
      const trabajadorActualizado = {
        Codigo_Trabajador: trabajador.codigo_trabajador,
        Correo: trabajador.correo,
        Nombre: trabajador.nombre,
        Username: trabajador.username,
        Password: trabajador.password,
        Telefono: trabajador.telefono,
        Rol: trabajador.rol,
      };
      return trabajadorActualizado;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async eliminarTrabajador(codigo_trabajador: string): Promise<void> {
    try {
      console.log(codigo_trabajador);
      await pool.query(`SELECT "paEliminarTrabajador"($1)`, [
        codigo_trabajador,
      ]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
