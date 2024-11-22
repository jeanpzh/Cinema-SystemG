import { Producto } from "@/constants/table";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  productos: Producto[];
};
type Action = {
  setProductos: (productos: Producto[]) => void;
  clearProductos: () => void;
};

export const useProductoStore = create<State & Action>()(
  persist(
    (set) => ({
      productos: [],
      setProductos: (productos) => set(() => ({ productos: productos })),
      clearProductos: () => set(() => ({ productos: [] })),
    }),
    { name: "productos" }
  )
);
