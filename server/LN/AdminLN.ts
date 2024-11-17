import { AdminDA } from "../acessData/AdminDA";
import { Admin, AdminLogin } from "../models/Admin";

export class AdminLN {
  async loginAdminLN(admin: AdminLogin) {
    try {
      return await new AdminDA().loginAdminDA(admin);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al loguear admin:", error.message);
      }
    }
  }
  async crearAdminLN(admin: Admin) {
    try {
      return new AdminDA().crearAdminDA(admin);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear admin:", error.message);
      }
    }
  }
  async obtenerRolLN(rol: string) {
    try {
      return await new AdminDA().obtenerRolDA(rol);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al obtener rol:", error.message);
      }
    }
  }
}
