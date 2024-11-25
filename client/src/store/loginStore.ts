import axios from "axios";
import { create } from "zustand";

export interface User {
  email: string;
  name: string;
  user_id: string;
  username: string;
}

type State = {
  user: null | { rol: string; name: string; email: string; user: User };
  loading: boolean;
  error: null | string;
};
type Actions = {
  loadUser: () => Promise<void>;
  clearUser: () => Promise<void>;
};

export const useLoginStore = create<State & Actions>((set) => ({
  user: null, // <-- Estado inicial del usuario en el dashboard (admin -trabajador)
  loading: false, // <-- Estado inicial de carga
  error: null, // <-- Estado inicial de error

  // Carga de usuarios una vez que se ha logueado
  loadUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("http://localhost:3000/profile", {
        withCredentials: true,
      });
      if (res.data.role === "admin")
        await axios.get("http://localhost:3000/dashboard", {
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
      const res = await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) set({ user: null });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  },
}));
