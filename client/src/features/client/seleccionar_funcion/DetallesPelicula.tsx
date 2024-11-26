import { useEffect } from "react";
import { Clock, MapPin, Film, Tag, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { useFunciones } from "@/hooks/useCrud";
import { useEntradaStore } from "@/store/entradaStore";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export interface FuncionElegida {
  Capacidad: number;
  Codigo_Funcion: string;
  Codigo_Horario: string;
  Codigo_Pelicula: string;
  Codigo_Sala: string;
  Duracion: number;
  Hora_Inicio: string;
  Nombre_Pelicula: string;
  Nombre_Sala: string;
}

export default function DetallesPelicula() {
  const { data: funciones } = useFunciones();
  const setFuncion = useEntradaStore((state) => state.setFuncion);
  const loadPelicula = useEntradaStore((state) => state.pelicula);
  const setPelicula = useEntradaStore((state) => state.setPelicula);

  useEffect(() => {
    if (loadPelicula) {
      localStorage.setItem("pelicula", JSON.stringify(loadPelicula));
    }
  }, [loadPelicula]);

  useEffect(() => {
    const savedPelicula = localStorage.getItem("pelicula");
    if (savedPelicula) {
      setPelicula(JSON.parse(savedPelicula));
    }
  }, [setPelicula]);

  const funcionesElegidas = funciones?.filter(
    (funcionElegida: FuncionElegida) =>
      funcionElegida.Codigo_Pelicula === loadPelicula?.Codigo_Pelicula
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6 md:p-8 overflow-y-auto">
      <div className="mx-auto max-w-7xl">
        <Card className="overflow-hidden border-none bg-white shadow-xl rounded-3xl">
          <div className="grid gap-8 lg:grid-cols-[300px,1fr] p-6 md:p-8">
            {/* Left Column - Movie Poster and Quick Info */}
            <div className="space-y-6">
              <div className="aspect-[2/3] w-full relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={`${apiUrl}/resize-${loadPelicula?.Imagen_Pelicula}`}
                  alt={`Película: ${loadPelicula?.Nombre_Pelicula}`}
                  className="h-full w-full object-cover"
                  style={{
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 line-clamp-2">
                  {loadPelicula?.Nombre_Pelicula}
                </h1>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-lg">
                    {loadPelicula?.Duracion} minutos
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Tag className="h-5 w-5 text-blue-600" />
                  <Badge className="bg-blue-100 px-4 py-1.5 text-base text-blue-600">
                    {loadPelicula?.Genero}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right Column - Movie Details */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-800">
                  <Film className="h-6 w-6 text-blue-600" />
                  Sinopsis
                </h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  {loadPelicula?.Sinopsis}
                </p>
              </div>

              <Separator className="bg-gray-200" />

              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Funciones Disponibles
                </h3>
                <div className="grid gap-4">
                  {funcionesElegidas?.map((show: FuncionElegida, index) => (
                    <Card key={index} className="bg-gray-50 shadow-md hover:shadow-lg transition-shadow">
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                          <div className="text-xl font-semibold text-blue-600">
                            {show.Hora_Inicio}
                          </div>
                          <Separator
                            orientation="vertical"
                            className="hidden h-8 bg-gray-300 sm:block"
                          />
                          <div className="flex items-center text-gray-600">
                            <Clock className="mr-2 h-5 w-5 text-blue-600" />
                            <span>{show.Duracion} min</span>
                          </div>
                          <Separator
                            orientation="vertical"
                            className="hidden h-8 bg-gray-300 sm:block"
                          />
                          <div className="flex items-center text-gray-600">
                            <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                            <span>{show.Nombre_Sala}</span>
                          </div>
                        </div>
                        <Link
                          to={`/peliculas/${show.Codigo_Pelicula}/${show.Codigo_Sala}/asientos`}
                          className="transition-transform hover:scale-105"
                        >
                          <Button
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
                            onClick={() => {
                              if (loadPelicula) setPelicula(loadPelicula);
                              setFuncion(show);
                            }}
                          >
                            Reservar
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

