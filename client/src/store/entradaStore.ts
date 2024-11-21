// Se almacenara el estado de la entrada que va a comprar el cliente,
// el cliente va a seleccionar la película, la función y si es quiere productos adicionales
// Con zustand

import { Funcion, Pelicula, Producto } from "@/constants/table";
import { create } from "zustand";

export const useEntradaStore = create((set) => ({
  pelicula: null,
  funcion: null,
  productos: [],
  setPelicula: (pelicula: Pelicula) => set({ pelicula }),
  setFuncion: (funcion: Funcion) => set({ funcion }),
  setProductos: (productos: Producto) => set({ productos }),

  reset: () => set({ pelicula: null, funcion: null, productos: [] }),
}));
