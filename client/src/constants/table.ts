export interface Pelicula {
  Codigo_Pelicula: string;
  Nombre_Pelicula: string;
  Duracion: string;
  Clasificacion: string;
  Genero: string;
  Sinopsis: string;
}
export interface Producto {
  Codigo_Producto: string;
  Nombre: string;
  Tipo: string;
  Stock: number;
  Precio: number;
  Imagen_Producto: string;
}
export interface Funcion {
  Codigo_Funcion: string;
  Codigo_Pelicula: string;
  Codigo_Sala: string;
  Codigo_Horario: string;
}
interface DetalleCombo {
  Codigo_Producto: string;
  Cantidad: number;
}
export interface Combo {
  Codigo_Combo: string;
  Nombre_Combo: string;
  Descripcion: string;
  Precio: number;
  Imagen_Combo: string;
  Detalles: DetalleCombo[];
}
