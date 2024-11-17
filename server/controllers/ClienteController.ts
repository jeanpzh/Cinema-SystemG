import { Request, Response } from "express";

export const clienteHome = (req: Request, res: Response) => {
  res.json({ message: "Bienvenido a la página principal del cliente" });
};
