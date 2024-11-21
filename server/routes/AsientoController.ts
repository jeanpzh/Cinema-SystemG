import { Router } from "express";
import { obtenerAsientos } from "../controllers/AsientoController";

const asientoRouter = Router();

asientoRouter.get("/", obtenerAsientos);

export default asientoRouter;
