import { Request, Response } from "express";
import PeliculaLN from "../LN/PeliculaLN";
import Pelicula from "../models/Pelicula";
import { randomUUID } from "crypto";
import { helperImage } from "../middleware/upload";

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
  const Imagen_Pelicula = req.file?.filename || "";

  helperImage(req.file?.path || "", `resize-${req.file?.filename}` || "", 300);

  const pelicula = new Pelicula(
    randomUUID(),
    Nombre_Pelicula,
    Clasificacion,
    Duracion,
    Sinopsis,
    Genero,
    Imagen_Pelicula
  );

  try {
    const peliculaAgregada = await new PeliculaLN().añadirPeliculaLN(pelicula);
    res.status(201).json(peliculaAgregada);
  } catch (error: any) {
    console.error("Error al agregar película:", error);
    if (error.message === "La película ya existe en la base de datos") {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  }
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
  const Imagen_Pelicula = req.file?.filename || "";

  helperImage(req.file?.path || "", `resize-${req.file?.filename}` || "", 300);

  const pelicula = new Pelicula(
    id,
    Nombre_Pelicula,
    Clasificacion,
    Duracion,
    Sinopsis,
    Genero,
    Imagen_Pelicula
  );
  try {
    const peliculaActualizada = await new PeliculaLN().actualizarPeliculaLN(
      pelicula
    );
    if (!peliculaActualizada) {
      res.status(404).json({ mensaje: "Película no encontrada." });
      return;
    }
    res.status(200).json(peliculaActualizada);
  } catch (error: any) {
    console.error("Error al editar película:", error);
    if (error.message === "La película ya existe en la base de datos") {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  }
};
