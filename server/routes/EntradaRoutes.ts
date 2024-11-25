import { Router } from "express";
import { obtenerEntradas } from "../controllers/EntradaController";

const entradaRouter = Router();

entradaRouter.get("/", obtenerEntradas);

export default entradaRouter;
