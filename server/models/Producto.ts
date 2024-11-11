// models/Producto.ts
export default class Producto {
  private codigoProducto: string;
  private nombre: string;
  private tipo: string;
  private stock: number;
  private precio: number;
  private imagenProducto: string;

  constructor(
    codigoProducto: string,
    nombre: string,
    tipo: string,
    stock: number,
    precio: number,
    imagenProducto: string
  ) {
    this.codigoProducto = codigoProducto;
    this.nombre = nombre;
    this.tipo = tipo;
    this.stock = stock;
    this.precio = precio;
    this.imagenProducto = imagenProducto;
  }

  getCodigoProducto(): string {
    return this.codigoProducto;
  }

  getNombre(): string {
    return this.nombre;
  }

  getTipo(): string {
    return this.tipo;
  }

  getStock(): number {
    return this.stock;
  }

  getPrecio(): number {
    return this.precio;
  }
  getImagenProducto(): string {
    return this.imagenProducto;
  }
  setImagenProducto(imagenProducto: string) {
    this.imagenProducto = imagenProducto;
  }
}
