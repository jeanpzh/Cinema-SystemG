/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/admin/combos/ListaCombos.tsx

import React, { useState, useEffect, useMemo } from "react";
import Table from "@/components/Table";
import { COLUMN_COMBOS } from "@/constants/columns";
import { useCombos, useProducts } from "@/hooks/useCrud";
import { Combo, ComboEnriquecido } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import ModalFormularioCombos from "./ModalFormularioCombos";
import HeaderList from "@/components/HeaderList";
import SearchBar from "@/components/SearchBar";
import ItemFilter from "@/utils/ItemFilter";
import { enrichCombos } from "@/utils/enrichCombos";
import { useAlert } from "@/hooks/useAlert";
function ListaCombos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [storedCombos, setStoredCombos] = useState<ComboEnriquecido[]>([]);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<ComboEnriquecido | null>(
    null
  );

  const { showAlert } = useAlert(); // Usa el hook

  const {
    data: combos,
    createItem: crearCombo,
    updateItem: actualizarCombo,
    deleteItem: eliminarCombo,
  } = useCombos();
  const { data: productos } = useProducts();

  useEffect(() => {
    if (combos && productos) {
      const enriquecidos = enrichCombos(combos, productos);
      setStoredCombos(enriquecidos);
    }
  }, [combos, productos]);

  const showDeleteDialogFunc = () => setVisibleDeleteDialog(true);
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

  const handleEditCombo = (rowData: ComboEnriquecido) => {
    setSelectedCombo(rowData);
    showAddDialog();
  };

  const handleDeleteCombo = (rowData: ComboEnriquecido) => {
    setSelectedCombo(rowData);
    showDeleteDialogFunc();
  };

  const confirmDelete = () => {
    if (selectedCombo) {
      eliminarCombo(selectedCombo.Codigo_Combo)
        .then(() => {
          const nuevaLista = storedCombos.filter(
            (combo) => combo.Codigo_Combo !== selectedCombo.Codigo_Combo
          );
          setStoredCombos(nuevaLista);
        })
        .catch((error) => {
          console.error("Error al eliminar combo:", error);
          showAlert(`Error al eliminar el combo ${selectedCombo.Nombre_Combo}`);
        });
      hideDeleteDialog();
    }
  };

  const handleAddOrUpdateCombo = async (data: Combo) => {
    if (data.Codigo_Combo) {
      // Editar Combo
      try {
        const comboActualizado = await actualizarCombo(data.Codigo_Combo, data);
        // Enriquecer el combo actualizado
        const comboActualizadoEnriquecido = enrichCombos(
          [comboActualizado.paObtenerComboPorID],
          productos || []
        )[0];
        const nuevaLista = storedCombos.map((combo) =>
          combo.Codigo_Combo === data.Codigo_Combo
            ? comboActualizadoEnriquecido
            : combo
        );
        setStoredCombos(nuevaLista);
      } catch (error: any) {
        console.error("Error al actualizar combo:", error);
        if (error.response && error.response.status === 400) {
          showAlert(`El item ${data.Nombre_Combo} ya existe.`);
        } else {
          showAlert("Error al actualizar el combo.");
        }
      }
    } else {
      // Agregar Nuevo Combo
      try {
        const nuevoCombo = await crearCombo(data);
        // Enriquecer el combo con el nombre de los productos
        const comboNuevoEnriquecido = enrichCombos(
          [nuevoCombo.paObtenerComboPorID],
          productos || []
        )[0];
        setStoredCombos([...storedCombos, comboNuevoEnriquecido]);
      } catch (error: any) {
        console.error("Error al crear combo:", error);
        if (error.response && error.response.status === 400) {
          showAlert(`El item ${data.Nombre_Combo} ya existe.`);
        } else {
          showAlert("Error al crear el combo.");
        }
      }
    }
    hideAddDialog();
  };

  const filteredCombos = ItemFilter({
    searchTerm,
    memoItems: memoCombos,
    getNombreItem: (item) => item.Nombre_Combo,
  });

  return (
    <div className="p-8 flex flex-col gap-6">
      <HeaderList
        title="COMBOS"
        showAddDialog={showAddDialog}
        buttonLabel="Agregar Combo"
      />
      <SearchBar
        placeholder="Buscar combos por nombre"
        onChange={setSearchTerm}
        value={searchTerm}
      />

      <Table
        label="Combos"
        items={filteredCombos}
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
