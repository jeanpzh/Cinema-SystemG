// components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { FaFilm, FaUser, FaTicketAlt } from "react-icons/fa";
import StatCard from "./StatCard";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useLoginStore } from "@/store/loginStore";
import { getPeliculas } from "@/api/peliculas";
import { obtenerTrabajadores } from "@/api/trabajadores";
import { getProductos } from "@/api/productos";
import { Pelicula } from "@/constants/table";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  //state: any
  const user = useLoginStore((state) => state.user);
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalWorkers: 0,
    totalProducts: 0,
  });

  const [loading, setLoading] = useState(false);
  const [movieTypes, setMovieTypes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const peliculasResponse = await getPeliculas();
        const trabajadoresResponse = await obtenerTrabajadores();
        const productosResponse = await getProductos();

        const peliculas = peliculasResponse.data;
        const tipos = peliculas.reduce((acc: { [key: string]: number }, pelicula: Pelicula) => {
          acc[pelicula.Genero] = (acc[pelicula.Genero] || 0) + 1;
          return acc;
        }, {});

        setStats({
          totalMovies: peliculas.length,
          totalWorkers: trabajadoresResponse.data.length,
          totalProducts: productosResponse.data.length,
        });

        setMovieTypes(tipos);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400">
        Cargando...
      </div>
    );
  }

  // Opciones para el gráfico de barras
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 20,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  // Datos del gráfico de barras
  const barChartData = {
    labels: ["Películas", "Trabajadores", "Productos"],
    datasets: [
      {
        label: "Estadísticas Generales",
        data: [stats.totalMovies, stats.totalWorkers, stats.totalProducts],
        backgroundColor: ["#4A90E2", "#50E3C2", "#9013FE"],
      },
    ],
  };

  // Datos del gráfico de pastel
  const pieChartData = {
    labels: Object.keys(movieTypes),
    datasets: [
      {
        data: Object.values(movieTypes),
        backgroundColor: [
          "#4A90E2",
          "#E94A3F",
          "#FFD700",
          "#9D50BB",
          "#FF6347",
          "#FF69B4",
          "#4682B4",
        ],
      },
    ],
  };

  return (
    <div className="flex-1 p-8 bg-lightTheme-background min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-lightTheme-text mb-8 text-center">
          Bienvenido {user?.user.name} !
        </h1>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Películas en cartelera"
            value={stats.totalMovies}
            icon={<FaFilm className="text-3xl text-comandanteN-1" />}
            bgColor="bg-lightTheme-card"
          />
          <StatCard
            title="Trabajadores Totales"
            value={stats.totalWorkers}
            icon={<FaUser className="text-3xl text-comandanteN-1" />}
            bgColor="bg-lightTheme-card"
          />
          <StatCard
            title="Productos Totales"
            value={stats.totalProducts}
            icon={<FaTicketAlt className="text-3xl text-comandanteN-1" />}
            bgColor="bg-lightTheme-card"
          />
        </div>

        {/* Gráficos Estadísticos */}
        <h2 className="text-2xl font-semibold text-lightTheme-text mb-6">
          Visualización de Datos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-lightTheme-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-lightTheme-text mb-4">
              Conteo de accesos
            </h3>
            <Bar data={barChartData} options={barChartOptions} key="barChart" />
          </div>
          <div className="bg-lightTheme-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-lightTheme-text mb-4">
              Peliculas vistas por su categoría
            </h3>
            <Pie
              data={pieChartData}
              options={{ responsive: true }}
              key="pieChart"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;