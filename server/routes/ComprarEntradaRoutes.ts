import { Router } from "express";
import { PagoController } from "../controllers/PagoController";

const comprar_entrada_router = Router();

comprar_entrada_router.post("/", new PagoController().procesarPago);

export default comprar_entrada_router;
