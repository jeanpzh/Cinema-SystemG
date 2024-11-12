import { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import { COLUMN_FUNCIONES } from "@/constants/columns";
import { useFunciones } from "@/hooks/useCrud";
import { Funcion } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import ModalFormularioFunciones from "./ModalFormularioFunciones";
import HeaderList from "@/components/HeaderList";
import SearchBar from "@/components/SearchBar";
import ItemFilter from "@/utils/ItemFilter";

function ListaFunciones() {
  const [searchTerm, setSearchTerm] = useState("");
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
  const filteredFunciones = ItemFilter({
    memoItems: memoFunciones,
    searchTerm: searchTerm,
    getNombreItem: (item) => item.Codigo_Funcion,
  });

  return (
    <div className="p-8 flex flex-col gap-6">
      <HeaderList
        title="FUNCIONES"
        buttonLabel="Agregar Función"
        showAddDialog={showAddDialog}
      />
      <SearchBar
        onChange={setSearchTerm}
        value={searchTerm}
        placeholder="Buscar funciones..."
      />
      <Table
        label="Funciones"
        items={filteredFunciones}
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
