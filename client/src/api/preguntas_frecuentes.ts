import { PreguntaFrecuente } from "@/constants/table";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getPreguntasFrecuentes = async () => {
  return await axios.get(apiUrl + "/pf");
};
export const deletePreguntasFrecuentes = async (id: string) => {
  return await axios.delete(apiUrl + "/pf/" + id);
};
export const createPreguntasFrecuentes = async (data: PreguntaFrecuente) => {
  return await axios.post(apiUrl + "/pf", data);
};
export const updatePreguntasFrecuentes = async (
  id: string,
  data: PreguntaFrecuente
) => {
  return await axios.put(apiUrl + "/pf/" + id, data);
};
