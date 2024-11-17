import { z } from "zod";
import { Request, Response } from "express";
import { AdminLN } from "../LN/AdminLN";
import { AuthLN } from "../LN/AuthLN";
import { compararPassword } from "../utils/passwordValidation";
import { sign } from "jsonwebtoken";

// Interface para definir los campos que serán enviados en la respuesta por cookie
interface CookieData {
  user_id: string;
  rol: string;
}

// Esquema para validar los datos del login del administrador
const LoginSchema = z.object({
  username: z.string().max(50),
  password: z.string().min(6),
});

// Generar token con JWT

const generateToken = (data: CookieData): string => {
  const payload = {
    sub: data.user_id, // El id del usuario
    role: data.rol, // El rol del usuario
    iat: Math.floor(Date.now() / 1000), // Tiempo de emision
  };

  const token = sign(payload, process.env.SECRET_TOKEN as string, {
    // Expira en 20 minutos
    expiresIn: "20m",
  });
  return token;
};

// Loguearse

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);
    const validation = LoginSchema.safeParse(req.body);
    console.log(validation);
    if (!validation.success)
      return res.status(400).json({ errors: validation.error.errors });

    const data = validation.data;

    const user = await new AuthLN().loginLN(data);
    if (!user)
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos" });

    const { user_id, password_hash } = user;

    const passwordMatch = compararPassword(data.password, password_hash);
    if (!passwordMatch)
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos" });

    const rol = await new AdminLN().obtenerRolLN(user_id);

    if (!rol) return res.status(400).json({ error: "Rol no encontrado" });

    const token = generateToken({ user_id, rol });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      // Expira en 20 minutos
      maxAge: 20 * 60 * 1000,
    });

    res.json({ message: "Login exitoso" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al loguear admin:", error.message);
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export const obtenerDatosUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sub = req.user.user_id;
    const rol = req.user.role;
    const user = await new AuthLN().obtenerDatosUserLN(sub);

    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    res.json({ user, rol, exp: req.user.exp });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al obtener datos del usuario:", error.message);
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  console.log("Logout exitoso");
  res.json({ message: "Logout exitoso" });
};
