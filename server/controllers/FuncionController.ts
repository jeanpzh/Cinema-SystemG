import { Request, Response } from "express";
import FuncionLN from "../LN/FuncionLN";
import Funcion from "../models/Funcion";
import { randomUUID } from "crypto";

export const obtenerFunciones = async (
  req: Request,
  res: Response
): Promise<void> => {
  return new FuncionLN().obtenerFuncionesLN().then((funciones) => {
    res.status(200).json(funciones);
  });
};

export const añadirFuncion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { Codigo_Pelicula, Codigo_Sala, Codigo_Horario } = req.body;
    const funcion = new Funcion(
      randomUUID(),
      Codigo_Pelicula,
      Codigo_Sala,
      Codigo_Horario
    );
    const funcionAgregada = await new FuncionLN().añadirFuncionLN(funcion);
    res.status(201).json(funcionAgregada);
  } catch (error) {}
};

export const obtenerFuncionPorID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  return new FuncionLN().obtenerFuncionIDLN(id).then((funcion) => {
    res.status(200).json(funcion);
  });
};

export const actualizarFuncion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: string = req.params.id;
  const funcion = new Funcion(
    id,
    req.body.Codigo_Pelicula,
    req.body.Codigo_Sala,
    req.body.Codigo_Horario
  );
  const funcionActualizada = await new FuncionLN().actualizarFuncionLN(funcion);
  res.status(200).json(funcionActualizada);
};

export const eliminarFuncion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  await new FuncionLN().eliminarFuncionLN(id);
  res.status(200).json({ message: "Función eliminada correctamente" });
};

export const obtenerOpcionesFuncion = async (
  _: Request,
  res: Response
): Promise<any> => {
  return new FuncionLN().obtenerOpcionesLN().then((opciones) => {
    res.status(200).json(opciones);
  });
};
