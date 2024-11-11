import { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import { COLUMN_FUNCIONES } from "@/constants/columns";
import { useFunciones } from "@/hooks/useCrud";
import { Funcion } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import ModalFormularioFunciones from "./ModalFormularioFunciones";
import { Button } from "primereact/button";

function ListaFunciones() {
  const [storedFunciones, setStoredFunciones] = useState<Funcion[]>([]);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [selectedFuncion, setSelectedFuncion] = useState<Funcion | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: funciones,
    createItem: crearFuncion,
    updateItem: actualizarFuncion,
    deleteItem: eliminarFuncion,
  } = useFunciones();

  useEffect(() => {
    setStoredFunciones(funciones || []);
  }, [funciones]);

  const showDeleteDialog = () => setVisibleDeleteDialog(true);
  const hideDeleteDialog = () => {
    setVisibleDeleteDialog(false);
    setSelectedFuncion(null);
  };

  const showAddDialog = () => setVisibleAddDialog(true);
  const hideAddDialog = () => {
    setVisibleAddDialog(false);
    setSelectedFuncion(null);
    setIsEditing(false);
  };

  const memoFunciones = useMemo(() => storedFunciones, [storedFunciones]);

  const handleEditFuncion = (rowData: Funcion) => {
    showAddDialog();
    setSelectedFuncion(rowData);
    setIsEditing(true);
  };

  const handleDeleteFuncion = (rowData: Funcion) => {
    setSelectedFuncion(rowData);
    showDeleteDialog();
  };

  const confirmDelete = () => {
    if (selectedFuncion) {
      const nuevaLista = storedFunciones.filter(
        (funcion) => funcion.Codigo_Funcion !== selectedFuncion.Codigo_Funcion
      );
      setStoredFunciones(nuevaLista);
      eliminarFuncion(selectedFuncion.Codigo_Funcion);
      hideDeleteDialog();
    }
  };

  const handleAddOrUpdateFuncion = async (data: Funcion) => {
    if (isEditing && selectedFuncion) {
      const { Nombre_Pelicula, Duracion, Hora_Inicio, Nombre_Sala, Capacidad } =
        await actualizarFuncion(selectedFuncion.Codigo_Funcion, data);
      const nuevaLista = storedFunciones.map((funcion) =>
        funcion.Codigo_Funcion === selectedFuncion.Codigo_Funcion
          ? {
              ...funcion,
              Nombre_Pelicula,
              Duracion,
              Hora_Inicio,
              Nombre_Sala,
              Capacidad,
            }
          : funcion
      );
      setStoredFunciones(nuevaLista);
    } else {
      const nuevaFuncion = await crearFuncion(data);
      console.log(nuevaFuncion);
      setStoredFunciones([...storedFunciones, nuevaFuncion]);
    }
    hideAddDialog();
  };

  return (
    <div className="p-8 gap-4">
      <Button
        label="Agregar Función"
        icon="pi pi-plus"
        onClick={showAddDialog}
        className="p-mb-3 p-4"
      />
      <Table
        label="Funciones"
        items={memoFunciones}
        columns={COLUMN_FUNCIONES}
        editProduct={handleEditFuncion}
        confirmDeleteProduct={handleDeleteFuncion}
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
        label={`la función ${selectedFuncion?.Codigo_Funcion || ""}`}
      />
      <ModalFormularioFunciones
        visible={visibleAddDialog}
        onHide={hideAddDialog}
        onAdd={handleAddOrUpdateFuncion}
        funcion={isEditing && selectedFuncion ? selectedFuncion : undefined}
      />
    </div>
  );
}

export default ListaFunciones;
