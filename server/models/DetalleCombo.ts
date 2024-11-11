 class DetalleCombo {
  private codigo_producto: string;
  private cantidad: number;

  constructor(codigo_producto: string, cantidad: number) {
    this.codigo_producto = codigo_producto;
    this.cantidad = cantidad;
  }

  getCodigoProducto(): string {
    return this.codigo_producto;
  }

  getCantidad(): number {
    return this.cantidad;
  }
}
export default DetalleCombo;
