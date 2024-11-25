import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEntradaStore } from "@/store/entradaStore";
import { useProductoStore } from "@/store/productoStore";
import { useLoginStore } from "@/store/loginStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useComboStore } from "@/store/comboStore";
import { useVoucher } from "@/hooks/useCrud";
import { useVoucherStore } from "@/store/voucherStore";

export default function GestionPagos() {
  // Hooks de navegación y localización
  const navigate = useNavigate();
  const location = useLocation();

  // Estado global para guardar el id del voucher
  const { createItem: generar_voucher } = useVoucher();
  const setVoucher = useVoucherStore((state) => state.setVoucher);

  // Estados globales para mandar la información de la compra
  const cliente = useLoginStore((state) => state.user)?.user;
  const peliculaSeleccionada = useEntradaStore((state) => state.pelicula);
  const funcionSeleccionada = useEntradaStore((state) => state.funcion);
  const butacas = useEntradaStore((state) => state.asientos);
  const entradas = useEntradaStore((state) => state.entradas);
  const productos = useProductoStore((state) => state.productos);
  const combos = useComboStore((state) => state.combos);

  // Estados locales para la gestión de pagos
  const [formaPago, setFormaPago] = useState<string>("");
  const [aceptaTerminos, setAceptaTerminos] = useState<boolean>(false);
  const [aceptaDatosNecesarios, setAceptaDatosNecesarios] =
    useState<boolean>(false);
  const [aceptaDatosOpcionales, setAceptaDatosOpcionales] =
    useState<boolean>(false);
  const [compraExitosa, setCompraExitosa] = useState<boolean>(false);

  // Función para confirmar la compra
  const handleConfirmarCompra = async () => {
    if (formaPago && aceptaTerminos && aceptaDatosNecesarios) {
      setCompraExitosa(true);
      const datos = {
        cliente: cliente,
        pelicula: peliculaSeleccionada,
        funcion: funcionSeleccionada,
        butacas: butacas,
        entradas: entradas,
        productos: productos,
        combos: combos,
        formaPago: formaPago,
      };
      const res = await generar_voucher(datos);
      setVoucher(res.data);
      setTimeout(() => {
        navigate(`${location.pathname}/${uuidv4()}`);
      }, 5000);
    } else {
      alert("Ocurria un error, intente el proceso de nuevo");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] text-[#a9b1d6] p-6 flex items-center justify-center">
      <Card className="max-w-4xl w-full bg-[#24283b] border-[#414868] rounded-lg shadow-lg">
        {/* Encabezado */}
        <CardHeader className="border-b border-[#414868]">
          <CardTitle className="text-2xl font-bold text-[#7aa2f7]">
            Gestión de Pagos
          </CardTitle>
        </CardHeader>

        {/* Contenido Principal */}
        <CardContent className="space-y-6 mt-4">
          {/* Resumen de Selección */}
          <div>
            {peliculaSeleccionada && funcionSeleccionada ? (
              <>
                <h2 className="text-xl font-semibold text-[#7aa2f7] mb-2">
                  Resumen de la Selección
                </h2>
                <p className="text-sm text-white">
                  <span className="font-medium text-gray-300">Película:</span>{" "}
                  {peliculaSeleccionada?.Nombre_Pelicula}
                </p>
                <p className="text-sm text-white">
                  <span className="font-medium text-gray-300">
                    Hora de inicio:
                  </span>{" "}
                  {funcionSeleccionada?.Hora_Inicio}
                </p>
                <p className="text-sm text-white">
                  <span className="font-medium text-gray-300">Sala:</span>{" "}
                  {funcionSeleccionada?.Nombre_Sala}
                </p>
                <Separator className="bg-[#414868] my-4" />
              </>
            ) : null}
          </div>

          {/* Datos Personales */}
          <div>
            <h2 className="text-xl font-semibold text-[#7aa2f7] mb-2">
              Datos Personales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nombre" className="block mb-1 text-white pb-2">
                  Nombre completo
                </Label>
                <Input
                  id="nombre"
                  value={cliente?.name}
                  className="bg-[#1a1b26] border-[#414868] text-[#a9b1d6] hover:border-[#7aa2f7] transition-colors"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="email" className="block mb-1 text-white pb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  value={cliente?.email}
                  disabled
                  className="bg-[#1a1b26] border-[#414868] text-[#a9b1d6] "
                />
              </div>
            </div>
          </div>

          <Separator className="bg-[#414868] my-4" />

          {/* Resumen de Compra */}
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#7aa2f7] text-[#1a1b26] hover:bg-[#6a95e0] transition-colors"
                >
                  Ver Resumen de compra
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#24283b] border-[#414868] text-[#a9b1d6] rounded-lg shadow-lg p-6">
                <DialogHeader>
                  <DialogTitle className="text-[#7aa2f7] text-2xl">
                    Resumen de compra
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  {butacas && butacas.length > 0 && (
                    <>
                      <div>
                        <h3 className="font-semibold text-[#7aa2f7] mb-1">
                          Butacas seleccionadas
                        </h3>
                        <p className="text-sm text-gray-400">
                          {butacas.map((butaca) =>
                            butaca
                              ? `${butaca.fila}${butaca.numero_asiento} `
                              : ""
                          )}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#7aa2f7] mb-1">
                          Entradas
                        </h3>
                        {entradas.map((entrada, index) => (
                          <p key={index} className="text-sm text-gray-400">
                            {entrada.tipo}: {entrada.cantidad} x $
                            {entrada.precio} = $
                            {(entrada.cantidad * entrada.precio).toFixed(2)}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                  {productos.length > 0 && (
                    <>
                      <Separator className="bg-[#414868]" />
                      <div>
                        <h3 className="font-semibold text-[#7aa2f7] mb-1">
                          Productos de Dulcería
                        </h3>
                        {productos.map(
                          (producto, index) =>
                            producto.Cantidad > 0 && (
                              <p key={index} className="text-sm text-gray-400">
                                {producto.Nombre}: {producto.Cantidad} x $
                                {producto.Precio} = $
                                {(producto.Cantidad * producto.Precio).toFixed(
                                  2
                                )}
                              </p>
                            )
                        )}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="font-semibold">Total Productos:</span>
                        <span className="font-semibold">
                          S/{" "}
                          {productos.reduce(
                            (acc, producto) =>
                              acc + producto.Cantidad * producto.Precio,
                            0
                          )}
                        </span>
                      </div>
                    </>
                  )}
                  {combos.length > 0 && (
                    <>
                      <Separator className="bg-[#414868]" />
                      <div>
                        <h3 className="font-semibold text-[#7aa2f7] mb-1">
                          Combos
                        </h3>
                        {combos.map(
                          (combo, index) =>
                            combo.Cantidad > 0 && (
                              <p key={index} className="text-sm text-gray-400">
                                {combo.Nombre_Combo}: {combo.Cantidad} x $
                                {combo.Precio} = $
                                {(combo.Cantidad * combo.Precio).toFixed(2)}
                              </p>
                            )
                        )}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="font-semibold">Total Combos:</span>
                        <span className="font-semibold">
                          S/{" "}
                          {combos.reduce(
                            (acc, combo) => acc + combo.Cantidad * combo.Precio,
                            0
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Separator className="bg-[#414868] my-4" />

          {/* Forma de Pago */}
          <div>
            <h2 className="text-xl font-semibold text-[#7aa2f7] mb-2">
              Forma de Pago
            </h2>
            <RadioGroup
              onValueChange={setFormaPago}
              value={formaPago}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="tarjeta"
                  id="tarjeta"
                  className="border-[#414868] focus:ring-[#7aa2f7]"
                />
                <Label htmlFor="tarjeta" className="cursor-pointer">
                  Tarjeta de Crédito o Débito
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="billetera"
                  id="billetera"
                  className="border-[#414868] focus:ring-[#7aa2f7]"
                />
                <Label htmlFor="billetera" className="cursor-pointer">
                  Billeteras Electrónicas
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="bg-[#414868] my-4" />

          {/* Aceptaciones */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="terminos"
                checked={aceptaTerminos}
                onCheckedChange={(checked) =>
                  setAceptaTerminos(checked === true)
                }
                className="border-[#414868] focus:ring-[#7aa2f7]"
              />
              <Label htmlFor="terminos" className="cursor-pointer">
                Acepto los términos y condiciones
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="datosNecesarios"
                checked={aceptaDatosNecesarios}
                onCheckedChange={(checked) =>
                  setAceptaDatosNecesarios(checked === true)
                }
                className="border-[#414868] focus:ring-[#7aa2f7]"
              />
              <Label htmlFor="datosNecesarios" className="cursor-pointer">
                Acepto el tratamiento necesario de datos
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="datosOpcionales"
                checked={aceptaDatosOpcionales}
                onCheckedChange={(checked) =>
                  setAceptaDatosOpcionales(checked === true)
                }
                className="border-[#414868] focus:ring-[#7aa2f7]"
              />
              <Label htmlFor="datosOpcionales" className="cursor-pointer">
                Acepto el tratamiento opcional de datos
              </Label>
            </div>
          </div>
        </CardContent>

        {/* Pie de Página */}
        <CardFooter className="bg-[#1f2335] p-6">
          <Button
            onClick={handleConfirmarCompra}
            className="w-full bg-[#7aa2f7] text-[#1a1b26] hover:bg-[#6a95e0] transition-colors focus:ring-[#5a7fca]"
          >
            Confirmar compra
          </Button>
        </CardFooter>
      </Card>

      {/* Modal de Compra Exitosa */}
      {compraExitosa && (
        <Dialog open={compraExitosa} onOpenChange={setCompraExitosa}>
          <DialogContent className="bg-[#24283b] border-[#414868] text-[#a9b1d6] rounded-lg shadow-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-[#7aa2f7] text-2xl mb-4">
                Boleta de Compra
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-lg font-medium">¡Compra exitosa!</p>
              <p>
                Gracias por tu compra,{" "}
                <span className="font-semibold">{cliente?.name}</span>.
              </p>
              <p>
                Se ha enviado un correo de confirmación a{" "}
                <span className="font-semibold">{cliente?.email}</span>.
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                variant="outline"
                className="bg-[#7aa2f7] text-[#1a1b26] hover:bg-[#6a95e0] transition-colors"
                onClick={() => setCompraExitosa(false)}
              >
                Cerrar
              </Button>
              <Button
                variant="default"
                className="bg-[#7aa2f7] text-[#1a1b26] hover:bg-[#6a95e0] transition-colors"
                onClick={() => navigate(`${location.pathname}/boleto`)}
              >
                Ver Boleta
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
