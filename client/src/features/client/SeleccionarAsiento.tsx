"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import axios from "axios";
import { useParams } from "react-router-dom";

// Define los tipos para nuestros asientos y filas
interface Asiento {
  id_asiento: string;
  fila: string;
  numero_asiento: string;
  estado: "DISPONIBLE" | "SELECCIONADO" | "OCUPADO";
}

// Mock data para pruebas
const mockAsientos: Asiento[] = [
  // Fila A
  { id_asiento: "A1", fila: "A", numero_asiento: "1", estado: "DISPONIBLE" },
  { id_asiento: "A2", fila: "A", numero_asiento: "2", estado: "DISPONIBLE" },
  { id_asiento: "A3", fila: "A", numero_asiento: "3", estado: "DISPONIBLE" },
  { id_asiento: "A4", fila: "A", numero_asiento: "4", estado: "DISPONIBLE" },
  { id_asiento: "A5", fila: "A", numero_asiento: "5", estado: "DISPONIBLE" },
  // Fila B
  { id_asiento: "B1", fila: "B", numero_asiento: "1", estado: "OCUPADO" },
  { id_asiento: "B2", fila: "B", numero_asiento: "2", estado: "DISPONIBLE" },
  { id_asiento: "B3", fila: "B", numero_asiento: "3", estado: "SELECCIONADO" },
  { id_asiento: "B4", fila: "B", numero_asiento: "4", estado: "DISPONIBLE" },
  { id_asiento: "B5", fila: "B", numero_asiento: "5", estado: "DISPONIBLE" },
  // Fila C
  { id_asiento: "C1", fila: "C", numero_asiento: "1", estado: "DISPONIBLE" },
  { id_asiento: "C2", fila: "C", numero_asiento: "2", estado: "DISPONIBLE" },
  { id_asiento: "C3", fila: "C", numero_asiento: "3", estado: "OCUPADO" },
  { id_asiento: "C4", fila: "C", numero_asiento: "4", estado: "DISPONIBLE" },
  { id_asiento: "C5", fila: "C", numero_asiento: "5", estado: "DISPONIBLE" },
  // Fila D
  { id_asiento: "D1", fila: "D", numero_asiento: "1", estado: "DISPONIBLE" },
  { id_asiento: "D2", fila: "D", numero_asiento: "2", estado: "DISPONIBLE" },
  { id_asiento: "D3", fila: "D", numero_asiento: "3", estado: "DISPONIBLE" },
  { id_asiento: "D4", fila: "D", numero_asiento: "4", estado: "OCUPADO" },
  { id_asiento: "D5", fila: "D", numero_asiento: "5", estado: "DISPONIBLE" },
  // Fila E
  { id_asiento: "E1", fila: "E", numero_asiento: "1", estado: "DISPONIBLE" },
  { id_asiento: "E2", fila: "E", numero_asiento: "2", estado: "DISPONIBLE" },
  { id_asiento: "E3", fila: "E", numero_asiento: "3", estado: "SELECCIONADO" },
  { id_asiento: "E4", fila: "E", numero_asiento: "4", estado: "DISPONIBLE" },
  { id_asiento: "E5", fila: "E", numero_asiento: "5", estado: "DISPONIBLE" },
];

const SeatingChart: React.FC = () => {
  const [asientos, setAsientos] = useState<Asiento[]>([]);
  const { idSala } = useParams();

  useEffect(() => {
    // Función para obtener los asientos desde el backend
    const fetchAsientos = async () => {
      try {
        const response = await axios.get<Asiento[]>(
          "http://localhost:3000/asientos",
          {
            params: {
              idSala: idSala,
            },
          }
        );

        const data = response.data;
        setAsientos(data);
        console.log("Asientos obtenidos:", data); // Loguea los datos obtenidos
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error al obtener los asientos:",
            error.response?.data || error.message
          );
        } else {
          console.error("Error desconocido al obtener los asientos:", error);
        }
      }
    };

    fetchAsientos();
  }, [idSala]); // Añade idSala como dependencia

  // Filtra los asientos seleccionados correctamente
  const selectedSeats = asientos.filter(
    (seat) => seat.estado === "SELECCIONADO"
  );

  // Maneja la selección de asientos
  const handleSeatClick = (clickedSeat: Asiento) => {
    if (clickedSeat.estado === "OCUPADO") return;

    setAsientos((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id_asiento === clickedSeat.id_asiento
          ? {
              ...seat,
              estado:
                seat.estado === "DISPONIBLE" ? "SELECCIONADO" : "DISPONIBLE",
            }
          : seat
      )
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-tokyoNight-bg text-tokyoNight-primary p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Selecciona tus asientos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="flex flex-col items-center">
            {/* Pantalla */}
            <div className="w-3/4 h-2 bg-[#c0caf5] mt-4 mb-8 rounded-md">
             
            </div>

            {/* Grid de Asientos */}
            <div className="grid grid-cols-10 gap-4">
              {asientos.map((asiento) => (
                <button
                  key={asiento.id_asiento}
                  onClick={() => handleSeatClick(asiento)}
                  disabled={asiento.estado === "OCUPADO"}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold 
                    ${
                      asiento.estado === "DISPONIBLE"
                        ? "bg-[#9ece6a] hover:bg-[#7aa2f7] transition-colors duration-300 cursor-pointer"
                        : asiento.estado === "SELECCIONADO"
                        ? "bg-[#7aa2f7] animate-pulse cursor-pointer"
                        : "bg-[#f7768e] opacity-50 cursor-not-allowed"
                    }`}
                >
                  {asiento.numero_asiento}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leyenda de los estados de los asientos */}
        <div className="flex justify-center space-x-4 mt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#9ece6a] mr-2 rounded-full"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#7aa2f7] mr-2 rounded-full animate-pulse"></div>
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#f7768e] mr-2 rounded-full opacity-50"></div>
            <span>Ocupado</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <p className="mb-2">
            Asientos seleccionados:{" "}
            {selectedSeats
              .map((seat) => `${seat.fila}-${seat.numero_asiento}`)
              .join(", ")}
          </p>
          <Button
            className="w-full max-w-xs"
            disabled={selectedSeats.length === 0}
          >
            Reservar {selectedSeats.length}{" "}
            {selectedSeats.length === 1 ? "asiento" : "asientos"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeatingChart;
