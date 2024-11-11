export interface PeliculaOpcion {
  Codigo_Pelicula: string;
  Nombre_Pelicula: string;
  Duracion: number;
}

export interface SalaOpcion {
  Codigo_Sala: string;
  Nombre: string;
  Capacidad: number;
}

export interface HorarioOpcion {
  Codigo_Horario: string;
  Hora_Inicio: string;
}

export interface Opciones {
  peliculaOpcion: PeliculaOpcion[];
  salaOpcion: SalaOpcion[];
  horarioOpcion: HorarioOpcion[];
}
export interface ProductoOpcion {
  Codigo_Producto: string;
  Nombre: string;
  Precio : number;
}
