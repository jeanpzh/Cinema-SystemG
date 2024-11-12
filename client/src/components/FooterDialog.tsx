// components/FooterDialog.jsx
import React from "react";
import { Button } from "primereact/button";

interface FooterDialogProps {
  hideDialog: () => void;
  confirmDelete: () => void;
}

const FooterDialog: React.FC<FooterDialogProps> = ({
  hideDialog,
  confirmDelete,
}) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button
        label="Cancelar"
        className="bg-gray-200 text-gray-700
         hover:bg-gray-300 border-none p-2"
        onClick={hideDialog}
        type="button"
      />
      <Button
        label="Eliminar"
        className="bg-danger p-2 hover:bg-danger-dark text-white border-none"
        onClick={confirmDelete}
        type="button"
      />
    </div>
  );
};

export default FooterDialog;
