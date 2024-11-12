import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode; // Permite pasar contenido entre las etiquetas
  onClick?: () => void; // onClick es opcional
  buttonType: 'cancel' | 'accept'; // Tipo de botón: cancelar o aceptar
}

const Button: React.FC<ButtonProps> = ({ children, onClick, buttonType }) => {
  // Establecer los colores para los bordes y sombras dependiendo del tipo de botón
  const cancelButtonClasses = "bg-black border-red-600 before:bg-gradient-to-r before:from-red-500 before:to-red-400 hover:shadow-red-300";
  const acceptButtonClasses = "bg-black border-green-400 before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] hover:shadow-green-300";

  // Seleccionar las clases dependiendo del tipo de botón
  const buttonClasses = buttonType === 'cancel' ? cancelButtonClasses : acceptButtonClasses;

  return (
    <button 
      onClick={onClick}
      className={`w-[150px] h-[50px] flex items-center justify-center rounded-xl relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 ${buttonClasses} before:absolute before:top-0 before:-left-full before:w-full before:h-full before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white font-poppins`}
    >
      {children}
    </button>
  );
}

export default Button;
