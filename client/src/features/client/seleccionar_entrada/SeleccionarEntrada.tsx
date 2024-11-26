import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Ticket } from 'lucide-react';
import { useEntradas } from "@/hooks/useCrud";
import { useEntradaStore } from "@/store/entradaStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

type TipoEntrada = {
  tipo: string;
  precio: string;
};

export default function SeleccionEntradas() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const asientos = useEntradaStore((state) => state.asientos);

  const { data: datos } = useEntradas();
  const [tiposEntrada, setTiposEntrada] = useState<TipoEntrada[]>([]);
  const [entradas, setEntradas] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (datos) {
      setTiposEntrada(datos);
    }
  }, [datos]);

  const actualizarCantidad = (tipo: string, cantidad: number) => {
    const nuevasEntradas = { ...entradas, [tipo]: Math.max(0, cantidad) };
    const cantidadAsientos = asientos.length;

    if (
      Object.values(nuevasEntradas).reduce((acc, curr) => acc + curr, 0) ===
      cantidadAsientos + 1
    ) {
      return null;
    }

    setEntradas(nuevasEntradas);
    calcularTotal(nuevasEntradas);
  };

  const calcularTotal = (entradasActuales: { [key: string]: number }) => {
    const nuevoTotal = tiposEntrada.reduce((acc, tipo) => {
      return acc + (entradasActuales[tipo.tipo] || 0) * parseFloat(tipo.precio);
    }, 0);
    setTotal(nuevoTotal);
  };

  const handleOnClick = () => {
    useEntradaStore.getState().setEntrada(
      Object.entries(entradas).map(([tipo, cantidad]) => ({
        tipo,
        cantidad,
        precio: parseFloat(
          tiposEntrada.find((t) => t.tipo === tipo)?.precio || "0"
        ),
      }))
    );
    setIsOpenModal(true);
  };

  const totalTickets = Object.values(entradas).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const remainingTickets = asientos.length - totalTickets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b26] to-[#24283b] p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl overflow-hidden border-none bg-white/95 shadow-xl backdrop-blur-sm rounded-3xl transition-all duration-300 hover:shadow-rose-200/50">
        <CardHeader className="space-y-4 bg-gradient-to-r from-rose-900 to-purple-900 p-8">
          <div className="flex items-center justify-center gap-3">
            <Ticket className="h-10 w-10 text-rose-200 animate-pulse" />
            <CardTitle className="text-4xl font-bold text-rose-100">
              Selección de Entradas
            </CardTitle>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm">
            <p className="text-lg font-medium text-rose-100">
              {remainingTickets > 0
                ? `Selecciona ${remainingTickets} ${
                    remainingTickets === 1 ? "entrada más" : "entradas más"
                  }`
                : "Has seleccionado todas las entradas necesarias"}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-8">
          {tiposEntrada.map((tipo) => (
            <div
              key={tipo.tipo}
              className="group rounded-2xl bg-rose-50/50 p-6 transition-all hover:bg-rose-100/50 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Label
                    htmlFor={tipo.tipo}
                    className="text-xl font-semibold text-rose-950 group-hover:text-rose-900 transition-colors"
                  >
                    {tipo.tipo}
                  </Label>
                  <p className="text-2xl font-bold text-rose-800 group-hover:text-rose-700 transition-colors">
                    ${tipo.precio}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      actualizarCantidad(
                        tipo.tipo,
                        (entradas[tipo.tipo] || 0) - 1
                      )
                    }
                    className="h-12 w-12 rounded-xl border-rose-200 bg-white text-rose-700 transition-all hover:bg-rose-800 hover:text-white hover:scale-105"
                    aria-label={`Disminuir cantidad de ${tipo.tipo}`}
                  >
                    <Minus className="h-6 w-6" />
                  </Button>
                  <Input
                    id={tipo.tipo}
                    type="number"
                    min="0"
                    value={entradas[tipo.tipo] || 0}
                    onChange={(e) =>
                      actualizarCantidad(
                        tipo.tipo,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-20 rounded-xl border-rose-200 bg-white text-center text-2xl font-bold text-rose-900 transition-all focus:border-rose-500 focus:ring-rose-500"
                    aria-label={`Cantidad de entradas para ${tipo.tipo}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      actualizarCantidad(
                        tipo.tipo,
                        (entradas[tipo.tipo] || 0) + 1
                      )
                    }
                    className="h-12 w-12 rounded-xl border-rose-200 bg-white text-rose-700 transition-all hover:bg-rose-800 hover:text-white hover:scale-105"
                    aria-label={`Aumentar cantidad de ${tipo.tipo}`}
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex flex-col space-y-6 bg-gradient-to-r from-rose-900 to-purple-900 p-8">
          <div className="flex items-center justify-between bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <span className="text-xl font-medium text-rose-100">
              Total a pagar
            </span>
            <span className="text-4xl font-bold text-rose-100">
              ${total.toFixed(2)}
            </span>
          </div>
          <Button
            className="w-full bg-rose-100 py-8 text-xl font-bold text-rose-900 transition-all hover:bg-rose-200 hover:scale-[1.02] disabled:bg-gray-300 disabled:text-gray-500 rounded-xl shadow-lg hover:shadow-rose-300/50"
            disabled={totalTickets !== asientos.length}
            onClick={handleOnClick}
          >
            Continuar
          </Button>
        </CardFooter>
      </Card>

      <Dialog
        visible={isOpenModal}
        onHide={() => setIsOpenModal(false)}
        modal
        draggable={false}
        resizable={false}
        className="rounded-3xl bg-white p-8 border border-rose-100"
        headerClassName="border-b border-rose-100 pb-6"
        contentClassName="py-8"
        header={
          <h2 className="text-3xl font-bold text-rose-900">Confirmación de Reserva</h2>
        }
      >
        <div className="space-y-8">
          <p className="text-xl text-rose-950">
            ¿Deseas agregar productos adicionales a tu compra?
          </p>
          <div className="flex gap-6">
            <Button
              className="flex-1 bg-rose-100 py-6 text-lg font-semibold text-rose-900 transition-all hover:bg-rose-200 hover:scale-105 rounded-xl"
              onClick={() => {
                navigate(`${location.pathname}/resumen-compra`);
                setIsOpenModal(false);
              }}
            >
              No, continuar sin productos
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-rose-800 to-purple-800 py-6 text-lg font-semibold text-white transition-all hover:from-rose-900 hover:to-purple-900 hover:scale-105 rounded-xl"
              onClick={() => {
                navigate(`${location.pathname}/productos`);
                setIsOpenModal(false);
              }}
            >
              Sí, agregar productos
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

