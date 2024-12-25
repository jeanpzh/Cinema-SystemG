import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import movieRouter from "./routes/PeliculaRoutes";
import funcionRouter from "./routes/FuncionRoutes";
import productRouter from "./routes/PoductRoutes";
import comboRouter from "./routes/ComboRoutes";
import adminRouter from "./routes/AdminRoutes";
import loginRouter from "./routes/AuthRoutes";
import TrabajadorRouter from "./routes/TrabajadorRoutes";
import cookieParser from "cookie-parser";
import { loginLimiter } from "./middleware/rateLimiter";
import PFroutes from "./routes/PreguntasFrecuentesRoutes";
import clientRouter from "./routes/ClientRoutes";
import asientoRouter from "./routes/AsientoController";
import entradaRouter from "./routes/EntradaRoutes";
import comprar_entrada_router from "./routes/ComprarEntradaRoutes";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración de CORS para HTTP ONLY EN LA COOKIE
const corsOptions = {
  origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(express.static("optimize"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use("/", loginLimiter, loginRouter);
app.use("/admin", adminRouter);
app.use("/peliculas", movieRouter);
app.use("/funcion", funcionRouter);
app.use("/productos", productRouter);
app.use("/combos", comboRouter);
app.use("/pf", PFroutes);
app.use("/", TrabajadorRouter);
app.use("/cliente", clientRouter);
app.use("/asientos", asientoRouter);
app.use("/entradas", entradaRouter);
app.use("/comprar-entrada", comprar_entrada_router);
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Algo salió mal!");
  }
);

app.get("/" , (req: Request, res: Response) => {
  res.send("API de Cine");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Servidor local en 3000");
  });
}
export default app;
