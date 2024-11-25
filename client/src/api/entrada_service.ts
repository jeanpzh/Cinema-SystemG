import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const obtenerEntradas = async () => {
  const response = await axios.get(apiUrl + "/entradas");
  console.log(response);
  return response;
};
