import { Router } from "express";
import { login, logout, obtenerDatosUser } from "../controllers/AuthController";
import { verifyToken } from "../middleware/authMiddleware";
import { checkWorkerRole } from "../middleware/roleMiddleware";

const loginRouter = Router();

loginRouter.post("/login", login);
loginRouter.get(
  "/dashboard",
  verifyToken,
  checkWorkerRole(["admin", "producto", "pelicula"]),
  obtenerDatosUser
);
loginRouter.post("/logout", logout);

export default loginRouter;
