export class PreguntasFrecuentes {
  private id: string;
  private pregunta: string;
  private respuesta: string;

  constructor(id: string, pregunta: string, respuesta: string) {
    this.id = id;
    this.pregunta = pregunta;
    this.respuesta = respuesta;
  }

  public getPregunta(): string {
    return this.pregunta;
  }

  public setPregunta(Pregunta: string): void {
    this.pregunta = Pregunta;
  }
  public getRespuesta(): string {
    return this.respuesta;
  }

  public setRespuesta(Respuesta: string): void {
    this.respuesta = Respuesta;
  }
  public getId(): string {
    return this.id;
  }
  public setId(id: string): void {
    this.id = id;
  }
}
