import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // 5 intentos
  message:
    "Demasiados intentos de inicio de sesión desde esta IP, por favor inténtalo de nuevo después de 15 minutos",
});
