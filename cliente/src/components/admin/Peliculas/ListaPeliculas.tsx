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
import ModalEliminacion from "@/components/common/ModalEliminacion";
import Notification from "@/components/common/Notification";

function ListaPeliculas() {
  const [isOpenModalAE, setIsOpenModalAE] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Pelicula>();
  const [isOpenModalEliminacion, setIsOpenModalEliminacion] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    items: peliculas,
    addItem: addPelicula,
    updateItem: updatePelicula,
    deleteItem: deletePelicula,
  } = useTable<Pelicula>({ idKey: "Codigo_Pelicula", url: "movies" });

  const handleSubmit = async (data: Pelicula) => {
    try {
      if (currentMovie)
        await updatePelicula("movies", currentMovie.Codigo_Pelicula, data);
      else {
        await addPelicula(data);
      }

      setIsOpenModalAE(false);
      setCurrentMovie(undefined);
      setError(null);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else throw new Error("Unexpected error");
    }
  };

  const handleEdit = (pelicula: Pelicula) => {
    setCurrentMovie(pelicula);
    setIsOpenModalAE(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpenModalAE(open);
    if (!open) {
      setCurrentMovie(undefined);
    }
  };

  const confirmDelete = async () => {
    try {
      if (movieToDelete) {
        await deletePelicula("movies", movieToDelete);
        setIsOpenModalEliminacion(false);
        setMovieToDelete(null);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else throw new Error("Unexpected error");
    }
  };

  const handleDelete = (id: string) => {
    setMovieToDelete(id);
    setIsOpenModalEliminacion(true);
  };

  return (
    <MainWrapper titulo="Lista de Películas">
      {error && <Notification message={error} onClose={() => setError(null)} />}
      <Dialog open={isOpenModalAE} onOpenChange={handleOpenChange}>
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
          const pelicula = peliculas.find((p) => p.Codigo_Pelicula === id);
          if (pelicula) {
            handleEdit(pelicula);
          }
        }}
        eliminarItem={handleDelete}
        idKey="Codigo_Pelicula"
      />

      {isOpenModalEliminacion && (
        <ModalEliminacion
          item="película"
          onConfirm={confirmDelete}
          onCancel={() => setIsOpenModalEliminacion(false)}
        />
      )}
    </MainWrapper>
  );
}

export default ListaPeliculas;
