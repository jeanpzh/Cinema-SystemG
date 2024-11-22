import { useEffect } from "react";
import { Star, Clock, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { useFunciones } from "@/hooks/useCrud";
import { useEntradaStore } from "@/store/entradaStore";
import { Link } from "react-router-dom";

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
  const loadPelicula = useEntradaStore((state) => state.pelicula);
  const setPelicula = useEntradaStore((state) => state.setPelicula);
  console.log(funciones);
  useEffect(() => {
    // Guardar el estado de la película en localStorage
    if (loadPelicula) {
      localStorage.setItem("pelicula", JSON.stringify(loadPelicula));
    }
  }, [loadPelicula]);

  useEffect(() => {
    // Recuperar el estado de la película desde localStorage
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
    <div className="container mx-auto p-4 bg-[#1a1b26] text-[#a9b1d6] min-h-screen">
      <Card className="w-full max-w-4xl mx-auto bg-[#24283b] border-[#414868]">
        <CardHeader className="relative p-0">
          <img
            src="/placeholder.svg?height=400&width=800"
            alt={`Película: ${loadPelicula?.Nombre_Pelicula}`}
            className="w-full h-[400px] object-cover rounded-t-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#24283b] to-transparent p-6">
            <CardTitle className="text-4xl font-bold text-[#c0caf5] mb-2">
              {loadPelicula?.Nombre_Pelicula}
            </CardTitle>
            <div className="flex items-center text-[#7aa2f7] space-x-4">
              <span className="flex items-center">
                <Star className="text-[#e0af68] mr-1" />
                9.2/10
              </span>
              <span className="flex items-center">
                <Clock className="mr-1" /> {loadPelicula?.Duracion}
              </span>
              <span className="flex items-center">
                <Calendar className="mr-1" /> {loadPelicula?.Fecha_Estreno}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-[#bb9af7]">
              Sinopsis
            </h3>
            <p className="text-[#a9b1d6]">{loadPelicula?.Sinopsis}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-[#bb9af7]">
              Géneros
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-[#414868] text-[#c0caf5]"
              >
                {loadPelicula?.Genero}
              </Badge>
            </div>
          </div>
          <Separator className="my-6 bg-[#414868]" />
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#bb9af7]">
              Funciones Disponibles
            </h3>
            <div className="grid gap-4">
              {funcionesElegidas?.map((show: FuncionElegida, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#1a1b26] p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-[#7aa2f7] font-semibold">
                      {show.Hora_Inicio}
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-6 bg-[#414868]"
                    />
                    <div className="flex items-center text-[#a9b1d6]">
                      <Clock className="w-4 h-4 mr-2" />
                      {show.Duracion}
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-6 bg-[#414868]"
                    />
                    <div className="flex items-center text-[#a9b1d6]">
                      <MapPin className="w-4 h-4 mr-2" />
                      {show.Nombre_Sala}
                    </div>
                  </div>
                  <Link
                    to={`/peliculas/${show.Codigo_Pelicula}/${show.Codigo_Sala}/asientos`}
                  >
                    <Button className="bg-[#7aa2f7] text-[#1a1b26] hover:bg-[#bb9af7]">
                      Reservar
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
