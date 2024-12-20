import { Router } from "express";
import {
  actualizarFuncion,
  añadirFuncion,
  eliminarFuncion,
  obtenerFuncionPorID,
  obtenerFunciones,
  obtenerOpcionesFuncion,
} from "../controllers/FuncionController";

const funcionRouter = Router();

funcionRouter.get("/opciones", obtenerOpcionesFuncion);
funcionRouter.get("/", obtenerFunciones);
funcionRouter.post("/", añadirFuncion);
funcionRouter.get("/:id", obtenerFuncionPorID);
funcionRouter.delete("/:id", eliminarFuncion);
funcionRouter.put("/:id", actualizarFuncion);

export default funcionRouter;
