import { TrabajadorDA } from "../acessData/TrabajadorDA";
import { Trabajador } from "../models/Trabajador";

export class TrabajadorLN {
  async createTrabajadorLN(trabajador: Trabajador): Promise<void> {
    return await new TrabajadorDA().createTrabajador(trabajador);
  }
  async obtenerTrabajadoresLN(): Promise<Trabajador[] | null> {
    return await new TrabajadorDA().obtenerTrabajadores();
  }
  async actualizarTrabajadorLN(trabajador: Trabajador): Promise<void> {
    return await new TrabajadorDA().actualizarTrabajador(trabajador);
  }
  async eliminarTrabajadorLN(codigo_trabajador: string): Promise<void> {
    await new TrabajadorDA().eliminarTrabajador(codigo_trabajador);
  }
}
