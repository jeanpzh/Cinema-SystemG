import { Router } from "express";
import {
  añadirPelicula,
  editarPelicula,
  eliminarPelicula,
  obtenerPeliculaPorID,
  obtenerPeliculas,
} from "../controllers/PeliculaController";
const movieRouter = Router();

movieRouter.get("/", obtenerPeliculas);
movieRouter.post("/", añadirPelicula);
movieRouter.get("/:id", obtenerPeliculaPorID);
movieRouter.delete("/:id", eliminarPelicula);
movieRouter.put("/:id", editarPelicula);
export default movieRouter;
