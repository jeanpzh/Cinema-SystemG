import { Request, Response, NextFunction } from "express";

interface UserRole {
  role: string;
}

interface RequestWithUser extends Request {
  user: UserRole;
}

// Middleware para verificar roles permitidos
export const checkWorkerRole = (allowedRoles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction): any => {
    const userRole = req.user.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
};
export const logUserAction = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  console.log(`User ${req.user.role} accessed ${req.url}`);
  next();
};
