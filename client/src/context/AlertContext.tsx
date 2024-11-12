// src/context/AlertContext.tsx

import { AlertContextType, AlertProps, AlertProviderProps } from "@/constants/types";
import { createContext, useState } from "react";


// Contexto con un valor predeterminado vacío
// eslint-disable-next-line react-refresh/only-export-components
export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showAlert = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {message && <Alert message={message} />}
    </AlertContext.Provider>
  );
};


const Alert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
};
