import { Pelicula } from "@/constants/table";
import { useEntradaStore } from "@/store/entradaStore";
import { Link } from "react-router-dom";
import { Clock, Info, Star, Calendar } from 'lucide-react';
const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
  Nombre_Pelicula: string;
  pelicula: Pelicula;
  Cod_Pelicula: string;
}

function CardItem({ Nombre_Pelicula, Cod_Pelicula, pelicula }: Props) {
  const setPelicula = useEntradaStore((state) => state.setPelicula);

  const handleClick = () => {
    setPelicula(pelicula);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
      <Link
        to={`/peliculas/${Cod_Pelicula}`}
        onClick={handleClick}
        className="block h-full w-full"
      >
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={`${apiUrl}/resize-${pelicula.Imagen_Pelicula}`}
            alt={Nombre_Pelicula}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="space-y-4 text-white">
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-white group-hover:text-red-500 transition-colors duration-300">
              {Nombre_Pelicula}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
              <div className="flex items-center gap-x-1">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="font-medium">{pelicula.Duracion} min</span>
              </div>
              <div className="flex items-center gap-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{pelicula.Clasificacion || "N/A"}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-x-2 rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-all group-hover:bg-red-700 group-hover:shadow-lg group-hover:shadow-red-500/50">
              <Info className="h-4 w-4" />
              Ver detalles
            </div>
          </div>
        </div>

        {/* Glowing effect on hover */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 transition-all duration-300 group-hover:ring-2 group-hover:ring-red-500/50 group-hover:shadow-[inset_0_0_100px_rgba(255,0,0,0.2)]" />
      </Link>
    </div>
  );
}

export default CardItem;

