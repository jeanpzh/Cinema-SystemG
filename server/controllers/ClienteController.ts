import { Request, Response } from "express";
import { z } from "zod";
import { hashearPassword } from "../utils/passwordValidation";
import { Cliente } from "../models/Cliente";
import { randomUUID } from "crypto";
import { ClienteLN } from "../LN/ClienteLN";

const clientSchema = z.object({
  nombre: z.string().min(4, "El nombre es requerido"),
  telefono: z.number().int().min(1, "El teléfono es requerido"),
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
    console.log(req.body);
    // Validamos que el email y password no estén vacíos
    const validation = clientSchema.safeParse(req.body);
    console.log(validation.error);

    // Si la validación falla, retornamos un error 400 con los errores
    if (!validation.success)
      return res.status(400).json({ errors: validation.error.errors });

    // Si la validación es correcta, verificamos que el email no esté registrado, para ello el campo email debe ser único en la base de datos, (try catch se encarga de manejar el error de llave duplicada)

    // Hashear contraseña
    const hashedPassword = hashearPassword(password);

    // Creamos una instancia de Cliente para guardar en la base de datos

    const nuevoCliente = new Cliente(
      randomUUID(),
      correo.toLowerCase(),
      nombre,
      username,
      hashedPassword,
      telefono
    );

    // Guardar cliente en la base de datos
    await new ClienteLN().registrarClienteLN(nuevoCliente);

    // Retornamos un mensaje de éxito
    return res.status(201).json({ message: "Cliente registrado con éxito" });
  } catch (error: any) {
    console.log(error.length);
    if (error.detail.includes("Correo")) {
      console.log(error);
      return res
        .status(400)
        .json({ mensaje: "Ya existe una cuenta con este correo" });
    } else if (error.detail.includes("Username")) {
      console.log(error);
      return res
        .status(500)
        .json({ mensaje: "Ya existe una cuenta con este username ingresado" });
    } else if (
      error.detail.includes("Correo") &&
      error.detail.includes("Username")
    ) {
      console.log(error);
      return res
        .status(600)
        .json({ mensaje: "Ya existe una cuenta con este correo y username" });
    } else {
      console.log(error);
      return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  }
};
