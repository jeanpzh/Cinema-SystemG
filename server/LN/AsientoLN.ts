import { AsientoDA } from "../acessData/AsientoDA";

export class AsientoLN {
  async obtenerAsientos(idSala : string) {
    try {
      return await new AsientoDA().obtenerAsientos(idSala);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
