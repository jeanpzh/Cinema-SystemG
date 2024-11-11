import { Producto } from "@/constants/table";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
  return await axios.get(apiUrl + "/productos/");
};
export const deleteProductos = async (id: string) => {
  return await axios.delete(apiUrl + "/productos/" + id);
};
export const createProductos = async (data: Producto) => {
  return await axios.post(apiUrl + "/productos", data);
};
export const updateProductos = async (id: string, data: Producto) => {
  return await axios.put(apiUrl + "/productos/" + id, data);
};
