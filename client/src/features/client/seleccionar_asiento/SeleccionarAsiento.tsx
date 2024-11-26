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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { useEntradaStore } from "@/store/entradaStore";

export interface Asiento {
  id_asiento: string;
  fila: string;
  numero_asiento: string;
  estado: "DISPONIBLE" | "SELECCIONADO" | "OCUPADO";
}

const SeleccionarAsiento: React.FC = () => {
  const guardarAsientos = useEntradaStore((state) => state.setAsientos);
  const navigate = useNavigate();
  const location = useLocation();
  const [asientos, setAsientos] = useState<Asiento[]>([]);
  const { idSala } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClickConfirmar = () => {
    useEntradaStore.setState({
      asientos: selectedSeats,
    });
    setIsOpenModal(false);
    guardarAsientos(selectedSeats);
    setTimeout(() => {
      navigate(`${location.pathname}/entradas`);
    }, 1000);
  };

  useEffect(() => {
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
        console.log("Asientos obtenidos:", data);
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
  }, [idSala]);

  const selectedSeats = asientos.filter(
    (seat) => seat.estado === "SELECCIONADO"
  );

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

  const groupedSeats = asientos.reduce((acc, seat) => {
    if (!acc[seat.fila]) {
      acc[seat.fila] = [];
    }
    acc[seat.fila].push(seat);
    return acc;
  }, {} as { [key: string]: Asiento[] });

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-[#1a1b26] to-[#24283b] text-[#c0caf5] p-8 rounded-xl shadow-2xl border border-[#7aa2f7]">
      <Dialog
        header={
          <h1 className="text-center text-2xl font-bold text-[#7aa2f7] drop-shadow-glow">
            Confirmación de Reserva
          </h1>
        }
        visible={isOpenModal}
        onHide={() => setIsOpenModal(false)}
        className="p-8 rounded-xl shadow-2xl bg-[#1a1b26] border border-[#7aa2f7]"
        modal
        draggable={false}
        resizable={false}
        style={{ width: "450px" }}
        breakpoints={{ "960px": "75vw", "640px": "90vw" }}
      >
        {selectedSeats.length > 0 ? (
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-xl font-semibold text-[#7aa2f7]">Has seleccionado:</h2>
            <p className="text-center text-lg text-[#c0caf5]">
              {selectedSeats
                .map((seat) => `${seat.fila}-${seat.numero_asiento}`)
                .join(", ")}
            </p>
            <Button onClick={handleClickConfirmar} className="w-full max-w-xs text-lg font-semibold bg-[#7aa2f7] hover:bg-[#9ece6a] transition-colors duration-300">
              Confirmar Reserva
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-xl font-semibold text-[#7aa2f7]">
              No has seleccionado ningún asiento.
            </h2>
            <Button
              onClick={() => setIsOpenModal(false)}
              className="w-full max-w-xs text-lg font-semibold bg-[#f7768e] hover:bg-[#ff9e64] transition-colors duration-300"
            >
              Cerrar
            </Button>
          </div>
        )}
      </Dialog>

      <CardHeader>
        <CardTitle className="text-4xl font-extrabold text-center text-[#7aa2f7] mb-6">
          Selecciona tus Asientos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-4/5 h-3 bg-[#7dcfff] mt-4 mb-12 rounded-full relative shadow-lg">
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg font-semibold text-[#7dcfff] drop-shadow-glow">
              Pantalla
            </span>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedSeats).map(([fila, asientosFila]) => (
              <div
                key={fila}
                className="flex items-center justify-center space-x-6"
              >
                <span className="w-12 text-right text-lg text-[#7dcfff] font-semibold">
                  {fila}
                </span>

                <div className="flex space-x-4">
                  {asientosFila.map((asiento) => (
                    <button
                      key={asiento.id_asiento}
                      onClick={() => handleSeatClick(asiento)}
                      disabled={asiento.estado === "OCUPADO"}
                      aria-label={`Asiento ${asiento.fila}-${
                        asiento.numero_asiento
                      } ${asiento.estado.toLowerCase()}`}
                      className={`w-14 h-14 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-105 
                        ${
                          asiento.estado === "DISPONIBLE"
                            ? "bg-[#9ece6a] hover:bg-[#7aa2f7] hover:shadow-[#7aa2f7]/50"
                            : asiento.estado === "SELECCIONADO"
                            ? "bg-[#7aa2f7] ring-4 ring-[#bb9af7] animate-pulse shadow-[#bb9af7]/50"
                            : "bg-[#f7768e] opacity-50 cursor-not-allowed"
                        }`}
                    >
                      {asiento.numero_asiento}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-12 mt-12 bg-[#1a1b26]/50 p-4 rounded-lg shadow-inner">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-[#9ece6a] rounded-lg shadow-md"></div>
            <span className="text-lg text-[#9ece6a]">Disponible</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-[#7aa2f7] rounded-lg shadow-md ring-2 ring-[#bb9af7] animate-pulse"></div>
            <span className="text-lg text-[#7aa2f7]">Seleccionado</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-[#f7768e] rounded-lg shadow-md opacity-50"></div>
            <span className="text-lg text-[#f7768e]">Ocupado</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center mt-8">
          <p className="mb-6 text-xl font-semibold text-[#c0caf5]">
            Asientos seleccionados:{" "}
            <span className="text-[#7aa2f7]">
              {selectedSeats.length > 0
                ? selectedSeats
                    .map((seat) => `${seat.fila}-${seat.numero_asiento}`)
                    .join(", ")
                : "Ninguno"}
            </span>
          </p>
          <Button
            onClick={() => setIsOpenModal(true)}
            className="w-full max-w-sm text-xl font-bold py-3 bg-[#7aa2f7] hover:bg-[#9ece6a] transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#9ece6a]/50"
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

export default SeleccionarAsiento;

