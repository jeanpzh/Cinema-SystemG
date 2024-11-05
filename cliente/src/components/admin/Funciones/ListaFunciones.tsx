import CustomTable from "@/components/common/CustomTable";
import MainWrapper from "@/components/common/MainWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import ModalAEFuncion from "./ModalAEFuncion";
import ModalEliminacion from "@/components/common/ModalEliminacion";
import useTable from "@/hooks/useTable";
import { Funcion } from "@/constants/models";
import { funcion_columnas } from "@/constants/columns";
import { useState } from "react";
import useOpciones from "@/hooks/useOpciones";

function ListaFunciones() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFuncion, setCurrentFuncion] = useState<Funcion | undefined>(
    undefined
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Estado para el modal de eliminación
  const [funcionToDelete, setFuncionToDelete] = useState<string | null>(null); // Estado para la función a eliminar

  const {
    addItem: agregarPelicula,
    items: funciones,
    deleteItem: eliminarFuncion,
    updateItem: actualizarFuncion,
  } = useTable<Funcion>({ idKey: "Codigo_Funcion", url: "funcion" });

  const { opciones } = useOpciones("opciones");

  const handleSubmit = async (data: Funcion) => {
    if (currentFuncion && currentFuncion.Codigo_Funcion) {
      console.log("actualizar", currentFuncion.Codigo_Funcion);
      actualizarFuncion("funcion", currentFuncion.Codigo_Funcion, {
        Codigo_Pelicula: data.Codigo_Pelicula,
        Codigo_Horario: data.Codigo_Horario,
        Codigo_Sala: data.Codigo_Sala,
      });
    } else
      await agregarPelicula({
        Codigo_Pelicula: data.Codigo_Pelicula,
        Codigo_Horario: data.Codigo_Horario,
        Codigo_Sala: data.Codigo_Sala,
      });

    setIsOpen(false);
    setCurrentFuncion(undefined);
  };

  const handleEdit = (funcion: Funcion) => {
    setCurrentFuncion(funcion);
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setCurrentFuncion(undefined);
  };

  const handleDelete = (id: string) => {
    setFuncionToDelete(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (funcionToDelete) {
      eliminarFuncion("funcion", funcionToDelete);
      setFuncionToDelete(null);
      setIsDeleteOpen(false);
    }
  };

  return (
    <MainWrapper titulo="Lista de Funciones">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="mb-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <Plus className="mr-2 h-4 w-4" /> Agregar Función
          </Button>
        </DialogTrigger>
        <ModalAEFuncion
          handleSubmit={handleSubmit}
          type={currentFuncion ? "Editar" : "Agregar"}
          peliculaOpcion={opciones.peliculaOpcion}
          salaOpcion={opciones.salaOpcion}
          horarioOpcion={opciones.horarioOpcion}
        />
      </Dialog>
      <CustomTable
        headers={funcion_columnas.map((column) => column.Header) as string[]}
        idKey="Codigo_Funcion"
        items={funciones}
        eliminarItem={handleDelete}
        editarItem={(id) => {
          const funcion = funciones.find((p) => p.Codigo_Funcion === id);
          if (funcion) handleEdit(funcion);
        }}
      />
      {isDeleteOpen && (
        <ModalEliminacion
          item="función"
          onCancel={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </MainWrapper>
  );
}

export default ListaFunciones;
