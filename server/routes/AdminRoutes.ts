import { Router } from "express";
import { crearAdmin } from "../controllers/AdminController";

const adminRouter = Router();

adminRouter.post("/register", crearAdmin);
export default adminRouter;
