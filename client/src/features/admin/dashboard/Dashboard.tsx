import React, { useEffect, useState } from 'react';

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
  imageUrl?: string; // URL opcional para la imagen de la película
}

const Dashboard: React.FC = () => {
  // Estado inicial con estadísticas generales del cine
  const [stats, setStats] = useState<GeneralStats | null>({
    totalMovies: 120,
    totalUsers: 4500,
    totalBookings: 1300,
  });

  // Estado inicial para las películas próximas a estrenarse
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([
    {
      id: 1,
      title: "The Great Adventure",
      releaseDate: "2024-12-01",
      imageUrl: "https://estaticos-cdn.prensaiberica.es/clip/122daf5f-0615-473d-8146-511d59853861_woman-libre-1200_default_0.webp",
    },
    {
      id: 2,
      title: "Space Journey",
      releaseDate: "2024-12-15",
      imageUrl: "https://estaticos-cdn.prensaiberica.es/clip/6a57fd45-8785-4ee1-8627-8ba99a2665ea_woman-libre-1200_default_0.webp",
    },
    {
      id: 3,
      title: "Mystery Island",
      releaseDate: "2025-01-10",
      imageUrl: "https://estaticos-cdn.prensaiberica.es/clip/09f0f5d7-1eb3-4a71-948f-c7555dd3526d_woman-libre-1200_default_0.webp",
    },
  ]);

  // Estado para manejar si los datos están cargando
  const [loading, setLoading] = useState(false);

  // Si los datos están cargando, mostramos un mensaje
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  // Estructura del Dashboard
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Centramos verticalmente ocupando toda la altura de la pantalla
        backgroundColor: '#f8f8f8',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          padding: '20px',
          fontFamily: '"Segoe UI", Roboto, sans-serif',
          color: '#333',
        }}
      >
        {/* Título del Dashboard */}
        <h1 style={{ fontSize: '2.2rem', color: '#222', marginBottom: '20px', textAlign: 'center' }}>
          Administración Cineplex
        </h1>

        {/* Sección de estadísticas generales */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={statCardStyle}>
            <h2>Películas en cartelera</h2>
            <p style={statValueStyle}>{stats?.totalMovies}</p>
          </div>
          <div style={statCardStyle}>
            <h2>Productos totales</h2>
            <p style={statValueStyle}>{stats?.totalUsers}</p>
          </div>
          <div style={statCardStyle}>
            <h2>Entradas vendidas</h2>
            <p style={statValueStyle}>{stats?.totalBookings}</p>
          </div>
        </div>

        {/* Sección de próximos estrenos */}
        <h2 style={{ fontSize: '1.8rem', color: '#444', marginBottom: '20px', textAlign: 'center' }}>
          Próximos Estrenos
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {upcomingMovies.length > 0 ? (
            upcomingMovies.map((movie) => (
              <div key={movie.id} style={movieCardStyle}>
                {/* Imagen de la película */}
                {movie.imageUrl && (
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: '300px', // Aumentamos la altura para hacer la imagen más larga
                      objectFit: 'cover', // Ajustamos la imagen para que cubra todo el contenedor sin distorsionarse
                      borderRadius: '8px',
                      marginBottom: '10px',
                    }}
                  />
                )}
                {/* Título de la película */}
                <h3 style={{ color: '#222', fontSize: '1.2rem', marginBottom: '5px' }}>
                  {movie.title}
                </h3>
                {/* Fecha de estreno */}
                <p style={{ color: '#555', fontSize: '0.9rem' }}>
                  Fecha de estreno: {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div style={{ padding: '20px', color: '#999', textAlign: 'center' }}>
              No hay próximos estrenos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Estilos de las tarjetas de estadísticas
const statCardStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  flex: '1',
  margin: '0 10px',
  textAlign: 'center',
};

// Estilos para los valores de estadísticas
const statValueStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#333',
};

// Estilos de las tarjetas de películas
const movieCardStyle = {
  backgroundColor: '#ffffff',
  padding: '15px',
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  transition: 'transform 0.2s',
};

export default Dashboard;
