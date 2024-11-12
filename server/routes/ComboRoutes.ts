import { Router } from "express";
import {
  obtenerCombos,
  añadirCombo,
  obtenerComboPorID,
  eliminarCombo,
  actualizarCombo,
  obtenerOpcionesCombo,
} from "../controllers/ComboController";

const comboRouter = Router();

comboRouter.get("/opciones", obtenerOpcionesCombo);
comboRouter.get("/", obtenerCombos);
comboRouter.post("/", añadirCombo);
comboRouter.get("/:id", obtenerComboPorID);
comboRouter.put("/:id", actualizarCombo);
comboRouter.delete("/:id", eliminarCombo);

export default comboRouter;
