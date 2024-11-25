export class Voucher_Pago {
  private Codigo_Voucher_Pago: string;
  private Codigo_Reporte_Boleto: string | null;
  private Codigo_Reporte_Compra: string | null;
  private formaPago: string;
  private Monto: number;
  private Codigo_Cliente: string;

  constructor(
    Codigo_Voucher_Pago: string,
    Codigo_Reporte_Boleto: string | null,
    Codigo_Reporte_Compra: string | null,
    formaPago: string,
    Monto: number,
    Codigo_Cliente: string
  ) {
    this.Codigo_Voucher_Pago = Codigo_Voucher_Pago;
    this.Codigo_Reporte_Boleto = Codigo_Reporte_Boleto;
    this.Codigo_Reporte_Compra = Codigo_Reporte_Compra;
    this.formaPago = formaPago;
    this.Monto = Monto;
    this.Codigo_Cliente = Codigo_Cliente;
  }

  public getCodigo_Voucher_Pago(): string {
    return this.Codigo_Voucher_Pago;
  }

  public setCodigo_Voucher_Pago(Codigo_Voucher_Pago: string): void {
    this.Codigo_Voucher_Pago = Codigo_Voucher_Pago;
  }

  public getCodigo_Reporte_Boleto() {
    return this.Codigo_Reporte_Boleto;
  }

  public setCodigo_Reporte_Boleto(Codigo_Reporte_Boleto: string): void {
    this.Codigo_Reporte_Boleto = Codigo_Reporte_Boleto;
  }

  public getCodigo_Reporte_Compra() {
    return this.Codigo_Reporte_Compra;
  }

  public setCodigo_Reporte_Compra(Codigo_Reporte_Compra: string): void {
    this.Codigo_Reporte_Compra = Codigo_Reporte_Compra;
  }

  public getFormaPago(): string {
    return this.formaPago;
  }

  public setFormaPago(formaPago: string): void {
    this.formaPago = formaPago;
  }

  public getMonto(): number {
    return this.Monto;
  }

  public setMonto(Monto: number): void {
    this.Monto = Monto;
  }

  public getCodigo_Cliente(): string {
    return this.Codigo_Cliente;
  }

  public setCodigo_Cliente(Codigo_Cliente: string): void {
    this.Codigo_Cliente = Codigo_Cliente;
  }

  public toString(): string {
    return (
      "Codigo_Voucher_Pago: " +
      this.Codigo_Voucher_Pago +
      ", Codigo_Reporte_Boleto: " +
      this.Codigo_Reporte_Boleto +
      ", Codigo_Reporte_Compra: " +
      this.Codigo_Reporte_Compra +
      ", formaPago: " +
      this.formaPago +
      ", Monto: " +
      this.Monto +
      ", Codigo_Cliente: " +
      this.Codigo_Cliente
    );
  }
}
