import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";

interface Props {
  label: string;
  handleVisible: boolean;
  hideDeleteDialog: () => void;
  footerDialog: JSX.Element;
}

function ModalEliminacion({
  handleVisible,
  footerDialog,
  hideDeleteDialog,
  label,
}: Props) {
  return (
    <Dialog
      visible={handleVisible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Confirm"
      modal
      footer={footerDialog}
      onHide={hideDeleteDialog}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        (
        <span>
          Are you sure you want to delete <b>{label}</b>?
        </span>
        )
      </div>
    </Dialog>
  );
}

export default ModalEliminacion;
