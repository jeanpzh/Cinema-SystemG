import { Request, Response } from "express";
import { PagoLN } from "../LN/PagoLN";
import { randomUUID } from "crypto";
import Reporte_Compra from "../models/Reporte_Compra";
import Reporte_Boleto from "../models/Reporte_Boleto";
import { Voucher_Pago } from "../models/Voucher_Pago";

export class PagoController {
  private pagoLN: PagoLN;

  constructor() {
    this.pagoLN = new PagoLN();
    this.procesarPago = this.procesarPago.bind(this);
  }

  private crearReporteCompra(
    productos: any[],
    combos: any[],
    clienteId: string
  ): Reporte_Compra | null {
    if (productos.length + combos.length === 0) return null;
    const cantidadTotal =
      productos.reduce((acc, p) => acc + p.Cantidad, 0) +
      combos.reduce((acc, c) => acc + c.Cantidad, 0);

    const total =
      Math.round(
        (productos.reduce((acc, p) => acc + Number(p.Precio), 0) +
          combos.reduce((acc, c) => acc + Number(c.Precio), 0)) *
          100
      ) / 100;

    return new Reporte_Compra(randomUUID(), cantidadTotal, total, clienteId);
  }

  private crearReporteBoleto(
    funcion: any,
    entradas: any[],
    clienteId: string
  ): Reporte_Boleto | null {
    if (!funcion?.Codigo_Funcion) return null;
    const totalEntradas = entradas.reduce(
      (acc, e) => acc + e.cantidad * e.precio,
      0
    );

    return new Reporte_Boleto(
      randomUUID(),
      funcion.Codigo_Funcion,
      totalEntradas,
      clienteId
    );
  }

  private async insertarDetalles(detalles: any[]) {
    if (detalles.length > 0) {
      await this.pagoLN.insertarDetallesCompra(detalles);
    }
  }

  private async generarVoucher(
    reporteBoleto: Reporte_Boleto | null,
    reporteCompra: Reporte_Compra | null,
    formaPago: string,
    total: number,
    clienteId: string
  ): Promise<string> {
    const voucher = new Voucher_Pago(
      randomUUID(),
      reporteBoleto?.getCodigo_Reporte_Boleto() || null,
      reporteCompra?.getCodigo_Reporte_Compra() || null,
      formaPago,
      total,
      clienteId
    );

    await this.pagoLN.generar_voucher(voucher);

    return voucher.getCodigo_Voucher_Pago();
  }

  async procesarPago(req: Request, res: Response): Promise<any> {
    const {
      cliente,
      pelicula,
      funcion,
      butacas,
      entradas,
      productos,
      combos,
      formaPago,
    } = req.body;

    const reporteCompra = this.crearReporteCompra(
      productos,
      combos,
      cliente.user_id
    );
    const reporteBoleto = this.crearReporteBoleto(
      funcion,
      entradas,
      cliente.user_id
    );

    if (!pelicula && productos.length === 0 && combos.length === 0) {
      return res.status(400).json({ message: "No hay productos a comprar." });
    }

    if (reporteCompra) {
      await this.pagoLN.añadir_reporte_compra(
        reporteCompra.getCodigo_Reporte_Compra(),
        reporteCompra.getCantidad_Total(),
        reporteCompra.getPago_Total(),
        reporteCompra.getCodigo_Cliente()
      );

      const detalles = productos
        .map((p: any) => ({
          Codigo_Producto: p.Codigo_Producto,
          Codigo_Reporte_Compra: reporteCompra.getCodigo_Reporte_Compra(),
          Cantidad: p.Cantidad,
          Subtotal: p.Precio * p.Cantidad,
          Codigo_Combo: null,
        }))
        .concat(
          combos.map((c: any) => ({
            Codigo_Producto: null,
            Codigo_Reporte_Compra: reporteCompra.getCodigo_Reporte_Compra(),
            Cantidad: c.Cantidad,
            Subtotal: c.Precio,
            Codigo_Combo: c.Codigo_Combo,
          }))
        );

      await this.insertarDetalles(detalles);
    }

    if (reporteBoleto) {
      await this.pagoLN.añadir_reporte_boleto(
        reporteBoleto.getCodigo_Reporte_Boleto(),
        reporteBoleto.getCodigo_Funcion(),
        reporteBoleto.getTotal(),
        reporteBoleto.getCodigo_Cliente()
      );
    }

    const total =
      productos.reduce((acc: any, p: any) => acc + Number(p.Precio), 0) +
      combos.reduce((acc: any, c: any) => acc + Number(c.Precio), 0) +
      entradas.reduce((acc: any, e: any) => acc + e.cantidad * e.precio, 0);

    const codigoVoucher = await this.generarVoucher(
      reporteBoleto,
      reporteCompra,
      formaPago,
      total,
      cliente.user_id
    );

    if (butacas.length > 0) {
      for (const asiento of butacas) {
        await this.pagoLN.actualizarEstadoAsiento(
          asiento.id_asiento,
          "OCUPADO"
        );
      }
    }

    return res.status(200).json(codigoVoucher);
  }
}
