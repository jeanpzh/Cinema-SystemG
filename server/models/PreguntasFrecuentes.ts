export class PreguntasFrecuentes {
  private Pregunta: string;
  private Respuesta: string;

  constructor() {
    this.Pregunta = "";
    this.Respuesta = "";
  }

  public getPregunta(): string {
    return this.Pregunta;
  }

  public setPregunta(Pregunta: string): void {
    this.Pregunta = Pregunta;
  }
  public getRespuesta(): string {
    return this.Respuesta;
  }

  public setRespuesta(Respuesta: string): void {
    this.Respuesta = Respuesta;
  }
}
