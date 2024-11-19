import { PreguntasFrecuentesDA } from "../acessData/PreguntasFrecuentesDA";

export class PreguntasFrecuentesLN {
  async obtenerPreguntasFrecuentesLN() {
    try {
      return await new PreguntasFrecuentesDA().obtenerPreguntasFrecuentesDAL();
    } catch (error) {
      throw error;
    }
  }
  async crearPreguntaFrecuenteLN(
    id: string,
    pregunta: string,
    respuesta: string
  ) {
    try {
      await new PreguntasFrecuentesDA().crearPreguntaFrecuenteDA(
        id,
        pregunta,
        respuesta
      );
    } catch (error) {
      throw error;
    }
  }
  async eliminarPreguntaFrecuenteLN(id: string) {
    try {
      await new PreguntasFrecuentesDA().eliminarPreguntaFrecuenteDA(id);
    } catch (error) {
      throw error;
    }
  }
  async actualizarPreguntaFrecuenteLN(
    id: string,
    pregunta: string,
    respuesta: string
  ) {
    try {
      return await new PreguntasFrecuentesDA().actualizarPreguntaFrecuenteDA(
        id,
        pregunta,
        respuesta
      );
    } catch (error) {
      throw error;
    }
  }
}
