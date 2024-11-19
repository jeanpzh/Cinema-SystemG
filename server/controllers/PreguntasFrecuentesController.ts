import { randomUUID } from "crypto";
import { PreguntasFrecuentesLN } from "../LN/PreguntasFrecuentesLN";
import { Request, Response } from "express";
import { PreguntasFrecuentes } from "../models/PreguntasFrecuentes";

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
export const crearPF = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pregunta, respuesta } = req.body;

    const preguntaFrecuente = new PreguntasFrecuentes(
      randomUUID(),
      pregunta,
      respuesta
    );

    await new PreguntasFrecuentesLN().crearPreguntaFrecuenteLN(
      randomUUID(),
      pregunta,
      respuesta
    );

    res.status(201).json(preguntaFrecuente);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear pregunta frecuente:", error.message);
      res.status(500).json({
        message: "Error al crear pregunta frecuente",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
export const eliminarPF = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    console.log(req.params);
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
export const actualizarPF = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { pregunta, respuesta } = req.body;

    const preguntaActualizada =
      await new PreguntasFrecuentesLN().actualizarPreguntaFrecuenteLN(
        id,
        pregunta,
        respuesta
      );

    res.status(200).json(preguntaActualizada);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al actualizar pregunta frecuente:", error.message);
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
