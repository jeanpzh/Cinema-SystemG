import { Trabajador } from "@/constants/table";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const obtenerTrabajadores = async () => {
  const res = await axios.get("http://localhost:3000/trabajadores");
  return res;
};
export const createTrabajador = async (trabajador: Trabajador) => {
  const res = await axios.post(apiUrl + "/trabajadores", trabajador);
  return res;
};
export const updateTrabajador = async (id: string, trabajador: Trabajador) => {
  const res = await axios.put(apiUrl + `/trabajadores/${id}`, trabajador);
  console.log(res);
  return res;
};
export const deleteTrabajador = async (id: string) => {
  try {
    const res = await axios.delete(apiUrl + `/trabajadores/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
