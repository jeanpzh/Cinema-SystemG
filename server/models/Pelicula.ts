// models/Pelicula.ts
export default class Pelicula {
  private Codigo_Pelicula: string;
  private Nombre_Pelicula: string;
  private Clasificacion: string;
  private Duracion: number;
  private Sinopsis: string;
  private Genero: string;
  private Imagen_Pelicula: string;

  constructor(
    Codigo_Pelicula: string,
    Nombre_Pelicula: string,
    Clasificacion: string,
    Duracion: number,
    Sinopsis: string,
    Genero: string,
    Imagen_Pelicula: string
  ) {
    this.Codigo_Pelicula = Codigo_Pelicula;
    this.Nombre_Pelicula = Nombre_Pelicula;
    this.Clasificacion = Clasificacion;
    this.Duracion = Duracion;
    this.Sinopsis = Sinopsis;
    this.Genero = Genero;
    this.Imagen_Pelicula = Imagen_Pelicula;
  }

  getPeliculaId(): string {
    return this.Codigo_Pelicula;
  }

  getTitulo(): string {
    return this.Nombre_Pelicula;
  }

  getClasificacion(): string {
    return this.Clasificacion;
  }

  getDuracion(): number {
    return this.Duracion;
  }

  getSinopsis(): string {
    return this.Sinopsis;
  }

  getGenero(): string {
    return this.Genero;
  }
  getImagen(): string {
    return this.Imagen_Pelicula;
  }
}
