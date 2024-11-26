import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface Cliente {
  nombre: string;
  correo: string;
  username: string;
  telefono: number;
  password: string;
}

export const create_cliente = async (data: Cliente) => {
  try {
    return await axios.post(apiUrl + "/cliente", data);
  } catch (error) {
    if (error instanceof AxiosError) return error.response;
  }
};
