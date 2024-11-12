import DetalleCombo from "./DetalleCombo";

export default class Combo {
  private codigo_combo: string;
  private nombre_combo: string;
  private descripcion: string;
  private precio: number;
  private imagen_combo: string;
  private detalles: DetalleCombo[];

  constructor(
    codigo_combo: string,
    nombre_combo: string,
    descripcion: string,
    precio: number,
    imagen_combo: string,
    detalles: DetalleCombo[]
  ) {
    this.codigo_combo = codigo_combo;
    this.nombre_combo = nombre_combo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen_combo = imagen_combo;
    this.detalles = detalles;
  }

  getCodigoCombo(): string {
    return this.codigo_combo;
  }

  getNombreCombo(): string {
    return this.nombre_combo;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  getPrecio(): number {
    return this.precio;
  }

  getImagenCombo(): string {
    return this.imagen_combo;
  }

  getDetalles(): DetalleCombo[] {
    return this.detalles;
  }
}
