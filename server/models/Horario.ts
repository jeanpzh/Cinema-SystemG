export class Horario {
  private codigo_horario: string;
  private hora_inicio: string;
  private hora_fin: string;
  private dia: Date;

  constructor(
    codigo_horario: string,
    hora_inicio: string,
    hora_fin: string,
    dia: Date
  ) {
    this.codigo_horario = codigo_horario;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
    this.dia = dia;
  }

  getCodigoHorario(): string {
    return this.codigo_horario;
  }

  getHoraInicio(): string {
    return this.hora_inicio;
  }

  getHoraFin(): string {
    return this.hora_fin;
  }
  getDia(): Date {
    return this.dia;
  }
}
export default Horario;
