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
  return await axios.post(apiUrl + "/peliculas", data);
};
export const updatePeliculas = async (id: string, data: Pelicula) => {
  return await axios.put(apiUrl + "/peliculas/" + id, data);
};
