import { randomUUID } from "crypto";
import pool from "../db/config";
import { Voucher_Pago } from "../models/Voucher_Pago";

export class PagoDA {
  async insertarReporteCompra(
    codigoReporteCompra: string,
    cantidadTotal: number,
    pagoTotal: number,
    codigoCliente: string
  ) {
    try {
      const query = `
          INSERT INTO reporte_compra (
            "Codigo_Reporte_Compra", "Cantidad_Total", "Pago_Total", "Codigo_Cliente"
          ) VALUES ($1, $2, $3, $4)
        `;
      await pool.query(query, [
        codigoReporteCompra,
        cantidadTotal,
        pagoTotal,
        codigoCliente,
      ]);
    } catch (error) {
      this.rollbackTransaccion();
      throw error;
    }
  }
  async insertarDetallesCompra(
    detalles: {
      Codigo_Producto: string;
      Codigo_Reporte_Compra: string;
      Cantidad: number;
      Subtotal: number;
      Codigo_Combo: string;
    }[]
  ) {
    try {
      const query = `
          INSERT INTO detalle_compra (
          "Codigo_Detalle_Compra",
            "Codigo_Producto", "Codigo_Reporte_Compra", "Cantidad", "Subtotal", "Codigo_Combo"
          ) VALUES ($1, $2, $3, $4, $5 , $6)
        `;
      for (const detalle of detalles) {
        await pool.query(query, [
          randomUUID(),
          detalle.Codigo_Producto,
          detalle.Codigo_Reporte_Compra,
          detalle.Cantidad,
          detalle.Subtotal,
          detalle.Codigo_Combo,
        ]);
      }
    } catch (error) {
      this.rollbackTransaccion();
      throw error;
    }
  }
  async insertarReporteBoleto(
    codigoReporteBoleto: string,
    codigoFuncion: string,
    total: number,
    codigoCliente: string
  ) {
    try {
      const query = `
          INSERT INTO reporte_boletos (
            "Codigo_Reporte_Boleto", "Codigo_Funcion", "Total", "Codigo_Cliente"
          ) VALUES ($1, $2, $3, $4)
        `;
      await pool.query(query, [
        codigoReporteBoleto,
        codigoFuncion,
        total,
        codigoCliente,
      ]);
    } catch (error) {
      this.rollbackTransaccion();
      throw error;
    }
  }
  async generar_voucher(voucher: Voucher_Pago) {
    try {
      const query = `
          INSERT INTO voucher_pago (
            "Codigo_Voucher_Pago", "Codigo_Reporte_Boleto", "Codigo_Reporte_Compra", "Metodo_de_Pago", "Monto", "Codigo_Cliente"
          ) VALUES ($1, $2, $3, $4, $5, $6)
        `;
      await pool.query(query, [
        voucher.getCodigo_Voucher_Pago(),
        voucher.getCodigo_Reporte_Boleto(),
        voucher.getCodigo_Reporte_Compra(),
        voucher.getFormaPago(),
        voucher.getMonto(),
        voucher.getCodigo_Cliente(),
      ]);
    } catch (error) {
      this.rollbackTransaccion();
      throw error;
    }
  }
  async actualizarEstadoAsiento(Codigo_Asiento: string, Estado: string) {
    try {
      const query = `
          UPDATE asiento
          SET "Estado" = $2
          WHERE "Codigo_Asiento" = $1
        `;
      const res = await pool.query(query, [Codigo_Asiento, Estado]);
      console.log(res);
    } catch (error) {
      this.rollbackTransaccion();
      throw error;
    }
  }
  async iniciarTransaccion() {
    await pool.query("BEGIN");
  }

  async confirmarTransaccion() {
    await pool.query("COMMIT");
  }

  async rollbackTransaccion() {
    await pool.query("ROLLBACK");
  }
}
