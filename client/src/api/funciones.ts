import { Funcion } from "@/constants/table";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getFunciones = async () => {
  try {
    return await axios.get(apiUrl + "/funcion");
  } catch (error) {
    console.error(error);
  }
};
export const createFuncion = async (data: Funcion) => {
  try {
    const response = await axios.post(apiUrl + "/funcion", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateFuncion = async (id: string, data: Funcion) => {
  try {
    const response = await axios.put(apiUrl + `/funcion/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteFuncion = async (id: string) => {
  try {
    const response = await axios.delete(apiUrl + `/funcion/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const obtenerOpciones = async () => {
  try {
    return (await axios.get(apiUrl + "/funcion/opciones")).data;
  } catch (error) {
    console.error(error);
  }
};
