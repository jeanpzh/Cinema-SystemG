import { randomUUID } from "crypto";
import { PreguntasFrecuentesLN } from "../LN/PreguntasFrecuentesLN";
import { Request, Response } from "express";

export const obtenerPF = async (req: Request, res: Response): Promise<any> => {
  try {
    const preguntasFrecuentes =
      await new PreguntasFrecuentesLN().obtenerPreguntasFrecuentesLN();
    res.json(preguntasFrecuentes);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al obtener preguntas frecuentes:", error.message);
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
export const crearPF = async (req: Request, res: Response): Promise<any> => {
  try {
    const { pregunta, respuesta } = req.body;
    await new PreguntasFrecuentesLN().crearPreguntaFrecuenteLN(
      randomUUID(),
      pregunta,
      respuesta
    );
    res.json({ message: "Pregunta frecuente creada exitosamente" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear pregunta frecuente:", error.message);
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
export const eliminarPF = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    await new PreguntasFrecuentesLN().eliminarPreguntaFrecuenteLN(id);
    res.json({ message: "Pregunta frecuente eliminada exitosamente" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al eliminar pregunta frecuente:", error.message);
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
