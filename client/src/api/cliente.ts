import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface Cliente {
  nombre: string;
  correo: string;
  username: string;
  telefono: number;
  password: string;
}

export const create_cliente = async (data: Cliente) => {
  const res = await axios.post(apiUrl + "/cliente", data);
  return res;
};
