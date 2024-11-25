import { json, Request, Response } from "express";
import { EntradaLN } from "../LN/EntradaLN";

export const obtenerEntradas = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const entradas = await new EntradaLN().obtenerEntradasLN();
    return res.status(200).json(entradas);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
