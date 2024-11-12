import { ReactNode } from "react";

export interface ErrorResponse {
  mensaje: string;
}
export interface AlertProviderProps {
  children: ReactNode;
}
export interface AlertContextType {
  showAlert: (message: string) => void;
}
export interface AlertProps {
  message: string;
}