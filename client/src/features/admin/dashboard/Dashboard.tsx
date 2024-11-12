// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { FaFilm, FaUser, FaTicketAlt } from "react-icons/fa";
import StatCard from "./StatCard";
// Definición de la interfaz para las estadísticas generales
interface GeneralStats {
  totalMovies: number;
  totalUsers: number;
  totalBookings: number;
}

// Definición de la interfaz para las películas próximas a estrenarse
interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  imageUrl?: string;
}

const Dashboard: React.FC = () => {
  // Estado inicial con estadísticas generales del cine
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stats, setStats] = useState<GeneralStats | null>({
    totalMovies: 120,
    totalUsers: 4500,
    totalBookings: 1300,
  });

  // Estado inicial para las películas próximas a estrenarse
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([
    {
      id: 1,
      title: "The Great Adventure",
      releaseDate: "2024-12-01",
      imageUrl:
        "https://estaticos-cdn.prensaiberica.es/clip/122daf5f-0615-473d-8146-511d59853861_woman-libre-1200_default_0.webp",
    },
    {
      id: 2,
      title: "Space Journey",
      releaseDate: "2024-12-15",
      imageUrl:
        "https://estaticos-cdn.prensaiberica.es/clip/6a57fd45-8785-4ee1-8627-8ba99a2665ea_woman-libre-1200_default_0.webp",
    },
    {
      id: 3,
      title: "Mystery Island",
      releaseDate: "2025-01-10",
      imageUrl:
        "https://estaticos-cdn.prensaiberica.es/clip/09f0f5d7-1eb3-4a71-948f-c7555dd3526d_woman-libre-1200_default_0.webp",
    },
  ]);

  // Estado para manejar si los datos están cargando
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Si los datos están cargando, mostramos un mensaje
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400">
        Cargando...
      </div>
    );
  }

  // Estructura del Dashboard
  return (
    <div className="flex-1 p-8 bg-lightTheme-background min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Título del Dashboard */}
        <h1 className="text-3xl font-semibold text-lightTheme-text mb-8 text-center">
          Administración CinePlex
        </h1>

        {/* Sección de estadísticas generales */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Películas en cartelera"
            value={stats?.totalMovies || 0}
            icon={<FaFilm className="text-3xl text-comandanteN-1" />}
            bgColor="bg-lightTheme-card"
          />
          <StatCard
            title="Usuarios Totales"
            value={stats?.totalUsers || 0}
            icon={<FaUser className="text-3xl text-comandanteN-1" />}
            bgColor="bg-lightTheme-card"
          />
          <StatCard
            title="Entradas Vendidas"
            value={stats?.totalBookings || 0}
            icon={<FaTicketAlt className="text-3xl text-comandanteN-1" />}
            bgColor="bg-lightTheme-card"
          />
        </div>

        {/* Sección de próximos estrenos */}
        <h2 className="text-2xl font-semibold text-lightTheme-text mb-6">
          Próximos Estrenos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {upcomingMovies.length > 0 ? (
            upcomingMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-lightTheme-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Imagen de la película */}
                {movie.imageUrl && (
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-60 object-cover"
                  />
                )}
                {/* Información de la película */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-lightTheme-text mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-600">
                    Fecha de estreno:{" "}
                    {new Date(movie.releaseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No hay próximos estrenos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
