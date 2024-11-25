import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Producto {
  Codigo_Producto: string;
  Imagen_Producto: string;
  Tipo: string;
  Nombre: string;
  Precio: number;
  Stock: number;
  Cantidad: number;
}

type State = {
  productos: Producto[];
};
type Action = {
  setProductos: (productos: Producto[]) => void;
  updateCantidad: (codigo: string, cantidad: number) => void;
  clearProductos: () => void;
};

export const useProductoStore = create<State & Action>()(
  persist(
    (set) => ({
      productos: [],
      setProductos: (productos) => set(() => ({ productos: productos })),
      updateCantidad: (codigo, cantidad) =>
        set((state) => ({
          productos: state.productos.map((p) =>
            p.Codigo_Producto === codigo ? { ...p, Cantidad: cantidad } : p
          ),
        })),
      clearProductos: () => set(() => ({ productos: [] })),
    }),
    { name: "productos" }
  )
);
