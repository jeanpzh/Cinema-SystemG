import { Pelicula } from "@/constants/table";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
export const getPeliculas = async () => {
  return await axios.get(apiUrl + "/peliculas");
};
export const deletePeliculas = async (id: string) => {
  return await axios.delete(apiUrl + "/peliculas/" + id);
};
export const createPeliculas = async (data: Pelicula) => {
  const dato = await axios.post(apiUrl + "/peliculas", data);
  console.log(dato);
  return dato;
};
export const updatePeliculas = async (id: string, data: Pelicula) => {
  return await axios.put(apiUrl + "/peliculas/" + id, data);
};
