import { useEffect, useState, useMemo } from "react";
import { AxiosResponse } from "axios";
import {
  getPeliculas,
  deletePeliculas,
  createPeliculas,
  updatePeliculas,
} from "@/api/peliculas";
import { Combo, Pelicula, Producto } from "@/constants/table";
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

interface CrudOperations<T> {
  get: () => Promise<AxiosResponse<T[]>>;
  create: (data: T) => Promise<AxiosResponse<T>>;
  update: (id: string, data: T) => Promise<AxiosResponse<T>>;
  delete: (id: string) => Promise<AxiosResponse<void>>;
  getById?: (id: string) => Promise<AxiosResponse<T>>;
}

interface CrudState<T> {
  data: T[] | null;
  isLoading: boolean;
  error: Error | null;
  fetchData?: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createItem: (data: T) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return {
    data,
    isLoading,
    error,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
