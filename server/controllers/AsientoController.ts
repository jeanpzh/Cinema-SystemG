import { Request, Response } from "express";
import { AsientoLN } from "../LN/AsientoLN";

export const obtenerAsientos = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { idSala } = req.query;
    const asientos = await new AsientoLN().obtenerAsientos(idSala as string);
    return res.status(200).json(asientos);
  } catch (error) {
    console.error(error);
    return error;
  }
};
