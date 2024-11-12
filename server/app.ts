import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import movieRouter from "./routes/PeliculaRoutes";
import funcionRouter from "./routes/FuncionRoutes";
import authRouter from "./routes/AuthRoutes";
import productRouter from "./routes/PoductRoutes";
import comboRouter from "./routes/ComboRoutes";
import multer from "multer";
import { randomUUID } from "crypto";
import path from "path";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use("/peliculas", movieRouter);
app.use("/funcion", funcionRouter);
app.use("/auth", authRouter);
app.use("/productos", productRouter);
app.use("/combos", comboRouter);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});
