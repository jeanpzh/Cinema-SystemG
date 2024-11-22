import { Combo } from "@/constants/table";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  combos: Combo[];
};
type Action = {
  setCombos: (combos: Combo[]) => void;
  clearCombos: () => void;
};

export const useComboStore = create<State & Action>()(
  persist(
    (set) => ({
      combos: [],
      setCombos: (combos) => set(() => ({ combos: combos })),
      clearCombos: () => set(() => ({ combos: [] })),
    }),
    { name: "combos" }
  )
);
