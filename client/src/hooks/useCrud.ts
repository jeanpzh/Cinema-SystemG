/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from "react";
import { AxiosResponse } from "axios";
import {
  getPeliculas,
  deletePeliculas,
  createPeliculas,
  updatePeliculas,
} from "@/api/peliculas";
import {
  Combo,
  Pelicula,
  PreguntaFrecuente,
  Producto,
  Trabajador,
} from "@/constants/table";
import {
  createProductos,
  deleteProductos,
  getProductos,
  updateProductos,
  obtenerProductoPorId,
} from "@/api/productos";
import {
  createFuncion,
  deleteFuncion,
  getFunciones,
  updateFuncion,
} from "@/api/funciones";
import { createCombo, deleteCombo, getCombos, updateCombo } from "@/api/combos";
import {
  createTrabajador,
  deleteTrabajador,
  obtenerTrabajadores,
  updateTrabajador,
} from "@/api/trabajadores";
import {
  createPreguntasFrecuentes,
  deletePreguntasFrecuentes,
  getPreguntasFrecuentes,
  updatePreguntasFrecuentes,
} from "@/api/preguntas_frecuentes";
import { obtenerEntradas } from "@/api/entrada_service";
import { generar_voucher, obtenerVoucher } from "@/api/voucherPago";
import { create_cliente } from "@/api/cliente";

interface CrudOperations<T> {
  get: () => Promise<AxiosResponse<T[]>>;
  create: (data: T) => Promise<AxiosResponse<T>> | null;
  update: (id: string, data: T) => Promise<AxiosResponse<T>>;
  delete: (id: string) => Promise<AxiosResponse<void>>;
  getById?: (id: string) => Promise<AxiosResponse<T>>;
}

interface CrudState<T> {
  data: T[] | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
  createItem: (data: T) => Promise<any> | null;
  updateItem: (id: string, data: T) => Promise<any>;
  deleteItem: (id: string) => Promise<void>;
  getById?: (id: string) => Promise<AxiosResponse<T>>;
}

const useCrud = <T>(operations: CrudOperations<T>): CrudState<T> => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createItem = async (itemData: T) => {
    setIsLoading(true);
    try {
      return await operations.create(itemData);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (id: string, itemData: T) => {
    setIsLoading(true);
    try {
      return await operations.update(id, itemData);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    try {
      await operations.delete(id);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };
  const getById = async (id: string): Promise<AxiosResponse<T>> => {
    if (!operations.getById) {
      throw new Error("getById operation is not defined");
    }
    try {
      return await operations.getById(id);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initialFetch = async () => {
      if (!isMounted) return;

      setIsLoading(true);
      try {
        const response = await operations.get();

        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error instanceof Error
              ? error
              : new Error("An unknown error occurred")
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initialFetch();

    return () => {
      isMounted = false;
    };
  }, [operations]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await operations.get();
      setData(response.data);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    getById,
  };
};

export const useMovies = () => {
  const operations: CrudOperations<Pelicula> = useMemo(
    () => ({
      get: getPeliculas,
      create: createPeliculas,
      update: updatePeliculas,
      delete: deletePeliculas,
    }),
    []
  );

  return useCrud(operations);
};
export const useProducts = () => {
  const operations: CrudOperations<Producto> = useMemo(
    () => ({
      get: getProductos,
      create: createProductos,
      update: updateProductos,
      delete: deleteProductos,
      getById: obtenerProductoPorId,
    }),
    []
  );

  return useCrud(operations);
};
export const useFunciones = () => {
  const operations: CrudOperations<any> = useMemo(
    () => ({
      get: async () => {
        const response = await getFunciones();
        if (!response) {
          throw new Error("Failed to fetch funciones");
        }
        return response;
      },
      create: createFuncion,
      update: updateFuncion,
      delete: deleteFuncion,
    }),
    []
  );

  return useCrud(operations);
};
export const useCombos = () => {
  const operations: CrudOperations<Combo> = useMemo(
    () => ({
      get: async () => {
        const response = await getCombos();
        if (!response) {
          throw new Error("Failed to fetch combos");
        }
        return response;
      },
      create: createCombo,
      update: updateCombo,
      delete: deleteCombo,
    }),
    []
  );

  return useCrud(operations);
};
export const useTrabajadores = () => {
  const operations: CrudOperations<Trabajador> = useMemo(
    () => ({
      get: async () => {
        const response = await obtenerTrabajadores();
        if (!response) {
          throw new Error("Failed to fetch funciones");
        }
        return response;
      },
      create: createTrabajador,
      update: updateTrabajador,
      delete: deleteTrabajador,
    }),
    []
  );

  return useCrud(operations);
};

export const usePreguntasFrecuentes = () => {
  const operations: CrudOperations<PreguntaFrecuente> = useMemo(
    () => ({
      get: getPreguntasFrecuentes,
      create: createPreguntasFrecuentes,
      update: updatePreguntasFrecuentes,
      delete: deletePreguntasFrecuentes,
    }),
    []
  );

  return useCrud(operations);
};
export const useEntradas = () => {
  const operations: CrudOperations<any> = useMemo(
    () => ({
      get: obtenerEntradas,
      create: async () => Promise.reject(new Error("Not implemented")),
      update: async () => Promise.reject(new Error("Not implemented")),
      delete: async () => Promise.reject(new Error("Not implemented")),
    }),

    []
  );

  return useCrud(operations);
};
export const useVoucher = () => {
  const operations: CrudOperations<any> = useMemo(
    () => ({
      get: async () => Promise.reject(new Error("Not implemented")),
      create: generar_voucher,
      update: async () => Promise.reject(new Error("Not implemented")),
      delete: async () => Promise.reject(new Error("Not implemented")),
      getById: obtenerVoucher,
    }),

    []
  );

  return useCrud(operations);
};

export const useCliente = () => {
  const operations: CrudOperations<any> = useMemo(
    () => ({
      get: async () => Promise.reject(new Error("Not implemented")),
      create: create_cliente,
      update: async () => Promise.reject(new Error("Not implemented")),
      delete: async () => Promise.reject(new Error("Not implemented")),
    }),

    []
  );

  return useCrud(operations);
};
