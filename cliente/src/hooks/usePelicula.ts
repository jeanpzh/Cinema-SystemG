import { useState, useEffect } from "react";
import { Pelicula } from "@/constants/models";
import { PeliculaServiceImpl } from "@/services/PeliculaServiceImp";

const peliculaService = new PeliculaServiceImpl();

export function usePelicula() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPeliculas = async () => {
      try {
        const data = await peliculaService.getAll();
        if (isMounted) {
          setPeliculas(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "An error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPeliculas();

    return () => {
      isMounted = false;
    };
  }, []);

  return { peliculas, loading, error };
}
