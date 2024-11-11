import { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import { COLUMN_PELICULAS } from "@/constants/columns";
import { useMovies } from "@/hooks/useCrud";
import { Pelicula } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import AgregarPelicula from "./ModalFormularioPelicula";
import { Button } from "primereact/button";

function ListaPeliculas() {
  const [storedPeliculas, setStoredPeliculas] = useState<Pelicula[]>([]);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [selectedPelicula, setSelectedPelicula] = useState<Pelicula | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: peliculas,
    createItem: crearPelicula,
    updateItem: actualizarPelicula,
    deleteItem: eliminarPelicula,
  } = useMovies();

  useEffect(() => {
    setStoredPeliculas(peliculas || []);
  }, [peliculas]);

  const showDeleteDialog = () => setVisibleDeleteDialog(true);
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
    showAddDialog();
    setSelectedPelicula(rowData);
    setIsEditing(true);
  };
  const handleDeleteProduct = (rowData: Pelicula) => {
    setSelectedPelicula(rowData);
    showDeleteDialog();
  };

  const confirmDelete = () => {
    if (selectedPelicula) {
      const listaNueva = storedPeliculas.filter(
        (pelicula) =>
          pelicula.Codigo_Pelicula !== selectedPelicula.Codigo_Pelicula
      );
      setStoredPeliculas(listaNueva);
      eliminarPelicula(selectedPelicula.Codigo_Pelicula);
      hideDeleteDialog();
    }
  };

  const handleAddOrUpdateMovie = (data: Pelicula) => {
    console.log("Data:", data);
    if (isEditing && selectedPelicula) {
      const nuevaLista = storedPeliculas.map((pelicula) => {
        if (pelicula.Codigo_Pelicula === selectedPelicula.Codigo_Pelicula)
          return data;

        return pelicula;
      });
      setStoredPeliculas(nuevaLista);
      actualizarPelicula(selectedPelicula.Codigo_Pelicula, data);
    } else {
      setStoredPeliculas([...storedPeliculas, data]);
      crearPelicula(data);
    }
    hideAddDialog();
  };

  return (
    <div className="p-8 gap-4">
      <Button
        label="Agregar Película"
        icon="pi pi-plus"
        onClick={showAddDialog}
        className="p-mb-3 p-4"
      />
      <Table
        label="Películas"
        items={memoPeliculas}
        columns={COLUMN_PELICULAS}
        editProduct={handleEditProduct}
        confirmDeleteProduct={handleDeleteProduct}
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
