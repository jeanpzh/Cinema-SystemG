import { DetalleCombo } from "@/constants/table";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Combo {
  Codigo_Combo: string;
  Nombre_Combo: string;
  Descripcion: string;
  Imagen_Combo: string;
  Precio: number;
  Cantidad: number;
  Detalles: DetalleCombo[];
}

type State = {
  combos: Combo[];
};
type Action = {
  setCombos: (combos: Combo[]) => void;
  updateCantidad: (codigo: string, cantidad: number) => void;
  clearCombos: () => void;
};

export const useComboStore = create<State & Action>()(
  persist(
    (set) => ({
      combos: [],
      setCombos: (combos) => set(() => ({ combos: combos })),
      updateCantidad: (codigo, cantidad) =>
        set((state) => ({
          combos: state.combos.map((c) =>
            c.Codigo_Combo === codigo ? { ...c, Cantidad: cantidad } : c
          ),
        })),
      clearCombos: () => set(() => ({ combos: [] })),
    }),
    { name: "combos" }
  )
);
