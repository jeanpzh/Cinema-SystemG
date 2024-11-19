import React, { useState, useMemo, useEffect } from "react";
import Table from "@/components/Table";
import { COLUMN_PREGUNTAS_FRECUENTES } from "@/constants/columns";
import { usePreguntasFrecuentes } from "@/hooks/useCrud";
import { PreguntaFrecuente } from "@/constants/table";
import ModalEliminacion from "../../../components/ModalEliminacion";
import FooterDialog from "@/components/FooterDialog";
import SearchBar from "@/components/SearchBar";
import HeaderList from "@/components/HeaderList";
import { useAlert } from "@/hooks/useAlert";
import ModalFormularioPF from "./ModalFormularioPF";

function ListaPreguntasFrecuentes() {
  const [storedPreguntas, setStoredPreguntas] = useState<PreguntaFrecuente[]>(
    []
  );
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [selectedPregunta, setSelectedPregunta] =
    useState<PreguntaFrecuente | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { showAlert } = useAlert(); // Usa el hook

  const {
    data: preguntas,
    createItem: crearPregunta,
    updateItem: actualizarPregunta,
    deleteItem: eliminarPregunta,
  } = usePreguntasFrecuentes();

  useEffect(() => {
    setStoredPreguntas(preguntas || []);
  }, [preguntas]);

  const showDeleteDialogFunc = () => setVisibleDeleteDialog(true);
  const hideDeleteDialog = () => {
    setVisibleDeleteDialog(false);
    setSelectedPregunta(null);
  };

  const showAddDialog = () => setVisibleAddDialog(true);
  const hideAddDialog = () => {
    setVisibleAddDialog(false);
    setSelectedPregunta(null);
    setIsEditing(false);
  };

  const memoPreguntas = useMemo(() => storedPreguntas, [storedPreguntas]);

  const handleEditPregunta = (rowData: PreguntaFrecuente) => {
    setSelectedPregunta(rowData);
    setIsEditing(true);
    showAddDialog();
  };

  const handleDeletePregunta = (rowData: PreguntaFrecuente) => {
    setSelectedPregunta(rowData);
    console.log("rowData", rowData);
    showDeleteDialogFunc();
  };

  const confirmDelete = () => {
    if (selectedPregunta) {
      eliminarPregunta(selectedPregunta.id)
        .then(() => {
          const listaNueva = storedPreguntas.filter(
            (pregunta) => pregunta.id !== selectedPregunta.id
          );
          setStoredPreguntas(listaNueva);
        })
        .catch((error) => {
          console.error(error);
          showAlert(
            `Error al eliminar la pregunta frecuente ${selectedPregunta.pregunta}`
          );
        });
      hideDeleteDialog();
    }
  };

  const handleAddOrUpdatePregunta = async (data: PreguntaFrecuente) => {
    try {
      if (isEditing && selectedPregunta) {
        const preguntaActualizada = await actualizarPregunta(
          selectedPregunta.id,
          data
        );
        console.log("data", data, storedPreguntas, preguntaActualizada.data);

        setStoredPreguntas(
          storedPreguntas.map((pregunta) =>
            pregunta.id === selectedPregunta.id
              ? preguntaActualizada.data
              : pregunta
          )
        );
      } else {
        const nuevaPregunta = await crearPregunta(data);

        console.log("data", data, storedPreguntas, nuevaPregunta.data);
        setStoredPreguntas([...storedPreguntas, nuevaPregunta.data]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        showAlert(`La pregunta ${data.pregunta} ya existe.`);
      } else {
        showAlert("Error al agregar/actualizar la pregunta frecuente.");
      }
    }
    hideAddDialog();
  };

  /* const filteredPreguntas = ItemFilter({
    searchTerm,
    memoItems: memoPreguntas,
    getNombreItem: (item) => item.Pregunta,
  });
 */
  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Título y Botón */}
      <HeaderList
        title="PREGUNTAS FRECUENTES"
        buttonLabel="Agregar Pregunta"
        showAddDialog={showAddDialog}
      />

      {/* Barra de Búsqueda */}
      <SearchBar
        placeholder="Buscar preguntas..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* Tabla */}
      <Table
        label="Preguntas Frecuentes"
        items={memoPreguntas}
        columns={COLUMN_PREGUNTAS_FRECUENTES}
        editProduct={handleEditPregunta}
        confirmDeleteProduct={handleDeletePregunta}
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
        label={selectedPregunta?.pregunta || "pregunta"}
      />
      <ModalFormularioPF
        visible={visibleAddDialog}
        onHide={hideAddDialog}
        onAdd={handleAddOrUpdatePregunta}
        pregunta={isEditing && selectedPregunta ? selectedPregunta : undefined}
      />
    </div>
  );
}

export default ListaPreguntasFrecuentes;
