import axios from "axios";
import { create } from "zustand";

export const useLoginStore = create((set) => ({
  user: null, // <-- Estado inicial del usuario en el dashboard (admin -trabajador)
  loading: false, // <-- Estado inicial de carga

  // Carga de usuarios una vez que se ha logueado
  loadUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("http://localhost:3000/dashboard", {
        withCredentials: true,
      });
      set({ user: res.data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) set({ error: error.message, loading: false });
      else set({ error: "An unknown error occurred", loading: false });
    }
  },
  clearUser: async () => {
    try {
      set({ user: null });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  },
}));
