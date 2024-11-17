// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

// Define la estructura del payload del JWT
export interface UserPayload extends JwtPayload {
  user_id: string;
  role: string;
}

// Middleware para verificar el token JWT
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Verificar la existencia de SECRET_TOKEN
    const secretToken = process.env.SECRET_TOKEN;
    if (!secretToken) {
      throw new Error("SECRET_TOKEN no está configurado");
    }

    // Obtener el token de las cookies
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "No se proporcionó token" });
      return;
    }

    // Verificar el token
    const decoded = verify(token, secretToken) as UserPayload;

    // Agrega el payload a la request
    req.user = {
      user_id: decoded.sub,
      role: decoded.role,
      exp: decoded.exp,
    };

    console.log("Payload del token:", req.user);

    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "SECRET_TOKEN no está configurado") {
        res
          .status(500)
          .json({ message: "Error de configuración del servidor" });
        return;
      }
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Token inválido" });
        return;
      }
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expirado" });
        return;
      }
    }
    res.status(401).json({ message: "No autorizado" });
  }
};
