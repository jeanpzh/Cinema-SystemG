import Sala from "../models/Sala";
import SalaDA from "../acessData/SalaDA";
class SalaLN {
  async obtenerSalasLN(): Promise<Sala[]> {
    return await new SalaDA().obtenerSalasDA();
  }
}
export default SalaLN;
