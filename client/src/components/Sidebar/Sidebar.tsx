/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Sidebar.tsx

import SidebarOptions from "./SidebarOptions";
import CinePlexLogo from "../../../src/CINEX.png";
import {
  FaHome,
  FaFilm,
  FaBox,
  FaConciergeBell,
  FaLongArrowAltUp,
  FaUser,
  FaQuestionCircle,
} from "react-icons/fa";
import { Timer } from "./Timer";
import { useLoginStore } from "@/store/loginStore";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

// Definición de tipos para las props del Sidebar
interface User {
  exp: number;
  rol: string;
  user: {
    name: string;
  };
}

interface SidebarProps {
  user: User;
}

const Sidebar: FC<SidebarProps> = ({ user }) => {
  const logout = useLoginStore((state: any) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <aside className="fixed flex flex-col w-60 h-screen bg-neutral-800 text-white shadow-lg font-sans">
      {/* Encabezado del Sidebar */}
      <header className="py-6 flex items-center justify-center bg-neutral-900">
        <img
          src={CinePlexLogo}
          alt="CinePlex Logo"
          className="w-12 h-12 mr-2"
        />
        <p className="text-center text-xl font-semibold">CinePlex</p>
      </header>

      {/* Temporizador */}
      <div>
        <Timer exp={user.exp.toString()} />
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4">
        <SidebarOptions
          to="/admin/dashboard"
          label="Dashboard"
          icon={<FaHome className="text-lg" />}
        />
        {user && user.rol.toLowerCase() === "admin" && (
          <SidebarOptions
            to="/admin/trabajadores"
            label="Trabajadores"
            icon={<FaUser className="text-lg" />}
          />
        )}
        {((user && user.rol.toLowerCase() === "pelicula") ||
          user.rol.toLowerCase() === "admin") && (
          <>
            <SidebarOptions
              to="/admin/peliculas"
              label="Películas"
              icon={<FaFilm className="text-lg" />}
            />
            <SidebarOptions
              to="/admin/funciones"
              label="Funciones"
              icon={<FaBox className="text-lg" />}
            />
          </>
        )}

        {((user && user.rol.toLowerCase() === "producto") ||
          user.rol.toLowerCase() === "admin") && (
          <>
            <SidebarOptions
              to="/admin/productos"
              label="Productos"
              icon={<FaBox className="text-lg" />}
            />

            <SidebarOptions
              to="/admin/combos"
              label="Combos"
              icon={<FaConciergeBell className="text-lg" />}
            />
          </>
        )}
        {user && user.rol.toLowerCase() === "admin" && (
          <SidebarOptions
            to="/admin/preguntas-frecuentes"
            label="Preguntas Frecuentes"
            icon={<FaQuestionCircle className="text-lg" />}
          />
        )}
      </nav>

      {/* Pie de Página */}
      <footer className="p-4 bg-neutral-900">
        <SidebarOptions
          to="/perfil"
          label={
            user && user.rol.toLowerCase() === "admin"
              ? `${user.user.name} - Admin`
              : `${user.user.name} - Supervisor de ${user.rol}s`
          }
          icon={<FaUser className="text-lg" />}
        />
        <SidebarOptions
          to="#"
          label="Cerrar Sesión"
          onClick={handleLogout}
          icon={<FaLongArrowAltUp className="text-lg transform rotate-180" />}
        />

        <p className="mt-4 text-center text-sm text-gray-400">
          &copy; CinePlex 2024
        </p>
      </footer>
    </aside>
  );
};

export default Sidebar;
