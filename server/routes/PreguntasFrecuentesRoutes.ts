import { Router } from "express";
import {
  crearPF,
  eliminarPF,
  obtenerPF,
} from "../controllers/PreguntasFrecuentesController";

const PFroutes = Router();

PFroutes.get("/", obtenerPF);
PFroutes.post("/", crearPF);
PFroutes.delete("/:id", eliminarPF);

export default PFroutes;
