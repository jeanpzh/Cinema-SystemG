/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/admin/trabajadores/ListaTrabajadores.tsx

import React, { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import { COLUMN_TRABAJADORES } from "@/constants/columns";
import { useTrabajadores } from "@/hooks/useCrud";
import { Trabajador } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import ModalFormularioTrabajador from "./ModalFormularioTrabajador";
import SearchBar from "@/components/SearchBar";
import HeaderList from "@/components/HeaderList";
import { useAlert } from "@/hooks/useAlert";
import ItemFilter from "@/utils/ItemFilter";

function ListaTrabajadores() {
  const [storedTrabajadores, setStoredTrabajadores] = useState<Trabajador[]>(
    []
  );
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [selectedTrabajador, setSelectedTrabajador] =
    useState<Trabajador | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { showAlert } = useAlert(); // Usa el hook

  const {
    data: trabajadores,
    createItem: crearTrabajador,
    updateItem: actualizarTrabajador,
    deleteItem: eliminarTrabajador,
  } = useTrabajadores();

  useEffect(() => {
    setStoredTrabajadores(trabajadores || []);
  }, [trabajadores]);

  const showDeleteDialogFunc = () => setVisibleDeleteDialog(true);
  const hideDeleteDialog = () => {
    setVisibleDeleteDialog(false);
    setSelectedTrabajador(null);
  };

  const showAddDialog = () => setVisibleAddDialog(true);
  const hideAddDialog = () => {
    setVisibleAddDialog(false);
    setSelectedTrabajador(null);
    setIsEditing(false);
  };

  const memoTrabajadores = useMemo(
    () => storedTrabajadores,
    [storedTrabajadores]
  );

  const handleEditTrabajador = (rowData: Trabajador) => {
    setSelectedTrabajador(rowData);
    setIsEditing(true);
    showAddDialog();
  };

  const handleDeleteTrabajador = (rowData: Trabajador) => {
    setSelectedTrabajador(rowData);
    showDeleteDialogFunc();
  };

  const confirmDelete = () => {
    if (selectedTrabajador) {
      eliminarTrabajador(selectedTrabajador.Codigo_Trabajador)
        .then(() => {
          const listaNueva = storedTrabajadores.filter(
            (trabajador) =>
              trabajador.Codigo_Trabajador !==
              selectedTrabajador.Codigo_Trabajador
          );
          setStoredTrabajadores(listaNueva);
        })
        .catch((error) => {
          console.error(error);
          showAlert(
            `Error al eliminar el trabajador ${selectedTrabajador.Nombre}`
          );
        });
      hideDeleteDialog();
    }
  };

  const handleAddOrUpdateTrabajador = async (data: Trabajador) => {
    try {
      if (isEditing && selectedTrabajador) {
        console.log(selectedTrabajador.Codigo_Trabajador);
        const trabajadorActualizado = await actualizarTrabajador(
          selectedTrabajador.Codigo_Trabajador,
          data
        );

        setStoredTrabajadores(
          storedTrabajadores.map((trabajador) =>
            trabajador.Codigo_Trabajador ===
            selectedTrabajador.Codigo_Trabajador
              ? trabajadorActualizado.data
              : trabajador
          )
        );
      } else {
        console.log(data);
        const nuevoTrabajador = await crearTrabajador(data);

        setStoredTrabajadores([...storedTrabajadores, nuevoTrabajador.data]);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        showAlert(`El trabajador ${data.Nombre} ya existe.`);
      } else {
        showAlert("Error al agregar/actualizar el trabajador.");
      }
    }
    hideAddDialog();
  };
  const itemsFiltered = ItemFilter({
    searchTerm,
    memoItems: memoTrabajadores,
    getNombreItem: (item) => item.Nombre,
  });

  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Título y Botón */}
      <HeaderList
        title="TRABAJADORES"
        buttonLabel="Agregar Trabajador"
        showAddDialog={showAddDialog}
      />

      {/* Barra de Búsqueda */}
      <SearchBar
        placeholder="Buscar trabajadores..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* Tabla */}
      <Table
        label="Trabajadores"
        items={itemsFiltered}
        columns={COLUMN_TRABAJADORES}
        editProduct={handleEditTrabajador}
        confirmDeleteProduct={handleDeleteTrabajador}
      />

      {/* Modales */}
      <ModalEliminacion
        handleVisible={visibleDeleteDialog}
        hideDeleteDialog={hideDeleteDialog}
        footerDialog={
          <FooterDialog
            hideDialog={hideDeleteDialog}
            confirmDelete={confirmDelete}
          />
        }
        label={selectedTrabajador?.Nombre || "trabajador"}
      />
      <ModalFormularioTrabajador
        visible={visibleAddDialog}
        onHide={hideAddDialog}
        onAdd={handleAddOrUpdateTrabajador}
        trabajador={
          isEditing && selectedTrabajador ? selectedTrabajador : undefined
        }
      />
    </div>
  );
}

export default ListaTrabajadores;
