class Reporte_Compra {
  private Codigo_Reporte_Compra: string;
  private Cantidad_Total: number;
  private Pago_Total: number;
  private Codigo_Cliente: string;

  constructor(
    Codigo_Reporte_Compra: string,
    Cantidad_Total: number,
    Pago_Total: number,
    Codigo_Cliente: string
  ) {
    this.Codigo_Reporte_Compra = Codigo_Reporte_Compra;
    this.Cantidad_Total = Cantidad_Total;
    this.Codigo_Cliente = Codigo_Cliente;

    this.Pago_Total = Pago_Total;
    this.Cantidad_Total = Cantidad_Total;
  }
  public getCodigo_Reporte_Compra(): string {
    return this.Codigo_Reporte_Compra;
  }
  public setCodigo_Reporte_Compra(Codigo_Reporte_Compra: string) {
    this.Codigo_Reporte_Compra = Codigo_Reporte_Compra;
  }
  public getCantidad_Total(): number {
    return this.Cantidad_Total;
  }
  public setCantidad_Total(Cantidad_Total: number) {
    this.Cantidad_Total = Cantidad_Total;
  }
  public getCodigo_Cliente(): string {
    return this.Codigo_Cliente;
  }
  public setCodigo_Cliente(Codigo_Cliente: string) {
    this.Codigo_Cliente = Codigo_Cliente;
  }
  public getPago_Total(): number {
    return this.Pago_Total;
  }
  public setPago_Total(Pago_Total: number) {
    this.Pago_Total = Pago_Total;
  }
}
export default Reporte_Compra;
