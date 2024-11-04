// useTable.ts
import { useState, useEffect } from "react";
import {
  agregarItem,
  actualizarItem,
  eliminarItem,
  obtenerItems,
} from "@/services/apiService";

interface UseTableProps {
  idKey: string;
  url: string;
}

interface UseTableReturn<T> {
  items: T[];
  addItem: (item: T, itemFK?: T) => void;
  updateItem: (id: string, item: T) => void;
  deleteItem: (url: string, id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useTable<T extends Record<string, any>>({
  idKey,
  url,
}: UseTableProps): UseTableReturn<T> {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const items = await obtenerItems<T>(url);
        setData(items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    loadData();
    return () => {
      setData([]);
    };
  }, [url]);

  const addItem = async (item: T) => {
    try {
      // Asignamos la id generada por el servidor al nuevo item:
      const newItem = await agregarItem(item, url);
      setData((prev) => [
        ...prev,
        {
          ...item,
          [idKey]: newItem,
        },
      ]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (id: string, item: T | undefined) => {
    try {
      if (!item) return;
      // Falta implementar la actualización en el servidor

      setData((prev) =>
        prev.map((i) => (i[idKey] === id ? { ...i, ...item } : i))
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (url: string, id: string) => {
    try {
      const res = await eliminarItem(url, id);
      console.log("res", res);
      setData((prev) => prev.filter((i) => i[idKey] !== id));
      console.log("id", data);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return {
    items: data,
    addItem,
    updateItem,
    deleteItem,
  };
}

export default useTable;
