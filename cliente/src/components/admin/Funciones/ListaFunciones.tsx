import CustomTable from "@/components/common/CustomTable";
import MainWrapper from "@/components/common/MainWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import ModalAEFuncion from "./ModalAEFuncion";
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

  const {
    addItem: agregarPelicula,
    items: funciones,
    deleteItem: eliminarFuncion,
    updateItem: actualizarFuncion,
  } = useTable<Funcion>({ idKey: "Codigo_Funcion", url: "funcion" });

  const { opciones } = useOpciones("opciones");

  const handleSubmit = async (data: Funcion) => {
    if (currentFuncion) {
      if (currentFuncion?.Codigo_Funcion)
        actualizarFuncion(currentFuncion.Codigo_Funcion, {
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
    setCurrentMovie(undefined);
  };

  const handleEdit = (funcion: Funcion) => {
    setCurrentMovie(funcion);
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setCurrentMovie(undefined);
    }
  };
  return (
    <MainWrapper titulo="Lista de Funciones">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Agregar Función
          </Button>
        </DialogTrigger>
        <ModalAEFuncion
          handleSubmit={handleSubmit}
          type="Agregar"
          peliculaOpcion={opciones.peliculaOpcion}
          salaOpcion={opciones.salaOpcion}
          horarioOpcion={opciones.horarioOpcion}
        />
      </Dialog>
      <CustomTable
        headers={funcion_columnas.map((column) => column.Header) as string[]}
        idKey="Codigo_Funcion"
        items={funciones}
        eliminarItem={(id) => eliminarFuncion("funcion", id)}
      />
    </MainWrapper>
  );
}

export default ListaFunciones;
