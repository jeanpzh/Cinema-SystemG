import { FuncionDA } from "../acessData/FuncionDA";
import Funcion from "../models/Funcion";
import OpcionesFuncion from "../models/OpcionesFuncion";

class FuncionLN {
  async obtenerFuncionesLN(): Promise<Funcion[]> {
    return await new FuncionDA().obtenerFuncionesDA();
  }

  async añadirFuncionLN(funcion: Funcion): Promise<Funcion> {
    return await new FuncionDA().añadirFuncionDA(funcion);
  }

  async obtenerFuncionIDLN(id: string): Promise<Funcion> {
    return await new FuncionDA().obtenerFuncionPorIDDA(id);
  }

  async actualizarFuncionLN(funcion: Funcion): Promise<void> {
    await new FuncionDA().actualizarFuncionDA(funcion);
  }

  async eliminarFuncionLN(id: string): Promise<void> {
    await new FuncionDA().eliminarFuncionDA(id);
  }
  async obtenerOpcionesLN(): Promise<OpcionesFuncion> {
    return await new FuncionDA().obtenerOpcionesFuncionDA();
  }
}

export default FuncionLN;
