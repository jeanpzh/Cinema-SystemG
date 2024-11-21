// Header.tsx

import { useLoginStore } from "@/store/loginStore";
import { Link } from "react-router-dom";
import { Profile } from "./Profile";

function Header() {
  const user = useLoginStore((state) => state.user);

  return (
    <header className="bg-tokyoNight-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo y Nombre de la Marca */}
        <div className="flex items-center space-x-2">
          <img src="/CINEX2.png" alt="CineSystem Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold bg-gradient-to-r text-white from-[#190329] via-[#2D0329] to-[#420229] bg-clip-text ">
            CINEPLEX
          </h1>
        </div>

        {/* Navegación */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 items-center">
            {/* Enlaces a Secciones */}
            <li>
              <a
                href="#home"
                className="hover:text-tokyoNight-primary transition-colors"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#upcoming"
                className="hover:text-tokyoNight-primary transition-colors"
              >
                Próximos estrenos
              </a>
            </li>
            <li>
              <Link
                to="/peliculas"
                className="hover:text-tokyoNight-primary transition-colors"
              >
                Películas
              </Link>
            </li>
            <li>
              <a
                href="#productos"
                className="hover:text-tokyoNight-primary transition-colors"
              >
                Productos
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-tokyoNight-primary transition-colors"
              >
                Contacto
              </a>
            </li>
            <li>
              <a
                href="#vision"
                className="hover:text-tokyoNight-primary transition-colors"
              >
                Nuestra Visión
              </a>
            </li>

            {/* Enlace de Registro */}
            {!user ? (
              <li>
                <Link
                  to="/register"
                  className="hover:text-tokyoNight-primary transition-colors"
                >
                  Registro
                </Link>
              </li>
            ) : null}

            {/* Enlaces de Login o Perfil del Usuario */}
            {user ? (
              <li>
                <Profile user={user.user} />
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="hover:text-tokyoNight-primary transition-colors"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
