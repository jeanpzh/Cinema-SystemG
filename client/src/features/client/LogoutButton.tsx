// LogoutButton.tsx

import React from "react";

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition-colors"
    >
      Cerrar sesión
    </button>
  );
};
