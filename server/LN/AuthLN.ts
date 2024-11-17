import { AuthDA } from "../acessData/AuthDA";
import { UserLogin } from "../models/UserLogin";

export class AuthLN {
  async loginLN(user: UserLogin) {
    try {
      return await new AuthDA().loginDA(user);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al loguear admin:", error.message);
      }
    }
  }

  async obtenerRolLN(rol: string) {
    try {
      return await new AuthDA().obtenerRolDA(rol);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al obtener rol:", error.message);
      }
    }
  }
  async obtenerDatosUserLN(user_id: string) {
    try {
      return await new AuthDA().obtenerDatosUserDA(user_id);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al obtener datos del usuario:", error.message);
      }
    }
  }
}
