// models/Funcion.ts
export default class Funcion {
  private codigo_funcion: string;
  private codigo_pelicula: string;
  private codigo_sala: string;
  private codigo_horario: string;

  constructor(
    codigo_funcion: string,
    codigo_pelicula: string,
    codigo_sala: string,
    codigo_horario: string
  ) {
    this.codigo_funcion = codigo_funcion;
    this.codigo_pelicula = codigo_pelicula;
    this.codigo_sala = codigo_sala;
    this.codigo_horario = codigo_horario;
  }

  getCodigoFuncion(): string {
    return this.codigo_funcion;
  }

  getCodigoPelicula(): string {
    return this.codigo_pelicula;
  }

  getCodigoSala(): string {
    return this.codigo_sala;
  }

  getCodigoHorario(): string {
    return this.codigo_horario;
  }
}
