// apiService.ts
import axios from "axios";

export const obtenerOpciones = async <T>(url: string) => {
  const response = await axios.get<T[]>(`http://localhost:3000/${url}`);
  return response.data;
};

export const obtenerItems = async <T>(url: string) => {
  const response = await axios.get<T[]>(`http://localhost:3000/${url}`);
  return response.data;
};

export const agregarItem = async <T>(item: T, url: string) => {
  const response = await axios.post(`http://localhost:3000/${url}`, item);
  return response.data;
};

export const actualizarItem = async <T>(id: string, item: T) => {
  const response = await axios.put(`http://localhost:3000/movies/${id}`, item);
  return response.data;
};

export const eliminarItem = async (url: string, id: string) => {
  await axios.delete(`http://localhost:3000/${url}/${id}`);
};
