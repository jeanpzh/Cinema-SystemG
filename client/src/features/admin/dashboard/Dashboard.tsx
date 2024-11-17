/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const user = useLoginStore((state: any) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stats, setStats] = useState({
    totalMovies: 120,
    totalUsers: 1500,
    totalBookings: 1500,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400">
        Cargando...
      </div>
    );
  }

  // Bar chart data
  // Opciones para el gráfico de barras
  // Opciones para el gráfico de barras
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const, // Añade "as const" para especificar que este es un literal de cadena
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
    labels: ["Películas", "Usuarios", "Entradas"],
    datasets: [
      {
        label: "Estadísticas Generales",
        data: [stats.totalMovies, stats.totalUsers, stats.totalBookings],
        backgroundColor: ["#4A90E2", "#50E3C2", "#9013FE"],
      },
    ],
  };

  // Pie chart data
  // Pie chart data con géneros de películas
  const pieChartData = {
    labels: [
      "Acción",
      "Terror",
      "Comedia",
      "Ciencia Ficción",
      "Drama",
      "Romance",
      "Documental",
    ],
    datasets: [
      {
        data: [30, 20, 15, 10, 10, 10, 5], // Ejemplo de porcentajes por género
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
            title="Usuarios Totales"
            value={stats.totalUsers}
            icon={<FaUser className="text-3xl text-comandanteN-1" />}
            bgColor="bg-lightTheme-card"
          />
          <StatCard
            title="Entradas Vendidas"
            value={stats.totalBookings}
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
