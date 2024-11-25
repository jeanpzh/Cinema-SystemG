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

// Define los tipos para nuestros asientos y filas
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

  // Funciones

  // Funcion para que cuando se haga click en el boton de confirmar se guarde en el estado global y se redirija a la pagina de resumen de compra
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

  // Funcion para que cuando se haga click en el boton de comprar productos adicionales se guarde en el estado global y se redirija a la pagina de productos
  /* const handleClickProductos = () => {
    useEntradaStore.setState({
      asientos: selectedSeats,
    });
    setIsOpenModal(false);
    guardarAsientos(selectedSeats);
    setTimeout(() => {
      navigate(`${location.pathname}/productos`);
    }, 1000);
  }; */

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

  // Agrupa los asientos por fila para una mejor visualización
  const groupedSeats = asientos.reduce((acc, seat) => {
    if (!acc[seat.fila]) {
      acc[seat.fila] = [];
    }
    acc[seat.fila].push(seat);
    return acc;
  }, {} as { [key: string]: Asiento[] });

  return (
    <Card className="w-full max-w-4xl mx-auto bg-tokyoNight-bg text-tokyoNight-primary p-6 rounded-lg shadow-lg">
      <Dialog
        header={
          <h1 className="text-center text-xl font-semibold">
            Confirmación de Reserva
          </h1>
        }
        visible={isOpenModal}
        onHide={() => setIsOpenModal(false)}
        className="p-6 rounded-lg shadow-lg"
        modal
        draggable={false}
        resizable={false}
        style={{ width: "400px" }}
        breakpoints={{ "960px": "75vw", "640px": "90vw" }}
      >
        {selectedSeats.length > 0 ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-medium">Has seleccionado:</h2>
            <p className="text-center">
              {selectedSeats
                .map((seat) => `${seat.fila}-${seat.numero_asiento}`)
                .join(", ")}
            </p>
            <Button onClick={handleClickConfirmar} className="w-full max-w-xs">
              Confirmar Reserva
            </Button>
            {/*  <Button
              variant="outline"
              onClick={handleClickProductos}
              className="w-full max-w-xs mt-2"
            >
              Comprar Productos Adicionales
            </Button> */}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-medium">
              No has seleccionado ningún asiento.
            </h2>
            <Button
              onClick={() => setIsOpenModal(false)}
              className="w-full max-w-xs"
            >
              Cerrar
            </Button>
          </div>
        )}
      </Dialog>

      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Selecciona tus Asientos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Pantalla */}
          <div className="w-3/4 h-2 bg-[#c0caf5] mt-4 mb-8 rounded-md relative">
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-[#c0caf5]">
              Pantalla
            </span>
          </div>

          {/* Renderiza las filas de asientos */}
          <div className="space-y-6">
            {Object.entries(groupedSeats).map(([fila, asientosFila]) => (
              <div
                key={fila}
                className="flex items-center justify-center space-x-4"
              >
                {/* Etiqueta de la Fila */}
                <span className="w-10 text-right text-sm text-[#c0caf5] font-medium">
                  {fila}
                </span>

                {/* Asientos en la Fila */}
                <div className="flex space-x-3">
                  {asientosFila.map((asiento) => (
                    <button
                      key={asiento.id_asiento}
                      onClick={() => handleSeatClick(asiento)}
                      disabled={asiento.estado === "OCUPADO"}
                      aria-label={`Asiento ${asiento.fila}-${
                        asiento.numero_asiento
                      } ${asiento.estado.toLowerCase()}`}
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
            ))}
          </div>
        </div>

        {/* Leyenda de los estados de los asientos */}
        <div className="flex justify-center space-x-8 mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-[#9ece6a] rounded-full border-2 border-[#7aa2f7]"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-[#7aa2f7] rounded-full border-2 border-[#7aa2f7] animate-pulse"></div>
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-[#f7768e] rounded-full border-2 border-[#f7768e] opacity-50"></div>
            <span>Ocupado</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <p className="mb-4 text-lg">
            Asientos seleccionados:{" "}
            {selectedSeats.length > 0
              ? selectedSeats
                  .map((seat) => `${seat.fila}-${seat.numero_asiento}`)
                  .join(", ")
              : "Ninguno"}
          </p>
          <Button
            onClick={() => setIsOpenModal(true)}
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

export default SeleccionarAsiento;
