import { Router } from "express";
import {
  actualizarPF,
  crearPF,
  eliminarPF,
  obtenerPF,
} from "../controllers/PreguntasFrecuentesController";

const PFroutes = Router();

PFroutes.get("/", obtenerPF);
PFroutes.post("/", crearPF);
PFroutes.delete("/:id", eliminarPF);
PFroutes.put("/:id", actualizarPF);

export default PFroutes;
