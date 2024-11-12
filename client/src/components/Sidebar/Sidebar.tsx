import SidebarOptions from "./SidebarOptions";
import CinePlexLogo from "../../../public/CINEX.png";
import {
  FaHome,
  FaFilm,
  FaBox,
  FaCalendarAlt,
  FaConciergeBell,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="fixed flex flex-col w-[240px] h-screen bg-gradient-comandanteN text-white shadow-lg font-poppins">
      <header className="py-6 flex items-center justify-center">
        <img
          src={CinePlexLogo}
          alt="CinePlex Logo"
          className="w-12 h-12 mr-2"
        />

        <p className="text-center text-2xl font-semibold">CinePlex</p>
      </header>
      <nav className="flex-1">
        <SidebarOptions
          to="/admin/dashboard"
          label="Dashboard"
          icon={<FaHome />}
        />
        <SidebarOptions
          to="/admin/peliculas"
          label="Peliculas"
          icon={<FaFilm />}
        />
        <SidebarOptions
          to="/admin/productos"
          label="Productos"
          icon={<FaBox />}
        />
        <SidebarOptions
          to="/admin/funciones"
          label="Funciones"
          icon={<FaCalendarAlt />}
        />
        <SidebarOptions
          to="/admin/combos"
          label="Combos"
          icon={<FaConciergeBell />}
        />
      </nav>
      <footer className="py-4">
        <p className="text-center text-sm text-gray-300">
          &copy; CinePlex 2024
        </p>
      </footer>
    </aside>
  );
}

export default Sidebar;
