import { Pelicula } from "@/constants/table";
import { useEntradaStore } from "@/store/entradaStore";
import { Link } from "react-router-dom";
import { Clock, Info } from "lucide-react";
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
    <div className="group relative overflow-hidden rounded-2xl bg-[#1a1b26] shadow-lg transition-all hover:scale-105 hover:shadow-xl">
      <Link
        to={`/peliculas/${Cod_Pelicula}`}
        onClick={handleClick}
        className="block h-full w-full"
      >
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            src={`${apiUrl}/resize-${pelicula.Imagen_Pelicula}`}
            alt={Nombre_Pelicula}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b26] via-[#1a1b26]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="space-y-4 text-white">
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-white/95">
              {Nombre_Pelicula}
            </h3>

            <div className="flex items-center gap-x-3 text-sm text-white/80">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{pelicula.Duracion} min</span>
            </div>

            <div className="inline-flex items-center gap-x-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-indigo-700">
              <Info className="h-4 w-4" />
              Ver detalles
            </div>
          </div>
        </div>

        {/* Subtle border effect */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      </Link>
    </div>
  );
}

export default CardItem;
