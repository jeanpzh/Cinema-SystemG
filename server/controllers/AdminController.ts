import { z } from "zod";
import { Request, Response } from "express";
import { Admin } from "../models/Admin";
import { randomUUID } from "crypto";
import { hashearPassword } from "../utils/passwordValidation";
import { AuthLN } from "../LN/AuthLN";
import { AdminLN } from "../LN/AdminLN";

// Esquema para validar los datos del administrador
const adminSchema = z.object({
  Codigo_Admin: z.string(),
  Nombre: z.string(),
  Username: z.string().max(50),
  Password: z.string().min(6),
  Telefono: z.string().max(10),
  Correo: z.string().email(),
});

// Registrar un nuevo administrador

export const crearAdmin = async (req: Request, res: Response): Promise<any> => {
  const validation = adminSchema.safeParse(req.body);

  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

  const adminValidation = await new AuthLN().loginLN({
    username: validation.data.Username,
    password: validation.data.Password,
  });

  if (adminValidation)
    return res.status(400).json({ error: "El usuario ya existe" });

  const hashedPassword = hashearPassword(validation.data.Password);

  const admin = new Admin(
    randomUUID(),
    validation.data.Nombre,
    validation.data.Username,
    hashedPassword,
    validation.data.Telefono,
    validation.data.Correo
  );
  try {
    const adminData = await new AdminLN().crearAdminLN(admin);
    res.status(200).json(adminData);
  } catch (error: any) {
    if (error.message.includes("llave duplicada")) {
      return res.status(500).json({ message: "El administrador ya existe" });
    } else if (typeof error === "string") {
      return res.status(500).json({ error });
    }
  }
};
