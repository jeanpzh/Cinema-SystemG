import { Combo } from "@/constants/table";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getCombos = async () => {
  try {
    return await axios.get(apiUrl + "/combos");
  } catch (error) {
    console.error(error);
  }
};
export const createCombo = async (data: Combo) => {
  try {
    return (await axios.post(apiUrl + "/combos", data)).data;
  } catch (error) {
    console.error(error);
  }
};
export const updateCombo = async (id: string, data: Combo) => {
  try {
    const response = await axios.put(apiUrl + `/combos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteCombo = async (id: string) => {
  try {
    const response = await axios.delete(apiUrl + `/combos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const obtenerOpcionesCombo = async () => {
  try {
    return (await axios.get(apiUrl + "/combos/opciones")).data;
  } catch (error) {
    console.error(error);
  }
};
