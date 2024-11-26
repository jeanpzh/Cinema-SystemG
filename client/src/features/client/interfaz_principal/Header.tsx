// Header.tsx

import { Link, useLocation } from "react-router-dom";
import { Profile } from "./Profile";
import { useLoginStore } from "@/store/loginStore";

function Header() {
  const location = useLocation();
  const user = useLoginStore((state) => state.user);

  const buttons = [
    {
      condition: location.pathname === "/",
      button: [
        {
          text: "Inicio",
          link: "#home",
        },
        {
          text: "Contacto",
          link: "#contact",
        },
        {
          text: "Nuestra Visión",
          link: "#vision",
        },
        {
          text: "Proximos Estrenos",
          link: "#upcoming",
        },
        {
          text: "Peliculas",
          link: "/peliculas",
        },
        {
          text: "Productos",
          link: "/productos",
        },
      ],
    },
    {
      condition: location.pathname !== "/",
      button: [
        {
          text: "Inicio",
          link: "/",
        },

        {
          text: "Peliculas",
          link: "/peliculas",
        },
        {
          text: "Productos",
          link: "/productos",
        },
      ],
    },
  ];

  const profile = [
    {
      component:
        user !== null &&
        user.rol !== "admin" &&
        user.rol !== "producto" &&
        user.rol !== "pelicula" ? (
          <Profile user={user.user} />
        ) : (
          <Link
            to="/login"
            className="text-tokyoNight-primary hover:text-tokyoNight-accent transition-colors"
          >
            Login
          </Link>
        ),
    },
    {
      component:
        user &&
        user.rol !== "admin" &&
        user.rol !== "producto" &&
        user.rol !== "pelicula" ? null : (
          <Link
            key={user ? "asassa" : "assaas"}
            to="/register"
            className="text-tokyoNight-primary hover:text-tokyoNight-accent transition-colors"
          >
            Registro
          </Link>
        ),
    },
  ];

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
            {buttons.map((button) =>
              button.condition
                ? button.button.map((btn) => (
                    <li key={btn.text}>
                      <a
                        href={btn.link}
                        className="text-white hover:text-tokyoNight-accent transition-colors"
                      >
                        {btn.text}
                      </a>
                    </li>
                  ))
                : null
            )}

            {profile.map((prof) => (
              <li key={prof.component ? "profile" : null}>{prof.component}</li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
