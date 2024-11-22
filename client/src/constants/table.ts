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
export interface DetalleCombo {
  Codigo_Producto: string;
  Nombre_Producto?: string;
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
// Define un tipo para los Detalles enriquecidos
export interface DetalleEnriquecido extends DetalleCombo {
  Nombre_Producto: string;
}

// Define un tipo para los Combos enriquecidos
export interface ComboEnriquecido extends Omit<Combo, "Detalles"> {
  Detalles: DetalleEnriquecido[];
}

export interface Trabajador {
  Codigo_Trabajador: string;
  Correo: string;
  Nombre: string;
  Username: string;
  Password: string;
  Telefono: string;
  Rol: string;
}

export interface PreguntaFrecuente {
  id: string;
  pregunta: string;
  respuesta: string;
}

export interface Asiento {
  Codigo_Asiento: string;
  Codigo_Sala: string;
  Fila: string;
  Numero: string;
  Disponible: boolean;
}
