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
import { Minus, Plus, Ticket } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-[#1a1b26] to-[#24283b] p-6">
      <Card className="mx-auto max-w-xl overflow-hidden border-none bg-[#1a1b26]/80 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-4 bg-[#24283b] p-6">
          <div className="flex items-center justify-center gap-3">
            <Ticket className="h-8 w-8 text-[#7aa2f7]" />
            <CardTitle className="text-3xl font-bold text-white">
              Selección de Entradas
            </CardTitle>
          </div>
          <div className="rounded-lg bg-[#1a1b26]/50 p-4 text-center">
            <p className="text-sm font-medium text-[#c0caf5]">
              {remainingTickets > 0
                ? `Selecciona ${remainingTickets} ${
                    remainingTickets === 1 ? "entrada más" : "entradas más"
                  }`
                : "Has seleccionado todas las entradas necesarias"}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {tiposEntrada.map((tipo) => (
            <div
              key={tipo.tipo}
              className="group rounded-xl bg-[#24283b]/50 p-5 transition-all hover:bg-[#24283b]"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label
                    htmlFor={tipo.tipo}
                    className="text-lg font-semibold text-[#c0caf5]"
                  >
                    {tipo.tipo}
                  </Label>
                  <p className="text-lg font-bold text-[#7aa2f7]">
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
                    className="h-10 w-10 rounded-lg border-[#414868] bg-[#1a1b26]/50 text-[#c0caf5] transition-colors hover:bg-[#1a1b26] hover:text-[#7aa2f7]"
                    aria-label={`Disminuir cantidad de ${tipo.tipo}`}
                  >
                    <Minus className="h-5 w-5" />
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
                    className="w-16 rounded-lg border-[#414868] bg-[#1a1b26]/50 text-center text-lg font-medium text-[#c0caf5]"
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
                    className="h-10 w-10 rounded-lg border-[#414868] bg-[#1a1b26]/50 text-[#c0caf5] transition-colors hover:bg-[#1a1b26] hover:text-[#7aa2f7]"
                    aria-label={`Aumentar cantidad de ${tipo.tipo}`}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 bg-[#24283b] p-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-[#c0caf5]">
              Total a pagar
            </span>
            <span className="text-3xl font-bold text-[#7aa2f7]">
              ${total.toFixed(2)}
            </span>
          </div>
          <Button
            className="w-full bg-[#7aa2f7] py-6 text-lg font-semibold text-[#1a1b26] transition-colors hover:bg-[#bb9af7] disabled:bg-[#414868] disabled:text-[#c0caf5]"
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
        className="rounded-xl bg-[#1a1b26] p-6"
        headerClassName="border-b border-[#414868] pb-4"
        contentClassName="py-6"
        header={
          <h2 className="text-2xl font-bold ">Confirmación de Reserva</h2>
        }
      >
        <div className="space-y-6">
          <p className="text-lg">
            ¿Deseas agregar productos adicionales a tu compra?
          </p>
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-[#414868] py-6 text-base font-semibold text-[#c0caf5] transition-colors hover:bg-[#565f89]"
              onClick={() => {
                navigate(`${location.pathname}/resumen-compra`);
                setIsOpenModal(false);
              }}
            >
              No, continuar sin productos
            </Button>
            <Button
              className="flex-1 bg-[#7aa2f7] py-6 text-base font-semibold text-[#1a1b26] transition-colors hover:bg-[#bb9af7]"
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
