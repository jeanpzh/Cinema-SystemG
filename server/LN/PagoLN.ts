import { PagoDA } from "../acessData/PagoDA";
import { Voucher_Pago } from "../models/Voucher_Pago";

export class PagoLN {
  private pagoDA: PagoDA;
  constructor() {
    this.pagoDA = new PagoDA();
  }

  async añadir_reporte_compra(
    codigoReporteCompra: string,
    cantidadTotal: number,
    pagoTotal: number,
    codigoCliente: string
  ) {
    try {
      await this.pagoDA.insertarReporteCompra(
        codigoReporteCompra,
        cantidadTotal,
        pagoTotal,
        codigoCliente
      );
    } catch (error) {
      throw error;
    }
  }
  async añadir_reporte_boleto(
    codigoReporteBoleto: string,
    codigoFuncion: string,
    total: number,
    codigoCliente: string
  ) {
    try {
      await this.pagoDA.insertarReporteBoleto(
        codigoReporteBoleto,
        codigoFuncion,
        total,
        codigoCliente
      );
    } catch (error) {
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
      return await this.pagoDA.insertarDetallesCompra(detalles);
    } catch (error) {
      throw error;
    }
  }

  async generar_voucher(voucher: Voucher_Pago) {
    try {
      return await this.pagoDA.generar_voucher(voucher);
    } catch (error) {
      throw error;
    }
  }

  async actualizarEstadoAsiento(Codigo_Asiento: string, Estado: string) {
    try {
      await this.pagoDA.actualizarEstadoAsiento(Codigo_Asiento, Estado);
    } catch (error) {
      throw error;
    }
  }
}
