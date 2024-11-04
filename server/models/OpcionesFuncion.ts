import Pelicula from "./Pelicula";
import Sala from "./Sala";
import Horario from "./Horario";
class OpcionesFuncion {
  private peliculas: Pelicula[];
  private salas: Sala[];
  private horarios: Horario[];

  constructor(peliculas: Pelicula[], salas: Sala[], horarios: Horario[]) {
    this.peliculas = peliculas;
    this.salas = salas;
    this.horarios = horarios;
  }

  getPeliculas(): Pelicula[] {
    return this.peliculas;
  }
  setPeliculas(peliculas: Pelicula[]) {
    this.peliculas = peliculas;
  }
  setSalas(salas: Sala[]) {
    this.salas = salas;
  }
  setHorarios(horarios: Horario[]) {
    this.horarios = horarios;
  }

  getSalas(): Sala[] {
    return this.salas;
  }
  getHorarios(): Horario[] {
    return this.horarios;
  }
}
export default OpcionesFuncion;
