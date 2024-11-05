// models.ts

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

// Mock data para las opciones de las peliculas
export const MOCK_OPTIONS_PELICULAS_GENEROS = [
  { value: "Accion", label: "Acción" },
  { value: "Comedia", label: "Comedia" },
  { value: "Drama", label: "Drama" },
  { value: "Terror", label: "Terror" },
  { value: "Ciencia Ficcion", label: "Ciencia Ficción" },
  { value: "Fantasia", label: "Fantasía" },
  { value: "Musical", label: "Musical" },
  { value: "Romance", label: "Romance" },
  { value: "Misterio", label: "Misterio" },
  { value: "Aventura", label: "Aventura" },
];

export const CLASIFICACION_OPTIONS = [
  { value: "A", label: "A" },
  { value: "AA", label: "AA" },
  { value: "B", label: "B" },
  { value: "B15", label: "B15" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
];
