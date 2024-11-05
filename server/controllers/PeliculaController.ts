import { Request, Response } from "express";
import PeliculaLN from "../LN/PeliculaLN";
import Pelicula from "../models/Pelicula";
import { randomUUID } from "crypto";

export const obtenerPeliculas = async (
  req: Request,
  res: Response
): Promise<void> => {
  return new PeliculaLN().obtenerPeliculasLN().then((peliculas) => {
    res.status(200).json(peliculas);
  });
};

export const añadirPelicula = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { Nombre_Pelicula, Clasificacion, Duracion, Sinopsis, Genero } =
    req.body;

  const pelicula = new Pelicula(
    randomUUID(),
    Nombre_Pelicula,
    Clasificacion,
    Duracion,
    Sinopsis,
    Genero
  );
  const peliculaAgregada = await new PeliculaLN().añadirPeliculaLN(pelicula);
  res.status(201).json(peliculaAgregada);
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
export const editarPelicula = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { Nombre_Pelicula, Clasificacion, Duracion, Sinopsis, Genero } =
    req.body;

  const pelicula = new Pelicula(
    id,
    Nombre_Pelicula,
    Clasificacion,
    Duracion,
    Sinopsis,
    Genero
  );
  console.log(pelicula);
  return new PeliculaLN().actualizarPeliculaLN(pelicula).then((pelicula) => {
    res.status(200).json(pelicula);
  });
};
