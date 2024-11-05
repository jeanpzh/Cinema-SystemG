// ListaPeliculas.tsx
import { useState } from "react";
import CustomTable from "@/components/common/CustomTable";
import MainWrapper from "@/components/common/MainWrapper";
import { Button } from "@/components/ui/button";
import { pelicula_columnas } from "@/constants/columns";
import { Pelicula } from "@/constants/models";
import useTable from "@/hooks/useTable";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import ModalAEPelicula from "./ModalAEPelicula";

function ListaPeliculas() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Pelicula>();

  const {
    items: peliculas,
    addItem: addPelicula,
    updateItem: updatePelicula,
    deleteItem: deletePelicula,
  } = useTable<Pelicula>({ idKey: "Codigo_Pelicula", url: "movies" });

  const handleSubmit = async (data: Pelicula) => {
    if (currentMovie) await updatePelicula(currentMovie.Codigo_Pelicula, data);
    else {
      await addPelicula(data);
    }

    setIsOpen(false);
    setCurrentMovie(undefined);
  };

  const handleEdit = (pelicula: Pelicula) => {
    setCurrentMovie(pelicula);
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setCurrentMovie(undefined);
    }
  };

  return (
    <MainWrapper titulo="Lista de Películas">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="mb-4" onClick={() => setCurrentMovie(undefined)}>
            <Plus className="mr-2 h-4 w-4" /> Agregar Película
          </Button>
        </DialogTrigger>
        <ModalAEPelicula
          peliculaActual={currentMovie}
          handleSubmit={handleSubmit}
          type={currentMovie ? "Editar" : "Agregar"}
        />
      </Dialog>

      <CustomTable
        headers={pelicula_columnas.map((column) => column.Header) as string[]}
        items={peliculas}
        editarItem={(id) => {
          const pelicula = peliculas.find((p) => p.Codigo_Pelicula === id)
          if (pelicula) {
            handleEdit(pelicula);
          }
        }}
        eliminarItem={(id) => deletePelicula("movies", id)}
        idKey="Codigo_Pelicula"
      />
    </MainWrapper>
  );
}

export default ListaPeliculas;
