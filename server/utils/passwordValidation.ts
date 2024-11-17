import * as bcrypt from "bcrypt";
// Funcion para hashear la contraseña con bcrypt

export const hashearPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Funcion para comparar la contraseña hasheada con la contraseña ingresada

export const compararPassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

