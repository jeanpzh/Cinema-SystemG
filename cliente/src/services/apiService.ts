import axios from "axios";

export const obtenerOpciones = async <T>(url: string) => {
  try {
    const response = await axios.get<T[]>(`http://localhost:3000/${url}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Error al obtener opciones"
      );
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const obtenerItems = async <T>(url: string) => {
  try {
    const response = await axios.get<T[]>(`http://localhost:3000/${url}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Error al obtener items");
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const agregarItem = async <T>(item: T, url: string) => {
  try {
    const response = await axios.post(`http://localhost:3000/${url}`, item);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data.message || "Error al añadir item";
      console.log("error", error);
      throw new Error(`${errorMessage}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const actualizarItem = async <T>(route: string, id: string, item: T) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/${route}/${id}`,
      item
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Error al actualizar item"
      );
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const eliminarItem = async (url: string, id: string) => {
  try {
    await axios.delete(`http://localhost:3000/${url}/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Error al eliminar item");
    } else {
      throw new Error("Unexpected error");
    }
  }
};
