import { ClienteDA } from "../acessData/ClienteDA";
import { Cliente } from "../models/Cliente";

export class ClienteLN {
  registrarClienteLN(cliente: Cliente) {
    try {
      return new ClienteDA().registrarClienteDA(cliente);
    } catch (error) {
      console.log(error);
    }
  }
}
