// Se almacenara el estado de la entrada que va a comprar el cliente,
// el cliente va a seleccionar la película, la función y si es quiere productos adicionales
// Con zustand

import { Pelicula } from "@/constants/table";
import { FuncionElegida } from "@/features/client/seleccionar_funcion/DetallesPelicula";
import { Asiento } from "@/features/client/seleccionar_asiento/SeleccionarAsiento";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Entrada = {
  tipo: string;
  cantidad: number;
  precio: number;
};
type State = {
  funcion: null | FuncionElegida;
  pelicula: null | Pelicula;
  asiento: null | Asiento;
  entrada: null | Entrada;
  asientos: Asiento[];
  entradas: Entrada[];
};
type Actions = {
  setFuncion: (funcion: FuncionElegida) => void;
  setPelicula: (pelicula: Pelicula) => void;
  setAsientos: (asientos: Asiento[]) => void;
  setEntrada: (entradas: Entrada[]) => void;
  reset: () => void;
};

export const useEntradaStore = create<State & Actions>()(
  persist(
    (set) => ({
      funcion: null,
      pelicula: null,
      asiento: null,
      entrada: null,
      asientos: [],
      entradas: [],
      setFuncion: (funcion) => set({ funcion }),
      setPelicula: (pelicula) => set({ pelicula }),
      setAsientos: (asientos) => set({ asientos }),
      setEntrada: (entrada) => set({ entradas: entrada }),
      reset: () =>
        set({ asientos: [], entradas: [], funcion: null, pelicula: null }),
    }),
    {
      name: "entrada",
    }
  )
);
