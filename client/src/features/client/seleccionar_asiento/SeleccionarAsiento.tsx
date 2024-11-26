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
import { motion, AnimatePresence } from "framer-motion";

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
  const [animatedSeat, setAnimatedSeat] = useState<string | null>(null);

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

    setAnimatedSeat(clickedSeat.id_asiento);
    setTimeout(() => setAnimatedSeat(null), 300);

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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b26] to-[#24283b] p-6 flex items-center justify-center">
      <Card className="w-full max-w-5xl mx-auto bg-[#1f2937]/90 backdrop-blur-sm text-slate-200 rounded-xl border border-slate-700/50 shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
        <Dialog
          header={
            <h1 className="text-center text-2xl font-bold text-black-400">
              Confirmación de Reserva
            </h1>
          }
          visible={isOpenModal}
          onHide={() => setIsOpenModal(false)}
          className="rounded-xl bg-[#1f2937] border border-slate-700"
          modal
          draggable={false}
          resizable={false}
          style={{ width: "450px" }}
          breakpoints={{ "960px": "75vw", "640px": "90vw" }}
        >
          {selectedSeats.length > 0 ? (
            <div className="flex flex-col items-center space-y-6 p-6">
              <h2 className="text-xl font-semibold text-black">Has seleccionado:</h2>

              <p className="text-center text-lg text-blue-400">
                {selectedSeats
                  .map((seat) => `${seat.fila}-${seat.numero_asiento}`)
                  .join(", ")}
              </p>
              <Button 
                onClick={handleClickConfirmar} 
                className="w-full max-w-xs text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-105 rounded-lg"
              >
                Confirmar Reserva
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-6 p-6">
              <h2 className="text-xl font-semibold text-slate-200">
                No has seleccionado ningún asiento.
              </h2>
              <Button
                onClick={() => setIsOpenModal(false)}
                className="w-full max-w-xs text-lg font-semibold bg-slate-600 hover:bg-slate-700 text-white transition-all duration-300 rounded-lg"
              >
                Cerrar
              </Button>
            </div>
          )}
        </Dialog>

        <CardHeader className="text-center pt-8">
          <CardTitle className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-8 animate-pulse">
            Selecciona tus Asientos
          </CardTitle>
          <div className="relative mb-16">
            <div className="w-4/5 h-2 mx-auto bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-full animate-pulse">
              <div className="absolute inset-0 bg-blue-400 rounded-full  opacity-75"></div>
            </div>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg font-medium text-blue-400">
              Pantalla
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center space-y-8">
            <div className="grid gap-6">
              {Object.entries(groupedSeats).map(([fila, asientosFila]) => (
                <div
                  key={fila}
                  className="flex items-center justify-center gap-4"
                >
                  <span className="w-8 text-right text-lg font-bold text-blue-400">
                    {fila}
                  </span>

                  <div className="flex gap-4">
                    <AnimatePresence>
                      {asientosFila.map((asiento) => (
                        <motion.button
                          key={asiento.id_asiento}
                          onClick={() => handleSeatClick(asiento)}
                          disabled={asiento.estado === "OCUPADO"}
                          aria-label={`Asiento ${asiento.fila}-${
                            asiento.numero_asiento
                          } ${asiento.estado.toLowerCase()}`}
                          className={`w-12 h-12 flex items-center justify-center text-white text-lg font-medium rounded-lg shadow-md
                            ${
                              asiento.estado === "DISPONIBLE"
                                ? "bg-green-500 hover:bg-blue-500"
                                : asiento.estado === "SELECCIONADO"
                                ? "bg-blue-500 ring-2 ring-cyan-400"
                                : "bg-red-500/50 cursor-not-allowed"
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={
                            animatedSeat === asiento.id_asiento
                              ? { scale: [1, 1.2, 1] }
                              : {}
                          }
                          transition={{ duration: 0.2 }}
                        >
                          {asiento.numero_asiento}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <span className="text-green-400">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <span className="text-blue-400">Seleccionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500/50 rounded-full"></div>
                <span className="text-red-400">Ocupado</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-8">
          <div className="w-full text-center space-y-4">
            <p className="text-xl text-slate-300">
              Asientos seleccionados:{" "}
              <span className="text-blue-400 font-medium">
                {selectedSeats.length > 0
                  ? selectedSeats
                      .map((seat) => `${seat.fila}-${seat.numero_asiento}`)
                      .join(", ")
                  : "Ninguno"}
              </span>
            </p>
            <Button
              onClick={() => setIsOpenModal(true)}
              className="w-full max-w-md text-lg font-medium bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all duration-300 transform hover:scale-105 rounded-lg shadow-lg hover:shadow-blue-500/50"
              disabled={selectedSeats.length === 0}
            >
              Reservar {selectedSeats.length}{" "}
              {selectedSeats.length === 1 ? "asiento" : "asientos"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SeleccionarAsiento;

