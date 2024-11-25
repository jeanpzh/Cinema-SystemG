import { Router } from "express";
import {
  añadirPelicula,
  editarPelicula,
  eliminarPelicula,
  obtenerPeliculaPorID,
  obtenerPeliculas,
} from "../controllers/PeliculaController";
import upload from "../middleware/upload";
const movieRouter = Router();

movieRouter.get("/", obtenerPeliculas);
movieRouter.post("/", upload.single("Imagen_Pelicula"), añadirPelicula);
movieRouter.get("/:id", obtenerPeliculaPorID);
movieRouter.delete("/:id", eliminarPelicula);
movieRouter.put("/:id", upload.single("Imagen_Pelicula"), editarPelicula);
export default movieRouter;
