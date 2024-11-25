import { useEffect } from "react";
import { Clock, MapPin, Film, Tag } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-[#1a1b26] to-[#24283b] p-6 md:p-8 overflow-y-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[400px,1fr]">
          {/* Left Column - Movie Poster and Quick Info */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-none bg-[#1a1b26]/80 shadow-2xl backdrop-blur-sm">
              <div className="aspect-[2/3] w-full">
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
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-3 text-[#c0caf5]">
                  <Clock className="h-5 w-5 text-[#7aa2f7]" />
                  <span className="text-lg">
                    {loadPelicula?.Duracion} minutos
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#c0caf5]">
                  <Tag className="h-5 w-5 text-[#7aa2f7]" />
                  <Badge className="bg-[#7aa2f7]/20 px-4 py-1.5 text-base text-[#7aa2f7]">
                    {loadPelicula?.Genero}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Movie Details */}
          <div className="space-y-8">
            <div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                {loadPelicula?.Nombre_Pelicula}
              </h1>
              <Card className="border-none bg-[#1a1b26]/80 shadow-xl backdrop-blur-sm">
                <div className="space-y-6 p-6">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-[#bb9af7]">
                      <Film className="h-5 w-5" />
                      Sinopsis
                    </h3>
                    <p className="text-lg leading-relaxed text-[#c0caf5]">
                      {loadPelicula?.Sinopsis}
                    </p>
                  </div>

                  <Separator className="bg-[#414868]/50" />

                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-[#bb9af7]">
                      Funciones Disponibles
                    </h3>
                    <div className="grid gap-4">
                      {funcionesElegidas?.map((show: FuncionElegida, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-4 rounded-xl bg-[#24283b]/80 p-4 shadow-lg backdrop-blur-sm transition-all hover:bg-[#24283b] hover:shadow-xl sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                            <div className="text-xl font-semibold text-[#7aa2f7]">
                              {show.Hora_Inicio}
                            </div>
                            <Separator
                              orientation="vertical"
                              className="hidden h-8 bg-[#414868]/50 sm:block"
                            />
                            <div className="flex items-center text-[#c0caf5]">
                              <Clock className="mr-2 h-5 w-5" />
                              <span>{show.Duracion} min</span>
                            </div>
                            <Separator
                              orientation="vertical"
                              className="hidden h-8 bg-[#414868]/50 sm:block"
                            />
                            <div className="flex items-center text-[#c0caf5]">
                              <MapPin className="mr-2 h-5 w-5" />
                              <span>{show.Nombre_Sala}</span>
                            </div>
                          </div>
                          <Link
                            to={`/peliculas/${show.Codigo_Pelicula}/${show.Codigo_Sala}/asientos`}
                            className="transition-transform hover:scale-105"
                          >
                            <Button
                              className="w-full bg-[#7aa2f7] px-6 py-5 text-base font-semibold text-[#1a1b26] shadow-lg transition-colors hover:bg-[#bb9af7] sm:w-auto"
                              onClick={() => {
                                if (loadPelicula) setPelicula(loadPelicula);
                                setFuncion(show);
                              }}
                            >
                              Reservar
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
