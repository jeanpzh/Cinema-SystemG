import { Request, Response } from "express";
import { z } from "zod";
import { hashearPassword } from "../utils/passwordValidation";
import { Cliente } from "../models/Cliente";
import { randomUUID } from "crypto";
import { ClienteLN } from "../LN/ClienteLN";

const clientSchema = z.object({
  nombre: z.string().min(4, "El nombre es requerido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  correo: z.string().email("El correo no es válido"),
  username: z.string().min(1, "El username es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const clienteHome = (req: Request, res: Response) => {
  res.json({ message: "Bienvenido a la página principal del cliente" });
};

export const registrarCliente = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Extraemos el email y password pasados desde el body (frontend)

  try {
    const { nombre, telefono, correo, username, password } = req.body;

    // Validamos que el email y password no estén vacíos
    const validation = clientSchema.safeParse(req.body);

    // Si la validación falla, retornamos un error 400 con los errores
    if (!validation.success)
      return res.status(400).json({ errors: validation.error.errors });

    // Si la validación es correcta, verificamos que el email no esté registrado, para ello el campo email debe ser único en la base de datos, (try catch se encarga de manejar el error de llave duplicada)

    // Hashear contraseña
    const hashedPassword = hashearPassword(password);

    // Creamos una instancia de Cliente para guardar en la base de datos

    const nuevoCliente = new Cliente(
      randomUUID(),
      correo,
      nombre,
      username,
      hashedPassword,
      telefono
    );

    // Guardar cliente en la base de datos
    await new ClienteLN().registrarClienteLN(nuevoCliente);

    // Retornamos un mensaje de éxito
    return res.status(200).json({ message: "Cliente registrado con éxito" });
  } catch (error) {
    if (error instanceof Error && error.message.includes("llave duplicada")) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    return res
      .status(500)
      .json("Ha ocurrido un error inesperado, por favor intenta nuevamente");
  }
};
