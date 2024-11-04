import { Opciones } from "@/constants/models";
import axios from "axios";
import { useEffect, useState } from "react";

const useOpciones = (route: string) => {
  const [opciones, setOpciones] = useState<Opciones>({
    peliculaOpcion: [],
    salaOpcion: [],
    horarioOpcion: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/funcion/${route}`
        );
        setOpciones({
          peliculaOpcion: response.data.peliculas,
          salaOpcion: response.data.salas,
          horarioOpcion: response.data.horarios,
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpciones();
  }, [route]);

  return { opciones, isLoading };
};

export default useOpciones;
