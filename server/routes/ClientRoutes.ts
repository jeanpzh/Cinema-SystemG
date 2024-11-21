import { Router } from "express";
import { registrarCliente } from "../controllers/ClienteController";

const clientRouter = Router();

clientRouter.post("/", registrarCliente);

export default clientRouter;
