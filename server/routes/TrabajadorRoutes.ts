import express from "express";
import {
  actualizarTrabajador,
  eliminarTrabajador,
  obtenerTrabajadores,
  registerTrabajador,
} from "../controllers/TrabajadorController";
const TrabajadorRouter = express.Router();

TrabajadorRouter.post("/trabajadores", async (req, res, next) => {
  try {
    await registerTrabajador(req, res);
  } catch (error) {
    next(error);
  }
});

TrabajadorRouter.get("/trabajadores", async (req, res, next) => {
  try {
    await obtenerTrabajadores(req, res);
  } catch (error) {
    next(error);
  }
});
TrabajadorRouter.put("/trabajadores/:id", async (req, res, next) => {
  try {
    await actualizarTrabajador(req, res);
  } catch (error) {
    next(error);
  }
});

TrabajadorRouter.delete("/trabajadores/:id", async (req, res, next) => {
  try {
    await eliminarTrabajador(req, res);
  } catch (error) {
    next(error);
  }
});

export default TrabajadorRouter;
