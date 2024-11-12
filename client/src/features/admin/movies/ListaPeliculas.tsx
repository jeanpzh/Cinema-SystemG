/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/admin/peliculas/ListaPeliculas.tsx

import React, { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import { COLUMN_PELICULAS } from "@/constants/columns";
import { useMovies } from "@/hooks/useCrud";
import { Pelicula } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import AgregarPelicula from "./ModalFormularioPelicula";
import SearchBar from "@/components/SearchBar";
import HeaderList from "@/components/HeaderList";
import ItemFilter from "@/utils/ItemFilter";
import { useAlert } from "@/hooks/useAlert";

function ListaPeliculas() {
  const [storedPeliculas, setStoredPeliculas] = useState<Pelicula[]>([]);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [selectedPelicula, setSelectedPelicula] = useState<Pelicula | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { showAlert } = useAlert(); // Usa el hook

  const {
    data: peliculas,
    createItem: crearPelicula,
    updateItem: actualizarPelicula,
    deleteItem: eliminarPelicula,
  } = useMovies();

  useEffect(() => {
    setStoredPeliculas(peliculas || []);
  }, [peliculas]);

  const showDeleteDialogFunc = () => setVisibleDeleteDialog(true);
  const hideDeleteDialog = () => {
    setVisibleDeleteDialog(false);
    setSelectedPelicula(null);
  };

  const showAddDialog = () => setVisibleAddDialog(true);
  const hideAddDialog = () => {
    setVisibleAddDialog(false);
    setSelectedPelicula(null);
    setIsEditing(false);
  };

  const memoPeliculas = useMemo(() => storedPeliculas, [storedPeliculas]);

  const handleEditProduct = (rowData: Pelicula) => {
    setSelectedPelicula(rowData);
    setIsEditing(true);
    showAddDialog();
  };

  const handleDeleteProduct = (rowData: Pelicula) => {
    setSelectedPelicula(rowData);
    showDeleteDialogFunc();
  };

  const confirmDelete = () => {
    if (selectedPelicula) {
      eliminarPelicula(selectedPelicula.Codigo_Pelicula)
        .then(() => {
          const listaNueva = storedPeliculas.filter(
            (pelicula) =>
              pelicula.Codigo_Pelicula !== selectedPelicula.Codigo_Pelicula
          );
          setStoredPeliculas(listaNueva);
        })
        .catch((error) => {
          console.error(error);
          showAlert(
            `Error al eliminar la película ${selectedPelicula.Nombre_Pelicula}`
          );
        });
      hideDeleteDialog();
    }
  };

  const handleAddOrUpdateMovie = async (data: Pelicula) => {
    try {
      if (isEditing && selectedPelicula) {
        const peliculaActualizada = await actualizarPelicula(
          selectedPelicula.Codigo_Pelicula,
          data
        );

        setStoredPeliculas(
          storedPeliculas.map((pelicula) =>
            pelicula.Codigo_Pelicula === selectedPelicula.Codigo_Pelicula
              ? peliculaActualizada.data
              : pelicula
          )
        );
      } else {
        const nuevaPelicula = await crearPelicula(data);
        setStoredPeliculas([...storedPeliculas, nuevaPelicula.data]);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        showAlert(`El item ${data.Nombre_Pelicula} ya existe.`);
      } else {
        showAlert("Error al agregar/actualizar la película.");
      }
    }
    hideAddDialog();
  };

  const filteredPeliculas = ItemFilter({
    searchTerm,
    memoItems: memoPeliculas,
    getNombreItem: (item) => item.Nombre_Pelicula,
  });

  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Título y Botón */}
      <HeaderList
        title="Películas"
        buttonLabel="Agregar Película"
        showAddDialog={showAddDialog}
      />

      {/* Barra de Búsqueda */}
      <SearchBar
        placeholder="Buscar películas..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* Tabla */}
      <Table
        label="Películas"
        items={filteredPeliculas}
        columns={COLUMN_PELICULAS}
        editProduct={handleEditProduct}
        confirmDeleteProduct={handleDeleteProduct}
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
        label={selectedPelicula?.Nombre_Pelicula || "película"}
      />
      <AgregarPelicula
        visible={visibleAddDialog}
        onHide={hideAddDialog}
        onAdd={handleAddOrUpdateMovie}
        pelicula={isEditing && selectedPelicula ? selectedPelicula : undefined}
      />
    </div>
  );
}

export default ListaPeliculas;
