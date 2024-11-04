import { Router } from "express";
import {
  añadirPelicula,
  eliminarPelicula,
  obtenerPeliculaPorID,
  obtenerPeliculas,
} from "../controllers/PeliculaController";
const movieRouter = Router();

movieRouter.get("/", obtenerPeliculas);
movieRouter.post("/", añadirPelicula);
movieRouter.get("/:id", obtenerPeliculaPorID);
movieRouter.delete("/:id", eliminarPelicula);
export default movieRouter;
