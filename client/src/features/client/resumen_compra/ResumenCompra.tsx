import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { useComboStore } from "@/store/comboStore";
import { useEntradaStore } from "@/store/entradaStore";
import { useProductoStore } from "@/store/productoStore";
import { useLocation, useNavigate } from "react-router-dom";

function ResumenCompra() {
  const navigate = useNavigate();
  const location = useLocation();
  const entradas = useEntradaStore((state) => state.entradas);
  const butacas = useEntradaStore((state) => state.asientos);
  const productos = useProductoStore((state) => state.productos);
  const combos = useComboStore((state) => state.combos);

  const subtotalEntradas = entradas.reduce(
    (acc, entrada) => acc + entrada.cantidad * entrada.precio,
    0
  );
  const subtotalProductos = productos.reduce(
    (acc, producto) => acc + producto.Cantidad * producto.Precio,
    0
  );
  const subtotalCombos = combos.reduce(
    (acc, combo) => acc + combo.Cantidad * combo.Precio,
    0
  );
  const total = subtotalEntradas + subtotalProductos + subtotalCombos;

  return (
    <div className="container mx-auto p-6 bg-[#1a1b26] text-[#a9b1d6] rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-[#7aa2f7]">
        Resumen de Compra
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Información Adicional */}
        <aside className="w-full md:w-1/3">
          <Card className="bg-[#24283b] border-[#414868]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#7aa2f7]">
                Información Adicional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-[#7aa2f7] mb-1">
                  Política de Devoluciones
                </h3>
                <p className="text-sm text-gray-400">
                  Las entradas de cine no son reembolsables una vez compradas.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[#7aa2f7] mb-1">Notas</h3>
                <p className="text-sm text-gray-400">
                  Llega al menos 15 minutos antes de la función para evitar
                  contratiempos.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Detalles de la Compra */}
        <main className="w-full md:w-2/3">
          <Card className="bg-[#24283b] border-[#414868]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#7aa2f7]">
                Detalles de la Compra
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Butacas Seleccionadas */}
              {butacas.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-[#7aa2f7]">
                    Butacas Seleccionadas
                  </h3>
                  <p className="text-sm text-gray-400">
                    {butacas.map((butaca) =>
                      butaca ? `${butaca.fila}${butaca.numero_asiento} ` : ""
                    )}
                  </p>
                </div>
              )}

              {/* Entradas */}
              {entradas.length > 0 && (
                <>
                  <Separator className="bg-gray-600" />
                  <div className="space-y-2">
                    <h3 className="font-medium text-[#7aa2f7]">Entradas</h3>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                      {entradas.map(
                        (entrada, index) =>
                          entrada.cantidad > 0 && (
                            <li key={index}>
                              {entrada.tipo} - Cantidad: {entrada.cantidad} -
                              Subtotal: $
                              {(entrada.cantidad * entrada.precio).toFixed(2)}
                            </li>
                          )
                      )}
                    </ul>
                    <div className="flex justify-between mt-2">
                      <strong>Subtotal Entradas</strong>
                      <span>${subtotalEntradas.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}

              {/* Productos */}
              {productos.length > 0 && (
                <>
                  <Separator className="bg-gray-600" />
                  <div className="space-y-2">
                    <h3 className="font-medium text-[#7aa2f7]">
                      Productos de Dulcería
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                      {productos.map(
                        (producto, index) =>
                          producto.Cantidad > 0 && (
                            <li key={index}>
                              {producto.Nombre} - Cantidad: {producto.Cantidad}{" "}
                              - Subtotal: $
                              {(producto.Cantidad * producto.Precio).toFixed(2)}
                            </li>
                          )
                      )}
                    </ul>
                    <div className="flex justify-between mt-2">
                      <strong className="text-[#7aa2f7]">
                        Subtotal Productos
                      </strong>
                      <span className="text-[#7aa2f7]">
                        ${subtotalProductos.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Combos */}
              {combos.length > 0 && (
                <>
                  <Separator className="bg-gray-600" />
                  <div className="space-y-2">
                    <h3 className="font-medium text-[#7aa2f7]">Combos</h3>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                      {combos.map(
                        (combo, index) =>
                          combo.Cantidad > 0 && (
                            <li key={index}>
                              {combo.Nombre_Combo} - Cantidad: {combo.Cantidad}{" "}
                              - Subtotal: $
                              {(combo.Cantidad * combo.Precio).toFixed(2)}
                            </li>
                          )
                      )}
                    </ul>
                    <div className="flex justify-between mt-2">
                      <strong className="text-white"> Subtotal Combos</strong>
                      <span>${subtotalCombos.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}

              {/* Total */}
              <Separator className="bg-gray-600" />
              <div className="flex justify-between items-center pt-4 border-t border-gray-600">
                <span className="font-bold text-lg text-[#7aa2f7]">Total</span>
                <span className="font-bold text-lg text-[#7aa2f7]">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Botón de Pagar */}
              <Button
                className="w-full  mt-4 bg-[#7aa2f7] text-white hover:bg-[#6a95e0] focus:ring-[#5a7fca]"
                onClick={() => {
                  navigate(`${location.pathname}/pago`);
                }}
              >
                Pagar
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default ResumenCompra;
