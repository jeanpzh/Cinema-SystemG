export interface Pelicula {
  Codigo_Pelicula: string;
  Nombre_Pelicula: string;
  Clasificacion: string;
  Duracion: number;
  Sinopsis: string;
  Genero: string;
}

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
export interface Funcion {
  Codigo_Funcion?: string;
  Codigo_Pelicula: string;
  Codigo_Sala: string;
  Codigo_Horario: string;
}
export interface Opciones {
  peliculaOpcion: PeliculaOpcion[];
  salaOpcion: SalaOpcion[];
  horarioOpcion: HorarioOpcion[];
}
export interface OpcionElegida extends Funcion {
  Nombre_Pelicula?: string;
  Duracion?: number;
  Hora_Inicio?: string;
  Nombre?: string;
  Capacidad?: number;
}
