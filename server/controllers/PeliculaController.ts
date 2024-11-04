import { Request, Response } from "express";
import PeliculaLN from "../LN/PeliculaLN";
import Pelicula from "../models/Pelicula";
import { randomUUID } from "crypto";

export const obtenerPeliculas = async (
  req: Request,
  res: Response
): Promise<void> => {
  return new PeliculaLN().obtenerPeliculasLN().then((peliculas) => {
    res.status(200).json(peliculas[0]);
  });
};

export const añadirPelicula = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { Nombre_Pelicula, Clasificacion, Duracion, Sinopsis, Genero } =
    req.body;
  console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);
  console.log(
    "Campos individuales:",
    Nombre_Pelicula,
    Clasificacion,
    Duracion,
    Sinopsis,
    Genero
  );

  if (!Nombre_Pelicula || !Clasificacion || !Duracion || !Sinopsis || !Genero) {
    res.status(400).json({ error: "Todos los campos son requeridos" });
    return;
  }

  const pelicula = new Pelicula(
    randomUUID(),
    Nombre_Pelicula,
    Clasificacion,
    Duracion,
    Sinopsis,
    Genero
  );
  await new PeliculaLN().añadirPeliculaLN(pelicula);
  res.status(201).json(pelicula.getPeliculaId());
};
export const obtenerPeliculaPorID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  return new PeliculaLN().obtenerPeliculaIDLN(id).then((pelicula) => {
    res.status(200).json(pelicula);
  });
};

export const eliminarPelicula = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  res.json({ id });
  return new PeliculaLN().eliminarPeliculaLN(id).then((pelicula) => {
    res.status(200).json(pelicula);
  });
};
