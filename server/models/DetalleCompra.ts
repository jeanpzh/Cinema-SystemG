export class DetalleCompra {
  private Codigo_Reporte_Compra: string;
  private Cantidad: number;
  private Codigo_Producto: string;
  private Codigo_Combo: string;
  private Subtotal: number;

  constructor(
    Codigo_Reporte_Compra: string,
    Codigo_Producto: string,
    Codigo_Combo: string,
    Subtotal: number,
    Cantidad: number
  ) {
    this.Codigo_Reporte_Compra = Codigo_Reporte_Compra;
    this.Cantidad = Cantidad;
    this.Codigo_Producto = Codigo_Producto;
    this.Codigo_Combo = Codigo_Combo;
    this.Subtotal = Subtotal;
  }
  public getCodigo_Reporte_Compra(): string {
    return this.Codigo_Reporte_Compra;
  }
  public setCodigo_Reporte_Compra(Codigo_Reporte_Compra: string) {
    this.Codigo_Reporte_Compra = Codigo_Reporte_Compra;
  }

  public getCodigo_Producto(): string {
    return this.Codigo_Producto;
  }
  public setCodigo_Producto(Codigo_Producto: string) {
    this.Codigo_Producto = Codigo_Producto;
  }
  public getCodigo_Combo(): string {
    return this.Codigo_Combo;
  }
  public setCodigo_Combo(Codigo_Combo: string) {
    this.Codigo_Combo = Codigo_Combo;
  }
  public getSubtotal(): number {
    return this.Subtotal;
  }
  public setSubtotal(Subtotal: number) {
    this.Subtotal = Subtotal;
  }
  public getCantidad(): number {
    return this.Cantidad;
  }
  public setCantidad(Cantidad: number) {
    this.Cantidad = Cantidad;
  }
}
