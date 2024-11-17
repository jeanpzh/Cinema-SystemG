// src/controllers/trabajadorController.ts
import { Request, Response } from "express";
import { TrabajadorLN } from "../LN/TrabajadorLN";
import { z } from "zod";
import { hashearPassword } from "../utils/passwordValidation";
import { randomUUID } from "crypto";
import { Trabajador } from "../models/Trabajador";

// Esquema de validación con Zod
const trabajadorSchema = z.object({
  Codigo_Trabajador: z.string().max(64),
  Correo: z.string().email(),
  Nombre: z.string().max(100),
  Username: z.string().max(50),
  Password: z.string().min(6),
  Telefono: z.string().max(20),
  Rol: z.string().max(50),
});

export const registerTrabajador = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  req.body.Codigo_Trabajador = randomUUID();

  const validation = trabajadorSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }
  const trabajador = validation.data;

  const hashedPassword = hashearPassword(trabajador.Password);

  trabajador.Password = hashedPassword;

  const trabajadorData = new Trabajador(
    trabajador.Codigo_Trabajador,
    trabajador.Correo,
    trabajador.Nombre,
    trabajador.Username,
    trabajador.Password,
    trabajador.Telefono,
    trabajador.Rol
  );

  try {
    const trabajadorAniadido = await new TrabajadorLN().createTrabajadorLN(
      trabajadorData
    );
    res.status(201).json(trabajadorAniadido);
  } catch (error: any) {
    if (error.message.includes("llave duplicada")) {
      res.status(400).json({ message: "El trabajador ya existe" });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
export const obtenerTrabajadores = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const trabajadores = await new TrabajadorLN().obtenerTrabajadoresLN();
    res.json(trabajadores);
  } catch (error: any) {
    console.error("Error al obtener trabajadores:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const actualizarTrabajador = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const validation = trabajadorSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }

  const trabajador = validation.data;

  const data = (await new TrabajadorLN().obtenerTrabajadorPorIdLN(
    trabajador.Codigo_Trabajador
  )) as any;

  if (!data) {
    return res.status(404).json({ message: "Trabajador no encontrado" });
  }
  if (trabajador.Password && trabajador.Password !== data.Password) {
    console.log(trabajador.Password, data.Password);
    trabajador.Password = hashearPassword(trabajador.Password);
  }

  const trabajadorData = new Trabajador(
    trabajador.Codigo_Trabajador,
    trabajador.Correo,
    trabajador.Nombre,
    trabajador.Username,
    trabajador.Password,
    trabajador.Telefono,
    trabajador.Rol
  );
  try {
    const trabajadorActualizado =
      await new TrabajadorLN().actualizarTrabajadorLN(trabajadorData);
    res.status(200).json(trabajadorActualizado);
  } catch (error: any) {
    console.error("Error al actualizar trabajador:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const eliminarTrabajador = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  try {
    await new TrabajadorLN().eliminarTrabajadorLN(id);
    res.status(200).json({ message: "Trabajador eliminado exitosamente" });
  } catch (error: any) {
    console.error("Error al eliminar trabajador:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
