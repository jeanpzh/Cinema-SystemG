// Se almacenara el estado de la entrada que va a comprar el cliente,
// el cliente va a seleccionar la película, la función y si es quiere productos adicionales
// Con zustand

import { Asiento, Funcion, Pelicula, Producto } from "@/constants/table";
import { create } from "zustand";

type State = {
  pelicula: null | Pelicula;
  funcion: null | Funcion;
  asientos: Asiento[];
  productos: Producto[];
};
type Actions = {
  setPelicula: (pelicula: Pelicula) => void;
  setFuncion: (funcion: Funcion) => void;
  setAsientos: (asientos: Asiento) => void;
  setProductos: (productos: Producto) => void;
  reset: () => void;
};

export const useEntradaStore = create<State & Actions>((set) => ({
  pelicula: null,
  funcion: null,
  asientos: [],
  productos: [],
  setPelicula: (pelicula) => set({ pelicula }),
  setFuncion: (funcion) => set({ funcion }),
  setProductos: (productos) =>
    set((state) => ({ productos: [...state.productos, productos] })),
  setAsientos: (asientos) =>
    set((state) => ({ asientos: [...state.asientos, asientos] })),

  reset: () => set({ pelicula: null, funcion: null, productos: [] }),
}));
