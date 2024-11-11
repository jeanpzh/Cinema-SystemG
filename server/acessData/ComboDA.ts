// ComboDA.ts

import pool from "../db/config";
import Combo from "../models/Combo";
import DetalleCombo from "../models/DetalleCombo";

export class ComboDA {
  async añadirComboDA(combo: Combo): Promise<any> {
    try {
      const detalles = combo.getDetalles().map((detalle) => ({
        Codigo_Producto: detalle.getCodigoProducto(),
        Cantidad: detalle.getCantidad(),
      }));

      await pool.query('SELECT "paCrearCombo"($1, $2, $3, $4, $5, $6)', [
        combo.getCodigoCombo(),
        combo.getNombreCombo(),
        combo.getDescripcion(),
        combo.getPrecio(),
        combo.getImagenCombo(), // Almacenar la URL de la imagen
        JSON.stringify(detalles),
      ]);

      const comboAgregado = await this.obtenerComboPorIDDA(
        combo.getCodigoCombo()
      );

      return comboAgregado;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al añadir el combo");
    }
  }

  async obtenerComboPorIDDA(id: string): Promise<any> {
    try {
      const result = await pool.query(
        'SELECT * FROM "paObtenerComboPorID"($1)',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener el combo por ID");
    }
  }

  async obtenerCombosDA(): Promise<any[]> {
    try {
      const result = await pool.query('SELECT * FROM "paObtenerCombos"();');
      return result.rows;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al obtener los combos");
    }
  }

  async actualizarComboDA(combo: Combo): Promise<any> {
    try {
      const detalles = combo.getDetalles().map((detalle) => ({
        Codigo_Producto: detalle.getCodigoProducto(),
        Cantidad: detalle.getCantidad(),
      }));

      await pool.query('SELECT "paActualizarCombo"($1, $2, $3, $4, $5, $6)', [
        combo.getCodigoCombo(),
        combo.getNombreCombo(),
        combo.getDescripcion(),
        combo.getPrecio(),
        combo.getImagenCombo(),
        JSON.stringify(detalles),
      ]);

      const comboActualizado = await this.obtenerComboPorIDDA(
        combo.getCodigoCombo()
      );

      return comboActualizado;
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al actualizar el combo");
    }
  }

  async eliminarComboDA(id: string): Promise<void> {
    try {
      await pool.query('SELECT "paEliminarCombo"($1)', [id]);
    } catch (error) {
      console.error("Error executing query:", error);
      throw new Error("Error al eliminar el combo");
    }
  }

  async obtenerOpcionesComboDA(): Promise<any> {
    try {
      const productosResult = await pool.query(
        'SELECT * FROM "ObtenerProductos"();'
      );

      return {
        productos: productosResult.rows,
      };
    } catch (error) {
      console.error("Error fetching combo options:", error);
      throw new Error("Failed to obtain combo options");
    }
  }
}
