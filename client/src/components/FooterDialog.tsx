import { Button } from "primereact/button";
import React from "react";
interface Props<T> {
  hideDialog: () => void;
  confirmDelete: (rowData: T) => void;
}

function FooterDialog<T>({ hideDialog, confirmDelete }: Props<T>) {
  return (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Confirm" icon="pi pi-check" onClick={confirmDelete} />
    </React.Fragment>
  );
}

export default FooterDialog;
