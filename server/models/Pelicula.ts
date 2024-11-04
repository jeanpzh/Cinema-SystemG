// models/Pelicula.ts
export default class Pelicula {
  private pelicula_id: string;
  private titulo: string;
  private clasificacion: string;
  private duracion: number;
  private sinopsis: string;
  private genero: string;

  constructor(
    pelicula_id: string,
    titulo: string,
    clasificacion: string,
    duracion: number,
    sinopsis: string,
    genero: string
  ) {
    this.pelicula_id = pelicula_id;
    this.titulo = titulo;
    this.clasificacion = clasificacion;
    this.duracion = duracion;
    this.sinopsis = sinopsis;
    this.genero = genero;
  }

  getPeliculaId(): string {
    return this.pelicula_id;
  }

  getTitulo(): string {
    return this.titulo;
  }

  getClasificacion(): string {
    return this.clasificacion;
  }

  getDuracion(): number {
    return this.duracion;
  }

  getSinopsis(): string {
    return this.sinopsis;
  }

  getGenero(): string {
    return this.genero;
  }
}
