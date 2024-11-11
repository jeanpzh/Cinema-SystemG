import { useState, useEffect, useMemo } from "react";
import Table from "@/components/Table";
import { COLUMN_COMBOS } from "@/constants/columns";
import { useCombos } from "@/hooks/useCrud";
import { Combo } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import ModalFormularioCombos from "./ModalFormularioCombos";
import { Button } from "primereact/button";

function ListaCombos() {
  const [storedCombos, setStoredCombos] = useState<Combo[]>([]);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<Combo | null>(null);

  const {
    data: combos,
    createItem: crearCombo,
    updateItem: actualizarCombo,
    deleteItem: eliminarCombo,
  } = useCombos();

  useEffect(() => {
    setStoredCombos(combos || []);
  }, [combos]);

  const showDeleteDialog = () => setVisibleDeleteDialog(true);
  const hideDeleteDialog = () => {
    setVisibleDeleteDialog(false);
    setSelectedCombo(null);
  };

  const showAddDialog = () => setVisibleAddDialog(true);
  const hideAddDialog = () => {
    setVisibleAddDialog(false);
    setSelectedCombo(null);
  };

  const memoCombos = useMemo(() => storedCombos, [storedCombos]);

  const handleEditCombo = (rowData: Combo) => {
    setSelectedCombo(rowData);
    showAddDialog();
  };

  const handleDeleteCombo = (rowData: Combo) => {
    setSelectedCombo(rowData);
    showDeleteDialog();
  };

  const confirmDelete = () => {
    if (selectedCombo) {
      eliminarCombo(selectedCombo.Codigo_Combo);
      const nuevaLista = storedCombos.filter(
        (combo) => combo.Codigo_Combo !== selectedCombo.Codigo_Combo
      );
      setStoredCombos(nuevaLista);
      hideDeleteDialog();
    }
  };

  const handleAddOrUpdateCombo = async (data: Combo) => {
    if (data.Codigo_Combo) {
      // Editar Combo
      try {
        const comboActualizado = await actualizarCombo(data.Codigo_Combo, data);
        console.log("Combo actualizado:", comboActualizado.paObtenerComboPorID);
        const nuevaLista = storedCombos.map((combo) =>
          combo.Codigo_Combo === data.Codigo_Combo
            ? comboActualizado.paObtenerComboPorID
            : combo
        );
        setStoredCombos(nuevaLista);
      } catch (error) {
        console.error("Error al actualizar combo:", error);
      }
    } else {
      // Agregar Nuevo Combo
      try {
        const nuevoCombo = await crearCombo(data);
        setStoredCombos([...storedCombos, nuevoCombo]);
      } catch (error) {
        console.error("Error al crear combo:", error);
      }
    }
    hideAddDialog();
  };

  return (
    <div className="p-8 gap-4">
      <Button
        label="Agregar Combo"
        icon="pi pi-plus"
        onClick={() => {
          setSelectedCombo(null);
          hideDeleteDialog();
          showAddDialog();
        }}
        className="p-mb-3 p-4"
      />
      <Table
        label="Combos"
        items={memoCombos}
        columns={COLUMN_COMBOS}
        editProduct={handleEditCombo}
        confirmDeleteProduct={handleDeleteCombo}
      />
      <ModalEliminacion
        handleVisible={visibleDeleteDialog}
        hideDeleteDialog={hideDeleteDialog}
        footerDialog={
          <FooterDialog
            hideDialog={hideDeleteDialog}
            confirmDelete={confirmDelete}
          />
        }
        label={`el combo ${selectedCombo?.Codigo_Combo || ""}`}
      />
      <ModalFormularioCombos
        visible={visibleAddDialog}
        onHide={hideAddDialog}
        onAdd={handleAddOrUpdateCombo}
        combo={selectedCombo || undefined}
      />
    </div>
  );
}

export default ListaCombos;
