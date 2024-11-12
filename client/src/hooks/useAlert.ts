import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import { AlertContextType } from "@/constants/types";
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe ser usado dentro de un AlertProvider");
  }
  return context;
};
