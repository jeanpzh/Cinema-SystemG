export class Entrada {
  private Codigo_Entrada: string;
  private Tipo: string;
  private Cantidad: number;
  private Precio: number;
  private Fecha: Date;
  private Hora: number;

  constructor(
    Codigo_Entrada: string,
    Tipo: string,
    Cantidad: number,
    Precio: number,
    Fecha: Date,
    Hora: number
  ) {
    if (!Codigo_Entrada)
      throw new Error("El Código de la función es obligatorio");
    if (!Tipo) throw new Error("El tipo de entrada es obligatorio");
    if (Cantidad <= 0) throw new Error("La cantidad debe ser mayor a 0");
    if (Precio < 0) throw new Error("El precio no puede ser negativo");
    if (!Fecha) throw new Error("La fecha es obligatoria");
    if (!Hora) throw new Error("La hora es obligatoria");

    this.Codigo_Entrada = Codigo_Entrada;
    this.Tipo = Tipo;
    this.Cantidad = Cantidad;
    this.Precio = Precio;
    this.Fecha = Fecha;
    this.Hora = Hora;
  }
  get getCodigo_Entrada() {
    return this.Codigo_Entrada;
  }
  get getTipo() {
    return this.Tipo;
  }
  get getCantidad() {
    return this.Cantidad;
  }
  get getPrecio() {
    return this.Precio;
  }
  get getFecha() {
    return this.Fecha;
  }
  get getHora() {
    return this.Hora;
  }
  set setTipo(Tipo: string) {
    if (!Tipo) throw new Error("El tipo de entrada es obligatorio");
    this.Tipo = Tipo;
  }
  set setCantidad(Cantidad: number) {
    if (Cantidad <= 0) throw new Error("La cantidad debe ser mayor a 0");
    this.Cantidad = Cantidad;
  }
  set setPrecio(Precio: number) {
    if (Precio < 0) throw new Error("El precio no puede ser negativo");
    this.Precio = Precio;
  }
  set setFecha(Fecha: Date) {
    if (!Fecha) throw new Error("La fecha es obligatoria");
    this.Fecha = Fecha;
  }
  set setHora(Hora: number) {
    if (!Hora) throw new Error("La hora es obligatoria");
    this.Hora = Hora;
  }
  public toJSON() {
    return {
      Codigo_Entrada: this.Codigo_Entrada,
      Tipo: this.Tipo,
      Cantidad: this.Cantidad,
      Precio: this.Precio,
      Fecha: this.Fecha,
      Hora: this.Hora,
    };
  }
}
