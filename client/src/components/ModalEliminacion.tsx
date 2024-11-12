// components/ModalEliminacion.jsx
import React from "react";
import { Dialog } from "primereact/dialog";
import FooterDialog from "./FooterDialog";

interface ModalEliminacionProps {
  handleVisible: boolean;
  hideDeleteDialog: () => void;
  footerDialog: JSX.Element;
  label: string;
}

const ModalEliminacion: React.FC<ModalEliminacionProps> = ({
  handleVisible,
  hideDeleteDialog,
  footerDialog,
  label,
}) => {
  return (
    <Dialog
      header={<h1 className="text-center">Eliminar Registro</h1>}
      visible={handleVisible}
      onHide={hideDeleteDialog}
      footer={
        footerDialog || (
          <FooterDialog
            hideDialog={hideDeleteDialog}
            confirmDelete={hideDeleteDialog}
          />
        )
      }
      className="p-fluid rounded-lg shadow-lg"
      modal
      draggable={false}
      resizable={false}
      style={{ width: "350px" }}
      breakpoints={{ "960px": "75vw", "640px": "90vw" }}
    >
      <div className="flex flex-col items-center justify-center p-6">
        {/* Icono de Advertencia */}
        <svg
          className="w-16 h-16 text-danger mb-4 bg-red-100 p-2 rounded-full animate-pulse"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V7a1 1 0 10-2 0v.586L7.707 8.293a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l.879.879a1 1 0 001.414-1.414L11 7.586z"
            clipRule="evenodd"
          />
        </svg>
        {/* Mensaje de Confirmación */}
        <p className="text-center text-gray-700 mt-2">
          ¿Estás seguro de que deseas eliminar <strong className="bold">{label}</strong>?
        </p>
      </div>
    </Dialog>
  );
};

export default ModalEliminacion;
