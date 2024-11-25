import { EntradaDA } from "../acessData/EntradaDA";

export class EntradaLN {
  async obtenerEntradasLN() {
    try {
      return await EntradaDA.obtenerEntradas();
    } catch (error: any) {
      return { message: error.message };
    }
  }
}
