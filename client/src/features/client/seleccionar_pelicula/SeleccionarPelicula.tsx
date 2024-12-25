import { useMovies } from "@/hooks/useCrud";
import CardItem from "./CardItem";

function MovieShowcase() {
  const { data: movies } = useMovies();

  const populares = movies?.slice(0, 5); // Ejemplo de "películas populares"

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Fondo animado detrás del título */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 via-purple-600 to-yellow-500 animate-gradient-move opacity-20 w-full h-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Título de la cartelera */}
        <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-12">
          🎥 Cartelera de Películas 🎥
        </h2>

        {/* Sección destacada */}
        <h3 className="text-3xl text-white font-bold mb-8">
          Películas Populares
        </h3>
        <div className="flex overflow-x-auto gap-6 scrollbar-hide">
          {populares?.map((movie) => (
            <div
              key={movie.Codigo_Pelicula}
              className="min-w-[250px] transition-transform hover:scale-105"
            >
              <CardItem
                Cod_Pelicula={movie.Codigo_Pelicula}
                pelicula={movie}
                Nombre_Pelicula={movie.Nombre_Pelicula}
              />
            </div>
          ))}
        </div>

        {/* Grid general */}
        <h3 className="text-3xl text-white font-bold mt-16 mb-8">
          Todas las Películas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {movies?.map((movie) => (
            <div
              key={movie.Codigo_Pelicula}
              className="relative group transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
            >
              <CardItem
                Cod_Pelicula={movie.Codigo_Pelicula}
                pelicula={movie}
                Nombre_Pelicula={movie.Nombre_Pelicula}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieShowcase;
