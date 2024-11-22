// Profile.tsx

import React, { useState, useEffect, useRef } from "react";
import { LogoutButton } from "./LogoutButton";
import { useLoginStore } from "@/store/loginStore";

interface User {
  name: string;
  email: string;
}

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const clearUser = useLoginStore((state) => state.clearUser);

  // Toggle para abrir/cerrar el menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    clearUser();  
    setIsMenuOpen(false);
  };

  // Maneja clics fuera del componente para cerrar el menú
  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative" ref={profileRef}>
      {/* Botón para abrir/cerrar el menú */}
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 hover:text-tokyoNight-primary transition-colors focus:outline-none"
      >
        <span className="font-semibold">{user.name}</span>
        {/* Icono de flecha hacia abajo */}
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isMenuOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="py-2">
            <LogoutButton onLogout={handleLogout} />
          </div>
        </div>
      )}
    </div>
  );
};
