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
  const { Codigo_Pelicula, Codigo_Sala, Codigo_Horario } = req.body;
  console.log(req.body);
  if (!Codigo_Pelicula || !Codigo_Sala || !Codigo_Horario) {
    res.status(400).json({ error: "Todos los campos son requeridos" });
    return;
  }

  const funcion = new Funcion(
    randomUUID(),
    Codigo_Pelicula,
    Codigo_Sala,
    Codigo_Horario
  );
  await new FuncionLN().añadirFuncionLN(funcion);
  res.status(201).json(funcion.getCodigoFuncion());
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
  const {
    Codigo_Funcion,
    Codigo_Pelicula,
    Codigo_Sala,
    Codigo_Horario,
    Codigo_Trabajador,
  } = req.body;
  console.log(req.body);
  if (
    !Codigo_Funcion ||
    !Codigo_Pelicula ||
    !Codigo_Sala ||
    !Codigo_Horario ||
    !Codigo_Trabajador
  ) {
    res.status(400).json({ error: "Todos los campos son requeridos" });
    return;
  }

  const funcion = new Funcion(
    Codigo_Funcion,
    Codigo_Pelicula,
    Codigo_Sala,
    Codigo_Horario
  );
  await new FuncionLN().actualizarFuncionLN(funcion);
  res.status(200).json({ message: "Función actualizada correctamente" });
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
): Promise<void> => {
  return new FuncionLN().obtenerOpcionesLN().then((opciones) => {
    res.status(200).json(opciones);
  });
};
