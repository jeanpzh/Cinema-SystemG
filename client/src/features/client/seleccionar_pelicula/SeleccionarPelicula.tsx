import { useMovies } from "@/hooks/useCrud";
import CardItem from "./CardItem";

function SeleccionarPelicula() {
  const { data: movies } = useMovies();

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {movies?.map((movie) => (
        <CardItem
          Cod_Pelicula={movie.Codigo_Pelicula}
          pelicula={movie}
          key={movie.Codigo_Pelicula}
          Nombre_Pelicula={movie.Nombre_Pelicula}
        />
      ))}
    </div>
  );
}

export default SeleccionarPelicula;
