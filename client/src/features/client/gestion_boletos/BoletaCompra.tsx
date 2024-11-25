import QRCode from "react-qr-code";
import { Card, CardContent } from "@/components/ui/Card";
import { Calendar, Clock, Monitor, User, MapPin } from "lucide-react";
import { useEntradaStore } from "@/store/entradaStore";
import { useLoginStore } from "@/store/loginStore";
import { Separator } from "@radix-ui/react-separator";
import { useProductoStore } from "@/store/productoStore";
import { useComboStore } from "@/store/comboStore";
import { useVoucherStore } from "@/store/voucherStore";

export default function BoletaCompra() {
  const voucher = useVoucherStore((state) => state.voucher);
  const cliente = useLoginStore((state) => state.user)?.user.name;
  const productos = useProductoStore((state) => state.productos);
  const combos = useComboStore((state) => state.combos);
  const nombrePelicula = useEntradaStore(
    (state) => state.pelicula
  )?.Nombre_Pelicula;
  const entradas = useEntradaStore((state) => state.entradas);
  const butacas = useEntradaStore((state) => state.asientos);
  const sala = useEntradaStore((state) => state.funcion)?.Nombre_Sala;
  const Hora_Inicio = useEntradaStore((state) => state.funcion)?.Hora_Inicio;

  const totalEntradas = entradas.reduce(
    (acc, entrada) => acc + entrada.cantidad * entrada.precio,
    0
  );
  const totalProductos = productos.reduce(
    (acc, producto) => acc + producto.Cantidad * producto.Precio,
    0
  );
  const totalCombos = combos.reduce(
    (acc, combo) => acc + combo.Cantidad * combo.Precio,
    0
  );

  const handleTotal = () => {
    return totalEntradas + totalProductos + totalCombos;
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Encabezado */}
      <div className="bg-blue-600 p-6 text-white text-center">
        <h1 className="text-2xl font-mono font-bold">Boleto de Compra</h1>
      </div>

      {/* Contenido Principal */}
      <CardContent className="p-8 space-y-6">
        {/* Información del Cliente y Compra */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {nombrePelicula}
          </h2>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Codigo : </span>{" "}
            {voucher?.toString() || ""}
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center py-4">
          <QRCode
            value={`${2}-${nombrePelicula}`}
            size={180}
            className="rounded-md shadow-md"
          />
        </div>

        {/* Mensaje de Instrucción */}
        <p className="text-xs text-center text-rose-500 px-2">
          Muestra el código QR desde tu celular para canjear tus combos e
          ingresar a la sala. No necesitas pasar por boletería ni imprimir este
          documento.
        </p>

        {/* Detalles de la Compra */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          {cliente && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>{cliente}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-gray-500" />
            <span>CinePlex</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>
              {new Date().toLocaleDateString("es-PE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {entradas.length > 0 && (
            <>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{Hora_Inicio}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{sala}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Tus butacas:</span>
                <span>
                  {butacas.map((butaca) =>
                    butaca ? `${butaca.fila}${butaca.numero_asiento} ` : ""
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{Hora_Inicio}</span>
              </div>
            </>
          )}
        </div>

        {/* Lista de Entradas */}
        {entradas.length > 0 && (
          <>
            <Separator className="bg-gray-300" />
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Entradas</h3>
              {entradas.map((entrada, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{entrada.tipo}</span>
                    <span className="mx-2">Cant. {entrada.cantidad}</span>
                  </div>
                  <span>S/ {entrada.cantidad * entrada.precio}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Subtotal Entradas</span>
              <span>S/ {totalEntradas.toFixed(2)}</span>
            </div>
          </>
        )}

        {/* Lista de Productos */}
        {productos.length > 0 && (
          <>
            <Separator className="bg-gray-300" />
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Productos</h3>
              {productos.map((producto, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{producto.Nombre}</span>
                    <span className="mx-2">Cant. {producto.Cantidad}</span>
                  </div>
                  <span>
                    S/ {(producto.Cantidad * producto.Precio).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Subtotal Productos</span>
              <span>S/ {totalProductos.toFixed(2)}</span>
            </div>
          </>
        )}

        {/* Lista de Combos */}
        {combos.length > 0 && (
          <>
            <Separator className="bg-gray-300" />
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Combos</h3>
              {combos.map((combo, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{combo.Descripcion}</span>
                    <span className="mx-2">Cant. {combo.Cantidad}</span>
                  </div>
                  <span>S/ {(combo.Cantidad * combo.Precio).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Subtotal Combos</span>
              <span>S/ {totalCombos.toFixed(2)}</span>
            </div>
          </>
        )}

        {/* Total General */}
        <Separator className="bg-gray-300" />
        <div className="flex justify-between items-center pt-4 border-t border-gray-300">
          <span className="font-bold text-lg text-gray-800">Total</span>
          <span className="font-bold text-lg text-gray-800">
            S/ {handleTotal()}
          </span>
        </div>

        {/* Notas Adicionales */}
        <div className="bg-gray-100 p-4 text-sm space-y-2 rounded-md mt-6">
          <h3 className="font-semibold text-gray-800">Recuerda</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <span className="font-medium">- ¡Sin cola!</span> Dirígete
              directamente a la sala o a la zona de despacho online en la
              Dulcería para recoger tu combo. No necesitas pasar por boletería.
            </li>
            <li>
              <span className="font-medium">- Muestra tu Orden de Compra</span>{" "}
              directamente desde tu celular, no es necesario imprimir.
            </li>
            <li>
              <span className="font-medium">- Horario de la Función:</span>{" "}
              Indica el inicio de proyección de publicidad y avances de los
              próximos estrenos. Luego de ello inicia la película.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
