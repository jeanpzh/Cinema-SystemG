import pool from "../db/config";
import { Cliente } from "../models/Cliente";

export class ClienteDA {
  async registrarClienteDA(cliente: Cliente) {
    try {
      // Query para llamar al P.A.
      const query =
        'SELECT * FROM "paRegistrarCliente"($1, $2 , $3, $4, $5, $6)';

      // Recogemos los valores de la instancia de Cliente
      const values = [
        cliente.getCodigo_Cliente,
        cliente.getNombre,
        cliente.getUsername,
        cliente.getPassword,
        cliente.getTelefono,
        cliente.getCorreo,
      ];
      // Ejecutamos la consulta
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}
