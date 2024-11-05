import { Router, Request, Response } from "express";

const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => {
  res.send("Login");
});
export default authRouter;
